import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, ExpansionPanel, ExpansionPanelSummary, Typography, ExpansionPanelDetails} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {ImageLayoutHeader} from './ImageLayout';
//import LayoutProperties from './LayoutsList/components/LayoutProperties';
import styles from './../../../styles/styles';
//import DnDVerticalList from '../../../components/core/DnDVerticalList';
//import SortableList from '../../../components/core/SortableList';

const layouts = [
	{
		type: 'image',
		properties: {
			src: 'https://material-ui.com/static/images/avatar/1.jpg',
		}
	},
	{
		type: 'text',
		properties: {
			text: 'sdf sdf',
		}
	},
];
class LayoutsList extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			expanded: null,
		};

	}
	
	
	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	renderLayout(l,i) {
		const {expanded} = this.state;
		const {classes} = this.props;
		return (
			<ExpansionPanel key={i} expanded={expanded === i} onChange={this.handleChange(i).bind(this)}>
				<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
					<ImageLayoutHeader classes={classes} layout={l}/>
				</ExpansionPanelSummary>
				<ExpansionPanelDetails >
					<Typography className={classes.heading}>Layout Properties</Typography>
				</ExpansionPanelDetails>
			</ExpansionPanel>
		);
		
	}

	render() {
		const items = layouts.map((l,i) => this.renderLayout(l,i));
		//const {classes} = this.props;
		return (
			<Grid container >
				<Grid item xs={12} >
					{items}
				</Grid>
			</Grid>
		);
	}
}
LayoutsList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LayoutsList);
