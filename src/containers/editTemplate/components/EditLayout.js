import React from 'react';
import PropTypes from 'prop-types';
import {Fab, Paper, Grid, Button} from '@material-ui/core';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { withStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/KeyboardArrowLeft';
import CoreSlider from '../../../components/core/CoreSlider';
import CoreText from '../../../components/core/CoreText';
import CoreColorPicker from '../../../components/core/CoreColorPicker';
import GradientPicker from './GradientPicker';

const fields = {
	text: [
		{type: 'text', name: 'text'},
		{type: 'position'},
		{type: 'number', name: 'fontSize'},
		{type: 'number', name: 'scaleX'},
		{type: 'number', name: 'scaleY'},
		{type: 'fillColor'}
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
	fillColor: {
		height: 100,
		// width: 100
	}
});

class EditLayout extends React.Component {

	handleChange = (name,value) => {
		let {layout, onUpdate} = this.props;
		layout.properties[name] = value;
		onUpdate(layout);
	};
	state = {
		open: false,
		selectedFillColor: 'Gradient'
	};

	handleToggle = () => {
		this.setState(state => ({ open: !state.open }));
	};

	handleClose = (event, selectedFillColor) => {
		if (this.anchorEl.contains(event.target)) {
			return;
		}
		this.setState({ open: false, selectedFillColor });
	};

	renderTextField(field){
		const {layout, classes} = this.props;
		const val = layout.properties[field.name];
		return (
			<div className={classes.fab}>
				<CoreText
					label={field.name}
					value={val}
					handleTextChange={(v) => this.handleChange(field.name,v)}
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
					step={0.01}
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
				{this.renderNumberField({type: 'number',name: 'rotation'})}
			</div>
		);
	}

	renderFillField = () => {
		// const {classes} = this.props;
		return (
			<Grid container justify="center">
				<Grid item md={3}>
					<CoreColorPicker />
				</Grid>
			</Grid>
			
		);
	};

	onGradientChange = (data) => {
		const {layout, onUpdate} = this.props;
		const fillLinearGradientColorStops = [];
		data.palette.map(p=>{
			fillLinearGradientColorStops.push(...[p.pos, p.color]);
			return false;
		});
		layout.properties.fill = {
			fill: '',
			fillPriority: 'linear-gradient',
			fillLinearGradientEndPointX: data.EndX,
			fillLinearGradientEndPointY: data.EndY,
			fillLinearGradientStartPointX: data.StartX,
			fillLinearGradientStartPointY: data.StartY,
			fillLinearGradientColorStops
		};
		onUpdate(layout);
	};

	renderFillGradientField = () => {
		return (
			<GradientPicker
				onPaletteChange={this.onGradientChange}
			/>
		);
	}

	fillColorFields = {
		Fill: this.renderFillField,
		Gradient: this.renderFillGradientField
	}

	renderFillColorField = () => {
		const {open, selectedFillColor} = this.state;
		return (
			<Grid container justify="center" style={{textAlign: 'center'}}>
				<Grid item md={8}>
					<div>
						<Button
							buttonRef={node => {
								this.anchorEl = node;
							}}
							aria-owns={open ? 'menu-list-grow' : undefined}
							aria-haspopup="true"
							onClick={this.handleToggle}
						>
							Toggle Menu Grow
						</Button>
						<Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
							{({ TransitionProps, placement }) => (
								<Grow
									{...TransitionProps}
									id="menu-list-grow"
									style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
								>
									<Paper>
										<ClickAwayListener onClickAway={this.handleClose}>
											<MenuList>
												<MenuItem onClick={(e) => this.handleClose(e,'Fill')}>Fill</MenuItem>
												<MenuItem onClick={(e) => this.handleClose(e,'Gradient')}>Gradient</MenuItem>
												<MenuItem onClick={(e) => this.handleClose(e,'Image')}>Image</MenuItem>
											</MenuList>
										</ClickAwayListener>
									</Paper>
								</Grow>
							)}
						</Popper>
					</div>
				</Grid>

				<Grid item md={12} style={{margin: '15px'}}>
					{this.fillColorFields[selectedFillColor]()}
				</Grid>
				<Grid item md={3}>
					somthing
				</Grid>
			</Grid>
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
		case 'fillColor':
			renderedField = this.renderFillColorField();
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