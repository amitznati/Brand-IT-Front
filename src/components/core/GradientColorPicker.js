
import React from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';
import { useStrictMode } from 'react-konva';

useStrictMode(true);
class GradientColorPicker extends React.Component {
	state = {
		displayColorPicker: false,
		color: {
			r: '241',
			g: '112',
			b: '19',
			a: '1',
		},
	};

	handleClick = () => {
		this.setState({ displayColorPicker: !this.state.displayColorPicker });
	};

	handleClose = () => {
		this.setState({ displayColorPicker: false });
	};

	handleChange = (color) => {
		this.setState({ color: color.rgb });
		this.props.onChange && this.props.onChange(color);
	};

	render() {

		const styles = {
			color: {
				width: '36px',
				height: '14px',
				borderRadius: '2px',
				background: `rgba(${ this.state.color.r }, ${ this.state.color.g }, ${ this.state.color.b }, ${ this.state.color.a })`,
			},
			swatch: {
				padding: '5px',
				background: '#fff',
				borderRadius: '1px',
				boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
				display: 'inline-block',
				cursor: 'pointer',
			},
			popover: {
				position: 'absolute',
				zIndex: '2',
			},
			cover: {
				position: 'fixed',
				top: '0px',
				right: '0px',
				bottom: '0px',
				left: '0px',
			},
		};

		return (
			<div>
				
				<div style={ styles.color } onClick={ this.handleClick }/>
				
				{ this.state.displayColorPicker ? <div style={ styles.popover }>
					<div style={ styles.cover } onClick={ this.handleClose }/>
					<ChromePicker  />
				</div> : null }

			</div>
		);
	}
}

GradientColorPicker.propTypes = {
	onChange: PropTypes.func,
};

export default GradientColorPicker;