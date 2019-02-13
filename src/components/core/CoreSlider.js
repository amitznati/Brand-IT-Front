import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Input, FormControl, Typography} from '@material-ui/core';
import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/styles';

const CoreSlider = props => {
	const {classes, value, handleSliderChange, withNumberInput = true,label} = props;
	return (
		<FormControl fullWidth >
			<Typography>{label}</Typography>
			<Grid container className={classes.sliderContainer}>
				<Grid item xs={withNumberInput ? 9 : 12}>
					<Slider
						value={value}
						className={classes.slider}
						onChange={(e,v) => handleSliderChange(v)}
						max={30}
					/>
				</Grid>
				{withNumberInput && <Grid item xs={3}>
					<Input
						type="number"
						value={value}
						max={30}
						onChange={e=>handleSliderChange(e.target.value)}
					/>
				</Grid>}
			</Grid>
		</FormControl>
	);
};

CoreSlider.propTypes = {
	classes: PropTypes.object.isRequired,
	value: PropTypes.number.isRequired,
	handleSliderChange: PropTypes.func.isRequired,
	withNumberInput: PropTypes.bool,
	label: PropTypes.string.isRequired
};

export default withStyles(styles)(CoreSlider);