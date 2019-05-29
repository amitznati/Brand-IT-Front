import React from 'react';
import PropTypes from 'prop-types';
import {TextField, FormControl} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../styles/styles';

const CoreText = props => {
	const {/*classes,*/ value, handleTextChange, label, type = 'text'} = props;
	return (
		<FormControl fullWidth >
			<TextField
				type={type}
				label={label}
				value={value}
				onChange={(e) => handleTextChange(e.target.value)}
			/>
		</FormControl>
	);
};

CoreText.propTypes = {
	classes: PropTypes.object.isRequired,
	value: PropTypes.string.isRequired,
	handleTextChange: PropTypes.func.isRequired,
	label: PropTypes.string.isRequired,
	type: PropTypes.string
};

export default withStyles(styles)(CoreText);