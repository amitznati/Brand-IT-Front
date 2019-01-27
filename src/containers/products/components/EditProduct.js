import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
//import ReactVirtualizedTable from '../../../components/core/ReactVirtualizedTable';
import {CoreText} from './../../../components/core';
const styles = theme => ({
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	}
});
const data = [
	['Frozen yoghurt'],
	['Ice cream sandwich'],
	['Eclair'],
	['Cupcake'],
	['Gingerbread'],
];

let id = 0;
function createData(name) {
	id += 1;
	return { id, name, image: 'https://material-ui.com/static/images/cards/contemplative-reptile.jpg' };
}

const rows = [];

for (let i = 0; i < 50; i += 1) {
	const randomSelection = data[Math.floor(Math.random() * data.length)];
	rows.push(createData(...randomSelection));
}


class EditKit extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			name: ''
		};
	}

	handleNameChange = event => {
		this.setState({name: event.target.value });
	};
    
	render() {
		const {classes} = this.props;
		const {name} = this.state;
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
					<Grid item md={3} >
						<Button variant="outlined" color="primary" style={{float: 'right'}}>
							Save
						</Button>
					</Grid>
				</Grid>
				<Grid container>
					
				</Grid>
			</div>
		);
	}
}
EditKit.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditKit);
