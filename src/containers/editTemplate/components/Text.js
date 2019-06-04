import React from 'react';
import PropTypes from 'prop-types';
import { Text, useStrictMode, Line, Circle } from 'react-konva';

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
	renderLine = () => {
		// eslint-disable-next-line react/prop-types
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
		const {gradientData} = this.props;
		const shapes = [
			<Text key={`text-${this.props.name}`}
				{...this.props}
				ref={node => {
					this.textNode = node;
				}}
				draggable
				onDragEnd={() => this.props.onUpdateNode(this.textNode)}
			/>
		];
		if (gradientData && gradientData.gradientPointsOnFocus) {
			shapes.push(...this.renderLine());
		}
		return shapes;
	}
}