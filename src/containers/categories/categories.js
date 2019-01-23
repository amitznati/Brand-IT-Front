import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import CoreVirtualizedTable from './../../components/core/CoreVirtualizedTable';
const styles = theme => ({
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	}
});
class Categories extends React.Component {

	render() {
		const {classes} = this.props;
		return (
			<Grid container>
				<Grid item xs={12} className={classes.padding}>
					<Button variant="outlined" size="large" color="primary" className={classes.button}>
					Add Theme
					</Button>
				</Grid>
				<Grid item xs={12} className={classes.padding}>
					<CoreVirtualizedTable />
				</Grid>
			</Grid>
		);
	}
}
Categories.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
