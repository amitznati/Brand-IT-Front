//import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
//import ThemeCard from '../themes/components/ThemeCard';
//import CategoryCard from './components/CategoryCard';
import CoreDataView from '../../components/core/CoreDataView';
//import ReactVirtualizedTable from '../../components/core/ReactVirtualizedTable';
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

for (let i = 0; i < 200; i += 1) {
	const randomSelection = data[Math.floor(Math.random() * data.length)];
	rows.push(createData(...randomSelection));
}


class Categories extends React.Component {

	render() {
		//const {classes} = this.props;
		return (
			<CoreDataView 
				data={rows} 
				title='Categories'
				cardTitleObjName='name'
				cardImageObjName='image'
				editPath='/edit-category'
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
Categories.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
