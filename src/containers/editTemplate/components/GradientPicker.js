import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { Button, Grid } from '@material-ui/core';
import GradientBuilder from './../../../components/core/GradientBuilder/GradientBuilder';
import CoreText from '../../../components/core/CoreText';


// eslint-disable-next-line react/prop-types
const getRgba = (rgba) => {
	return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
};

// eslint-disable-next-line react/prop-types
const WrappedSketchPicker = ({ onSelect, ...rest }) => {
	if (rest && rest.isActive) {
		return <SketchPicker { ...rest } onChange={ c => onSelect(getRgba(c.rgb)) } />;
	}
	return '';
};


class GradientPicker extends React.Component {
	state = {
		isActive: false,
		StartX: 0,
		StartY: 5,
		EndX: 50,
		EndY: 5,
		palette: [
			{ pos: 0, color: '#9adafa' },
			{ pos: 1, color: '#028080' }
		]
	}

	onPaletteChange = (palette) => {
		const {onPaletteChange} = this.props;
		this.setState({ palette });
		if (onPaletteChange) {
			onPaletteChange({...this.state, palette});
		}
	}

	handlePointChange = (name, value) => {
		// if (!value) {
		// 	this.setState({[name]: 0});
		// }
		// if (!Number(value)) return;
		this.setState({[name]: value});
		const {onPaletteChange} = this.props;
		if (onPaletteChange) {
			onPaletteChange(this.state);
		}
	};

	render() {
		const {isActive} = this.state;
		return (
			<div>
				<GradientBuilder {...{
					width: 320,
					height: 32,
					onPaletteChange: this.onPaletteChange,
					onStepClick: () => this.setState({isActive: true})
				}}>
					<WrappedSketchPicker {...{
						width: 200,
						disableAlpha: false,
						isActive: isActive
					}} />
				</GradientBuilder>
				{isActive && 
					<Button 
						color="primary"
						onClick={() => this.setState({isActive: false})}
					>
						Close
					</Button>
				}
				<Grid container>
					{['StartX', 'StartY', 'EndX', 'EndY'].map(name => {
						return (
							<Grid item md={3} key={name}>
								<CoreText type="number" label={name} value={this.state[name]} handleTextChange={(v) => this.handlePointChange(name, v)} />
							</Grid>
						);
					})}
				</Grid>
			</div>
			
		);
	}
}

GradientPicker.propTypes = {
	onPaletteChange: PropTypes.func
};


export default GradientPicker;