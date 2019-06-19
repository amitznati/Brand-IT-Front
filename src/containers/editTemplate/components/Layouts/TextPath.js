/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { TextPath, useStrictMode, Line, Circle } from 'react-konva';

useStrictMode(true);
export default class CanvasTextPath extends React.Component {
	// textPathNode = React.createRef();
	static propTypes = {
		onUpdateNode: PropTypes.func
	}
	renderLine = () => {
		const {x, y, gradientData, name} = this.props;
		const {StartX, StartY, EndX, EndY} = gradientData;
		return (
			[<Line key={`line-${name}`}
				x={x}
				y={y}
				points={[StartX, StartY, EndX, EndY]}
				stroke="black"
			/>,
			<Circle
				key={`circle-${name}`}
				x={(x + EndX)}
				y={(y + EndY)}
				radius={5}
				fill='black'
			/>
			]
		);
	};

	render() {
		const {gradientData, pathData} = this.props;
		const path = (pathData && pathData.path) || `M ${0} ${0} L ${400} ${0}`;
		const shapes = [
			<TextPath key={`textPath-${this.props.name}`}
				{...this.props}
				
				ref={node => {
					this.textPathNode = node;
				}}
				draggable
				onDragEnd={() => this.props.onUpdateNode(this.textPathNode)}
				data={path}
			/>
		];
		if (gradientData && gradientData.gradientPointsOnFocus) {
			shapes.push(...this.renderLine());
		}
		return shapes;
	}
}