import React from 'react';
import PropTypes from 'prop-types';
import {Fab, Paper, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import CoreSlider from '../../../components/core/CoreSlider';
import CoreText from '../../../components/core/CoreText';
const fields = {
	text: [
		{type: 'text', name: 'text'},
		{type: 'position'},
		{type: 'number', name: 'fontSize'}
	],
	image: [
		{type: 'position'},
		{type: 'size'}
	],
};

const styles = theme => ({
	paper: {
		margin: theme.spacing.unit,
		marginLeft: 0,
		borderRadius: 0
	},
	fab: {
		margin: theme.spacing.unit,
	},
});

class EditLayout extends React.Component {

	handleChange = (name,value) => {
		let {layout,onUpdate} = this.props;
		layout.properties[name] = value;
		onUpdate(layout);
	};
	renderTextField(field){
		const {layout, classes} = this.props;
		const val = layout.properties[field.name];
		return (
			<div className={classes.fab}>
				<CoreText
					label={field.name}
					value={val}
					handleTextChange={(e) => this.handleChange(field.name,e.target.value)}
				/>
			</div>
		);
	}
	
	renderNumberField(field){
		const {classes, layout} = this.props;
		const val = layout.properties[field.name];
		return (
			<div className={classes.fab}>
				<CoreSlider 
					label={field.name}
					className={classes.textField}
					value={val}
					handleSliderChange={(v) => this.handleChange(field.name,v)}
				/>
			</div>
		);
	}
	renderSizeField(){
		return (
			<div>
				{this.renderNumberField({type: 'number',name: 'height'})}
				{this.renderNumberField({type: 'number',name: 'width'})}
			</div>
		);
	}
	renderPositionField(){
		return (
			<div>
				{this.renderNumberField({type: 'number',name: 'x'})}
				{this.renderNumberField({type: 'number',name: 'y'})}
			</div>
		);
	}

	renderFields(field) {
		let renderedField = <div></div>;
		switch(field.type){
		case 'text':
			renderedField = this.renderTextField(field);
			break;
		case 'position': 
			renderedField = this.renderPositionField();
			break;
		case 'number':
			renderedField = this.renderNumberField(field);
			break;
		case 'size':
			renderedField = this.renderSizeField();
			break;
		default:
			renderedField = <div></div>;
		}
		return (
			<Grid item xs={12} key={`${field.name}-${field.type}`}>
				{renderedField}
			</Grid>
		);
	}
	render() {
		const {classes, layout, onBack} = this.props;
		return (
			<Paper className={classes.paper}>
				<Fab size="medium" color="secondary" className={classes.fab} onClick={onBack}>
					<BackIcon />
				</Fab>
				<Grid container>
					{fields[layout.type].map(this.renderFields.bind(this))}
				</Grid>
			</Paper>
		);
	}
}

EditLayout.propTypes = {
	classes: PropTypes.object.isRequired,
	layout: PropTypes.object.isRequired,
	onBack: PropTypes.func.isRequired,
	onUpdate: PropTypes.func.isRequired
};

export default withStyles(styles)(EditLayout);