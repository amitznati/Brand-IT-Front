/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';

export default class CanvasText extends React.Component {
	static propTypes = {
		onUpdateNode: PropTypes.func
	}

	render() {
		//const {gradientData} = this.props;
		const shapes = [];
		// if (gradientData && gradientData.gradientPointsOnFocus) {
		// 	shapes.push(<GradientShapes {...this.props} />);
		// }
		
		shapes.push(
			<text key={this.props.pkey} {...this.props}>{this.props.text}</text>
		);
		
		return shapes;
	}
}