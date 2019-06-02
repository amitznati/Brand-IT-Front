import React from 'react';
import PropTypes from 'prop-types';
import {TextField, FormControl} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../styles/styles';

const CoreNumber = props => {
	return (
		<FormControl fullWidth >
			<TextField
				label={props.label}
				value={props.value}
				onFocus={props.onFocus}
				type="number"
				onChange={(e) => props.handleTextChange(Number(e.target.value))}
			/>
		</FormControl>
	);
};

CoreNumber.propTypes = {
	classes: PropTypes.object.isRequired,
	value: PropTypes.any.isRequired,
	handleTextChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string,
	onFocus: PropTypes.func
};

export default withStyles(styles)(CoreNumber);