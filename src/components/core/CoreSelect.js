import React from 'react';
import PropTypes from 'prop-types';
import {Select, Input, FormControl, InputLabel, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from '../../styles/styles';

const CoreSelect = props => {
	const {classes, value, handleSelectChange, options, label} = props;
	return (
		<FormControl fullWidth className={classes.formControl}>
			<InputLabel className={classes.label} htmlFor={label}>{label}</InputLabel>
			<Select
				value={value}
				onChange={handleSelectChange}
				input={<Input name={label} id={label} />}
			>
				{options && options.map((o,i) => 
				{
					return <MenuItem key={i} value={o}>{o}</MenuItem>;
				}
				)}
			</Select>
		</FormControl>
	);
};

CoreSelect.propTypes = {
	classes: PropTypes.object.isRequired,
	value: PropTypes.string.isRequired,
	handleSelectChange: PropTypes.func.isRequired,
	options: PropTypes.array.isRequired,
	label: PropTypes.string.isRequired
};

export default withStyles(styles)(CoreSelect);