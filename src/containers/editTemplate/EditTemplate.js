import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TemplateProperties from './components/TemplateProperties';
import LayoutsList from './components/LayoutsList';

import styles from './../../styles/styles';


class EditTemplate extends React.Component {

	state = {
		expanded: null,
	};

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	render() {
		//const {expanded} = this.state;
		const {classes} = this.props;
		return (
			<Grid	container spacing={16}>
				<Grid item xs={12} >
					<Paper className={classes.paper}>
						<ExpansionPanel >
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography>Template Properties</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<TemplateProperties />
							</ExpansionPanelDetails>
						</ExpansionPanel>
						
					</Paper>
				</Grid>
				<Grid item md={3}>
					<Paper className={classes.paper}>
	
						<ExpansionPanelSummary>
							<Typography>Layouts List</Typography>
						</ExpansionPanelSummary>

						<LayoutsList />

					</Paper>
				</Grid>
				<Grid item md={9}>
					<Paper className={classes.paper}>
						<Typography>Template Preview</Typography>
					</Paper>
				</Grid>
			</Grid>
		);
	}
}
EditTemplate.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTemplate);
