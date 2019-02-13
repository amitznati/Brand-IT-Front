import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import LayoutsList from './components/LayoutsList';
import arrayMove from 'array-move';
import EditLayout from './components/EditLayout';
import AddLayoutDialog from './components/addLayoutDialog';
import TemplatePreview from './components/TemplatePreview';

const styles = theme => ({

	templatePaper: {
		height: '100%',
		background: '#0000000f',
		position: 'relative',
		overflow: 'auto',
		padding: theme.spacing.unit
	},
	rootGrid: {
		height: '100%',
		padding: theme.spacing.unit
	}
}); 

const template = {
	height: 10,
	width: 10,
	layouts: [
		{
			type: 'image',
			properties: {
				src: 'https://material-ui.com/static/images/avatar/1.jpg',
				height: 4,
				width: 5,
				x: 3,
				y: 2
			}
		},
		{
			type: 'text',
			properties: {
				text: 'sdf sdf',
				fontFamily: 'Myriad Hebrew',
				fontSize: 10,
				fontStyle: '',
				x: 3,
				y: 2
			}
		},
	]
};

const layoutsTemplate = (type,payload) => {
	switch(type) {
	case 'image':
		return {
			type: 'image',
			properties: {
				src: payload.url,
				x:8,y:8,height: 5,width:5
			}
		};
	case 'text': 
		return {
			type: 'text',
			properties: {
				text: payload
			}
		};
	default:
		return '';
	}
};

class EditTemplate extends React.Component {

	state = {
		template,
		selectedLayout: null,
		isAddOpen: false,
		selectedLayoutIndex: -1
	};

	onLayoutClick(index){
		const {layouts} = this.state.template;
		console.log('click', layouts[index].type);
		this.setState({selectedLayout: layouts[index], selectedLayoutIndex: index});
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		let {template} = this.state;
		const newLayouts = arrayMove(template.layouts, oldIndex, newIndex);
		template.layouts = newLayouts;
		this.setState({template});
	};

	handleAddClose(type,payload){
		if(!type) {
			this.setState({isAddOpen: false});
			return;
		}
		console.log('close', type);
		let {template} = this.state;

		template.layouts.push(layoutsTemplate(type,payload));
		
		this.setState({isAddOpen: false, template});
	}

	onUpdateLayout(layout){
		let {template, selectedLayoutIndex} = this.state;
		template.layouts[selectedLayoutIndex] = layout;
		this.setState({template});
	}

	render() {
		const {classes} = this.props;
		const {selectedLayout, template} = this.state;
		const {layouts} = template;
		
		return (
			<Grid container className={classes.rootGrid}>
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
						onUpdate={this.onUpdateLayout.bind(this)}
					/>}
				</Grid>
				<Grid item md={9}>
					<div className={classes.templatePaper}>
						<TemplatePreview template={template}/>
					</div>
				</Grid>
			</Grid>
		);
	}
}
EditTemplate.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTemplate);
