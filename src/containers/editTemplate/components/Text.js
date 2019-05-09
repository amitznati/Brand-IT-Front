import React from 'react';
import PropTypes from 'prop-types';
import { Text, useStrictMode } from 'react-konva';

useStrictMode(true);
export default class CanvasText extends React.Component {
	static propTypes = {
		// text: PropTypes.string,
		// x: PropTypes.number,
		// y: PropTypes.number,
		// fontSize: PropTypes.number,
		// fontFamily: PropTypes.string,
		// rotation: PropTypes.number,
		// name: PropTypes.string,
		onUpdateNode: PropTypes.func
	}
	render() {
		return (
			<Text
				{...this.props}
				ref={node => {
					this.textNode = node;
				}}
				draggable
				onDragEnd={() => this.props.onUpdateNode(this.textNode)}
			/>
		);
	}
}