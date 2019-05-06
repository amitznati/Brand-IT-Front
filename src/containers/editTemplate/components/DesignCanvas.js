
import React from 'react';
import PropTypes from 'prop-types';
import { Stage, Layer, Transformer } from 'react-konva';

class TransformerComponent extends React.Component {
	static propTypes = {
		selectedShapeName: PropTypes.string,
		onUpdateNode: PropTypes.func
	}
	componentDidMount() {
		this.checkNode();
	}
	componentDidUpdate() {
		this.checkNode();
	}
	checkNode() {
		// here we need to manually attach or detach Transformer node
		const stage = this.transformer.getStage();
		const { selectedShapeName } = this.props;

		const selectedNode = stage.findOne('.' + selectedShapeName);
		// do nothing if selected node is already attached
		if (selectedNode === this.transformer.node()) {
			return;
		}

		if (selectedNode) {
			// attach to another node
			this.transformer.attachTo(selectedNode);
		} else {
			// remove transformer
			this.transformer.detach();
		}
		this.transformer.getLayer().batchDraw();
	}
	render() {
		return (
			<Transformer
				
				onTransformEnd={(e) => this.props.onUpdateNode(e.currentTarget.node())}
				ref={node => {
					this.transformer = node;
				}}
			/>
		);
	}
}

export default class DesignCanvas extends React.Component {
	static propTypes = {
		children: PropTypes.array,
		onUpdateNode: PropTypes.func,
		onLayoutClick: PropTypes.func,
		onEditLayoutEnd: PropTypes.func
	}
	state = {
		selectedShapeName: ''
	};
	handleStageMouseDown = e => {
		// clicked on stage - cler selection
		if (e.target === e.target.getStage()) {
			this.props.onEditLayoutEnd();
			this.setState({
				selectedShapeName: ''
			});
			return;
		}
		// clicked on transformer - do nothing
		const clickedOnTransformer =
		e.target.getParent().className === 'Transformer';
		if (clickedOnTransformer) {
			return;
		}
	
		// find clicked rect by its name
		const name = e.target.name();
		if (name) {
			this.setState({
				selectedShapeName: name
			});
			this.props.onLayoutClick(Number(name));
		} else {
			this.props.onEditLayoutEnd();
			this.setState({
				selectedShapeName: ''
			});
		}
	};
	render() {
		return (
			<Stage
				width={window.innerWidth}
				height={window.innerHeight}
				onMouseDown={this.handleStageMouseDown}
			>
				<Layer>
					{this.props.children}
					<TransformerComponent
						selectedShapeName={this.state.selectedShapeName}
						onUpdateNode={this.props.onUpdateNode}
					/>
				</Layer>
			</Stage>
		);
	}
}