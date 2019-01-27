import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button, Card, CardHeader, CardContent} from '@material-ui/core';
import { CoreText, CoreAutocomplete } from '../../../components/core';
import {CardActions, Typography} from '@material-ui/core';

import bl from './../../../assets/lizard/babkground-landscape.jpg';
import bp from './../../../assets/lizard/babkground-portraite.jpg';
import br from './../../../assets/lizard/bottom-right.jpg';
import header from './../../../assets/lizard/header.jpg';
const themeImages= {
	'babkground-landscape': bl,
	'babkground-portraite': bp,
	'bottom-right': br,
	'header': header
};
const styles = theme => ({
	padding: {
		padding: theme.spacing.unit
	},
	margin: {
		margin: theme.spacing.unit,
	},
	cardHeader: {
		padding: theme.spacing.unit
	},
	noPadding: {
		padding: 0
	}
});
const availableThemeImages = [
	{title: 'Babkground Landscape', fileName: 'babkground-landscape'},
	{title: 'Background Portraite', fileName: 'babkground-portraite'},
	{title: 'Header', fileName: 'header'},
	{title: 'Top Left', fileName: 'top-left'},
	{title: 'Top Right', fileName: 'top-right'},
	{title: 'Footer', fileName: 'footer'},
	{title: 'Bottom Left', fileName: 'bottom-left'},
	{title: 'Bottom Right', fileName: 'bottom-right'}
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
		const themeImage = themeImages[image.fileName];
		return (
			<Grid className={classes.padding} key={image.fileName} item md={12}>
				<Card>
					<CardHeader className={classes.padding}
						title={<Typography gutterBottom variant="h5" component="h2">
							{image.title}
						</Typography>}
					/>
					<CardContent className={classes.noPadding}>
						{themeImage && <img src={themeImage} alt={image.title} />}
					</CardContent>
					<CardActions>
						<Button size="small" color="primary">
							{themeImage ? 'Replace' : 'Add'}
						</Button>
						{themeImage &&<Button size="small" color="primary">
							Remove
						</Button>}
					</CardActions>
				</Card>
			</Grid>
		);
	}

	render() {
		const {classes}  = this.props;
		const {name,tags} = this.state;
		return (
			<div>
				<Grid container
					direction="row"
					justify="space-between"
					alignItems="flex-end"
					spacing={16}
					className={classes.padding}
				>
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
					<Grid item md={3} >
						<Button variant="outlined" color="primary" style={{float: 'right'}}>
							Save
						</Button>
					</Grid>
				</Grid>
				<Grid container>
					{availableThemeImages.map(image => this.renderThemeImage(image))}
				</Grid>
			</div>
			
		);
	}
	
}

EditTheme.propTypes = {
	classes: PropTypes.object.isRequired,
	cardid: PropTypes.any
};

export default withStyles(styles)(EditTheme);