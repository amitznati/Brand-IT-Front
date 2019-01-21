import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button, Paper} from '@material-ui/core';
import { CoreText, CoreAutocomplete } from '../../../components/core';
import {CardActions, Typography} from '@material-ui/core';

import bl from './../../../assets/lizard/babkground-landscape.jpg';
import bp from './../../../assets/lizard/babkground-portrate.jpg';
import br from './../../../assets/lizard/bottom-right.jpg';
import header from './../../../assets/lizard/header.jpg';
const themeImages= {
	babkgroundLandscape: bl,
	backgroundPortrate: bp,
	bottomRight: br,
	header
};
const styles = theme => ({
	padding: {
		padding: theme.spacing.unit
	},
	margin: {
		margin: theme.spacing.unit,
	}
});
const availableThemeImages = [
	'babkgroundLandscape',
	'backgroundPortrate',
	'header',
	'top-left',
	'top-right',
	'footer',
	'bottom-left',
	'bottomRight'
];

const availableTags = ['clasic','modern'].map(t => ({
	value: t,
	label: t,
}));

class EditTheme extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: 'Lizard',
			tags: ['clasic'].map(t => ({
				value: t,
				label: t,
			}))
		};

	}
	handleNameChange = event => {
		this.setState({name: event.target.value });
	};

	handleTagsChange = (event, value) => {
		let newTags = this.state.tags;
		switch(value.action) {
		case 'remove-value':
			newTags = newTags.filter(t => t.value !== value.removedValue.value);
			break;
		case 'select-option':
			newTags.push(value.option);
			break;
		default:
			break;
		}
		this.setState({ tags: newTags });
	};

	renderThemeImage(image) {
		const {classes} = this.props;
		return (
			<Grid className={classes.padding} key={image} item md={12}>
				<Paper>
					<Typography className={classes.margin} gutterBottom variant="h5" component="h2">
						{image}
					</Typography>
					<img src={themeImages[image]} alt={image} />
					<CardActions>
						<Button size="small" color="primary">
						Replace
						</Button>
						<Button size="small" color="primary">
						Remove
						</Button>
					</CardActions>
				</Paper>
			</Grid>
		);
	}

	render() {
		//const {classes}  = this.props;
		const {name,tags} = this.state;
		return (
			<Grid container>
				<Grid item md={3}>
					<CoreText 
						label="Name" 
						value={name}
						handleTextChange={this.handleNameChange.bind(this)}
					/>
				</Grid>
				<Grid item md={6}>
					<CoreAutocomplete 	
						options={availableTags}
						isMulti={true}
						label="Tags"
						placeholder="Add / Remove Tags"
						multi={tags}
						handleChangeMulti={this.handleTagsChange.bind(this)}
					/>
				</Grid>
				<Grid item xs={12}>
					<Grid container>
						{availableThemeImages.map(image => this.renderThemeImage(image))}
					</Grid>
				</Grid>
			</Grid>
		);
	}
	
}

EditTheme.propTypes = {
	classes: PropTypes.object.isRequired,
	cardid: PropTypes.any
};

export default withStyles(styles)(EditTheme);