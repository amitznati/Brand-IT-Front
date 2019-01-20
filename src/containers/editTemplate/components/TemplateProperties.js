import React from 'react';
import PropTypes from 'prop-types';
import {Grid} from '@material-ui/core';
//import Slider from '@material-ui/lab/Slider';
import { withStyles } from '@material-ui/core/styles';
import withRoot from '../../../withRoot';
import {CoreSlider, CoreSelect, CoreAutocomplete, CoreText} from '../../../components/core';
import styles from '../../../styles/styles';

const suggestions = [
	{ label: 'Afghanistan' },
	{ label: 'Aland Islands' },
	{ label: 'Albania' },
	{ label: 'Aruba' },
	{ label: 'Australia' },
	{ label: 'Austria' },
	{ label: 'Azerbaijan' },
	{ label: 'Bahamas' },
	{ label: 'Bahrain' },
	{ label: 'Bonaire, Sint Eustatius and Saba' },
	{ label: 'Bosnia and Herzegovina' },
	{ label: 'Botswana' },
	{ label: 'Bouvet Island' },
	{ label: 'Brazil' },
	{ label: 'British Indian Ocean Territory' },
	{ label: 'Brunei Darussalam' },
].map(suggestion => ({
	value: suggestion.label,
	label: suggestion.label,
}));

class TemplateProperties extends React.Component {
	
	state = {
		name: '',
		unit: 'cm',
		width: 0,
		height: 0
	};

	handleChange = name => event => {
		this.setState({[name]: event.target.value });
	};

	handleSliderChange = name => (event, value) => {
		this.setState({ [name]: value });
	};

	render() {
		//const { classes } = this.props;
		const { name, width, height, unit } = this.state;
		return (
			<Grid container >
				<Grid item md={3}>
					<CoreText
						label="Name"
						value={name}
						handleTextChange={this.handleChange('name').bind(this)}
					/>
				</Grid>
				<Grid item md={3}>
					<CoreSelect 
						options={['cm','px']}
						handleSelectChange={this.handleChange('unit').bind(this)}
						label="Unit"
						value={unit}
					/>
					<CoreSlider 
						value={width} 
						label="Width"
						handleSliderChange={this.handleSliderChange('width').bind(this)}
					/>
					<CoreSlider 
						value={height} 
						label="Height"
						handleSliderChange={this.handleSliderChange('height').bind(this)}
					/>
				</Grid>
				<Grid item md={3}>
					<CoreAutocomplete 
						isMulti={true} 
						options={suggestions}
					/>
				</Grid>
				<Grid item md={3}>
				</Grid>
			</Grid>
							
						
		);
	}
}

TemplateProperties.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(TemplateProperties));
