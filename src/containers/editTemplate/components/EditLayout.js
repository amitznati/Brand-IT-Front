import React from 'react';
import PropTypes from 'prop-types';
import {Typography, Button} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import styles from './../../../styles/styles';


export const EditLayout = props => {
	const {/*classes,*/ layout, onBack} = props;
	return (
		<div>
			<Typography>{layout.type}</Typography>
			<Button onClick={onBack}>Back</Button>
		</div>
	);
};

EditLayout.propTypes = {
	layout: PropTypes.object.isRequired,
	onBack: PropTypes.func.isRequired
};

export default {
	EditLayout: withStyles(styles)(EditLayout)
};