import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Paper, Typography, Button} from '@material-ui/core';
import LayoutsList from './components/LayoutsList';
import arrayMove from 'array-move';

import styles from './../../styles/styles';
import { EditLayout } from './components/EditLayout';
import AddLayoutDialog from './components/addLayoutDialog';
const template = {
	layouts: [
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
	]
};

const layoutsTemplate = {
	image: {
		type: 'image',
		properties: {
			src: null
		}
	},
	text: {
		type: 'text',
		properties: {
			text: ''
		}
	}
};

class EditTemplate extends React.Component {

	state = {
		template,
		selectedLayout: null,
		isAddOpen: false,
	};

	onLayoutClick(index){
		const {layouts} = this.state.template;
		console.log('click', layouts[index].type);
		this.setState({selectedLayout: layouts[index]});
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		let {template} = this.state;
		const newLayouts = arrayMove(template.layouts, oldIndex, newIndex);
		template.layouts = newLayouts;
		this.setState({template});
	};

	handleAddClose(value){
		console.log('close', value);
		let {template} = this.state;

		template.layouts.push(layoutsTemplate[value]);
		
		this.setState({isAddOpen: false, template});
	}

	render() {
		const {classes} = this.props;
		const {selectedLayout, template} = this.state;
		const {layouts} = template;
		
		return (
			<Grid container>
				<Grid item md={3}>
					<Button variant="outlined" color="primary" onClick={() => this.setState({isAddOpen: true})}>
					+ Add Layout
					</Button>
					<AddLayoutDialog 
						open={this.state.isAddOpen}
						onClose={this.handleAddClose.bind(this)}
					/>
					{!selectedLayout && <LayoutsList 
						onSortEnd={this.onSortEnd.bind(this)} 
						layouts={layouts} 
						onLayoutClick={this.onLayoutClick.bind(this)}
					/>}
					{selectedLayout && <EditLayout 
						layout={selectedLayout} 
						onBack={() => this.setState({selectedLayout: null})}
					/>}
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
