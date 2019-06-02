import React from 'react';
import PropTypes from 'prop-types';
import { SketchPicker } from 'react-color';
import { Grid, ClickAwayListener } from '@material-ui/core';
import GradientBuilder from './../../../components/core/GradientBuilder/GradientBuilder';
import CoreNumber from '../../../components/core/CoreNumber';

const styles = {
	popover: {
		position: 'absolute',
		zIndex: '2',
		bottom: '-190px'
	},
	cover: {
		position: 'fixed',
		top: '0px',
		right: '0px',
		bottom: '0px',
		left: '0px',
	},
};

// eslint-disable-next-line react/prop-types
const getRgba = (rgba) => {
	return `rgba(${rgba.r},${rgba.g},${rgba.b},${rgba.a})`;
};

// eslint-disable-next-line react/prop-types
const WrappedSketchPicker = ({ onSelect, ...rest }) => {
	if (rest && rest.isActive) {
		return (
			<div style={ styles.popover }>
				<SketchPicker { ...rest } onChange={ c => onSelect(getRgba(c.rgb))} />
			</div>
		);
	}
	return '';
};


class GradientPicker extends React.Component {
	componentDidMount(){
		const {onPaletteChange, gradientData} = this.props;
		if (onPaletteChange) {
			onPaletteChange(gradientData);
		}
	}


	onPaletteChange = (palette) => {
		const {onPaletteChange, gradientData} = this.props;
		if (onPaletteChange) {
			onPaletteChange({...gradientData, palette});
		}
	}

	handlePointChange = (name, value) => {
		const {onPaletteChange, gradientData} = this.props;
		if (onPaletteChange) {
			onPaletteChange({...gradientData, [name]: value});
		}
	};

	onNumberFocus = (gradientPointsOnFocus) => {
		const {onPaletteChange, gradientData} = this.props;
		if (onPaletteChange) {
			onPaletteChange({...gradientData, gradientPointsOnFocus});
		}
	};

	onActiveColorChanged = (isActive, activeId) => {
		const {onPaletteChange, gradientData} = this.props;
		if (onPaletteChange) {
			onPaletteChange({...gradientData, isActive, activeId});
		}
	}

	render() {
		const {gradientData} = this.props;
		const {palette, activeId, isActive} = gradientData;
		return (
			<div>
				<ClickAwayListener onClickAway={() => this.onActiveColorChanged(false)}>
					<GradientBuilder {...{
						width: 320,
						height: 32,
						palette,
						activeId,
						onPaletteChange: this.onPaletteChange,
						onStepClick: (activeId) => this.onActiveColorChanged(true, activeId)
					}}>
						<WrappedSketchPicker {...{
							width: 200,
							disableAlpha: false,
							isActive: isActive,
						}} />
					</GradientBuilder>
				</ClickAwayListener>
				<ClickAwayListener onClickAway={() => this.onNumberFocus(false)}>
					<Grid container>
						{['StartX', 'StartY', 'EndX', 'EndY'].map(name => {
							return (
								<Grid item md={3} key={name}>
									<CoreNumber 
										type="number" 
										label={name} 
										value={gradientData[name]} 
										handleTextChange={(v) => this.handlePointChange(name, v)}
										onFocus={() => this.onNumberFocus(true)}
									/>
								</Grid>
							);
						})}
					</Grid>
				</ClickAwayListener>
			</div>
			
		);
	}
}

GradientPicker.propTypes = {
	onPaletteChange: PropTypes.func.isRequired,
	gradientData: PropTypes.object
};

GradientPicker.defaultProps = {
	gradientData: {
		StartX: 0,
		StartY: 5,
		EndX: 50,
		EndY: 5,
		palette: [
			{ pos: 0, color: '#9adafa' },
			{ pos: 1, color: '#028080' }
		],
		activeId: 1,
		isActive: false,
		gradientPointsOnFocus: false
	}
};


export default GradientPicker;