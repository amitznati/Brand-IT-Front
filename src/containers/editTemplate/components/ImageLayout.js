import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Avatar, Grid, Fab} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../../styles/styles';
import {ArrowDropUp, ArrowDropDown} from '@material-ui/icons';

export const ImageLayoutHeader = props => {
	const {classes, layout} = props;
	return (
		<Grid container alignItems="center">
			<Grid item xs={4}>
				<Grid container>
					<Fab size="small" className={classes.margin}>
						<ArrowDropUp />
					</Fab>
					<Fab size="small" className={classes.margin}>
						<ArrowDropDown />
					</Fab>
				</Grid>
			</Grid>
			<Grid item xs={6}>
				<Avatar alt="Remy Sharp" src={layout.properties.src} className={classes.bigAvatar} />
			</Grid>
		</Grid>
	);
};

ImageLayoutHeader.propTypes = {
	classes: PropTypes.object.isRequired,
	layout: PropTypes.object.isRequired,
};

export const ImageLayoutDetails = props => {
	const {/*classes,*/ layout} = props;
	return (
		<div>
			<Typography>{layout.type}</Typography>
		</div>
	);
};

ImageLayoutDetails.propTypes = {
	classes: PropTypes.object.isRequired,
	layout: PropTypes.object.isRequired,
};

export default {
	ImageLayoutHeader: withStyles(styles)(ImageLayoutHeader),
	ImageLayoutDetails: withStyles(styles)(ImageLayoutDetails)
};