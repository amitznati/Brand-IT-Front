import React from 'react';
import PropTypes from 'prop-types';
import {Grid, Input} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
//import {CoreText} from '../../../components/core';
import styles from '../../../styles/styles';

class TemplateProperties extends React.Component {

	render() {
		let { template, onTemplateChanged } = this.props;
		let { templateSize: {width, height}} = template;
		return (
			<Grid container >
				<Grid item md={3}>
					{/* <CoreText
						label="Name"
						value={name}
						handleTextChange={(v) => {onTemplateChanged('name', v)}
					/> */}
					<Input
						label="Width"
						type="number"
						value={width}
						onChange={(e)=>{template.templateSize.width=Number(e.target.value); onTemplateChanged(template);}}
					/>
					<Input
						label="Height"
						type="number"
						value={height}
						onChange={(e)=>{height=e.target.value; onTemplateChanged(template);}}
					/>
				</Grid>
			</Grid>
							
						
		);
	}
}

TemplateProperties.propTypes = {
	classes: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	onTemplateChanged: PropTypes.func.isRequired
};

export default withStyles(styles)(TemplateProperties);
