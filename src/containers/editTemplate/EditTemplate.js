import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import LayoutsList from './components/LayoutsList';
import arrayMove from 'array-move';
import EditLayout from './components/EditLayout';
import AddLayoutDialog from './components/addLayoutDialog';
import TemplatePreview from './components/TemplatePreview';
// import TemplateProperties from './components/TemplateProperties';
import {template, products} from './../../mocks';
import {CoreSlider} from './../../components/core';
const styles = theme => ({

	templatePaper: {
		// minHeight: '100%',
		// background: '#0000000f',
		position: 'relative',
		overflow: 'auto',
		padding: 0,
		margin: 0
	},
	rootGrid: {
		// minHeight: '100%',
		padding: theme.spacing.unit
	}
}); 



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
		product: products[1],
		selectedLayout: null,
		isAddOpen: false,
		selectedLayoutIndex: -1,
		scale: 0.5
	};

	onTemplateChanged(template) {
		this.setState({template});
	}

	onLayoutClick(index){
		const {layouts} = this.state.template;
		console.log('click', layouts[index].type);
		this.setState({selectedLayout: layouts[index], selectedLayoutIndex: index});
	}

	onDeleteLayout(index) {
		let {template} = this.state;
		template.layouts.splice(index,1);
		this.setState({template});
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
		const {selectedLayout, template, scale, product} = this.state;
		const {layouts} = template;
		
		return (
			<Grid container className={classes.rootGrid}>
				{/* <Grid item xs={12}>
					<TemplateProperties template={template} onTemplateChanged={this.onTemplateChanged.bind(this)}/>
				</Grid> */}
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
						onDeleteLayout={this.onDeleteLayout.bind(this)}
					/>}
					{selectedLayout && <EditLayout 
						layout={selectedLayout} 
						onBack={() => this.setState({selectedLayout: null})}
						onUpdate={this.onUpdateLayout.bind(this)}
					/>}
				</Grid>
				<Grid item md={9}>
					<CoreSlider
						label="Scale"
						value={scale}
						max={3}
						step={0.001}
						handleSliderChange={(v)=>this.setState({scale: Number(v)})}
					/>
					<div className={classes.templatePaper}>
						<TemplatePreview scale={scale} product={product} template={template}/>
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
