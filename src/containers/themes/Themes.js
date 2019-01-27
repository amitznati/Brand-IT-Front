import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
//import {Grid, Button} from '@material-ui/core';
//import ThemesList from './components/ThemesList';
import CoreDataView from '../../components/core/CoreDataView';

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

for (let i = 0; i < 20; i += 1) {
	const randomSelection = data[Math.floor(Math.random() * data.length)];
	rows.push(createData(...randomSelection));
}
class Themes extends React.Component {

	render() {
		//const {classes} = this.props;
		return (
			<CoreDataView
				data={rows} 
				title='Themes'
				single='Theme'
				cardTitleObjName='name'
				cardImageObjName='image'
				editPath='/edit-theme'
				columns={[
					{
						width: 200,
						flexGrow: 1.0,
						label: 'Name',
						dataKey: 'name',
					},
				]}
			/>
		);
	}
}
Themes.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Themes);
