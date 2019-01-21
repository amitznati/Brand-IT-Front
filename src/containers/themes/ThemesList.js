import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid} from '@material-ui/core';
import ThemeCard from './components/ThemeCard';

const styles = theme => ({
	marging: {
		marging: theme.spacing.unit
	},
	padding: {
		padding: theme.spacing.unit
	}
});
class ThemesList extends React.Component {

	render() {
		const {classes} = this.props;
		return (
			<Grid container spacing={4}>
				{[1,2,3,4,5,6,7].map(i => {
					return (
						<Grid className={classes.padding} key={i} item md={3}>
							<ThemeCard />
						</Grid>
					);
				})}
			</Grid>
		);
	}
}
ThemesList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ThemesList);
