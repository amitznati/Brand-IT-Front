import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button} from '@material-ui/core';
import { CoreText, CoreAutocomplete } from '../../../components/core';
import ThemeImagesList from './ThemeImagesList';

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
				<ThemeImagesList/>
			</div>
			
		);
	}
	
}

EditTheme.propTypes = {
	classes: PropTypes.object.isRequired,
	cardid: PropTypes.any
};

export default withStyles(styles)(EditTheme);