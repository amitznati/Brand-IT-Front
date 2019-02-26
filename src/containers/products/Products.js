//import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
//import ThemeCard from '../themes/components/ThemeCard';
//import CategoryCard from './components/CategoryCard';
import CoreDataView from '../../components/core/CoreDataView';
//import ReactVirtualizedTable from '../../components/core/ReactVirtualizedTable';
//import {mockService} from './../../mocks';
//const {call,methods,apis} = mockService;
const styles = theme => ({
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	}
});


class Products extends React.Component {
	constructor(props){
		super(props);
		const data = localStorage.getItem('data');
		this.state = {
			products: (data && data.products) || [],
		};
	}
	render() {
		const {products} = this.state;
		if(!products) {
			return '';
		}
		return (
			<CoreDataView 
				data={products} 
				title='Products'
				single='Product'
				cardTitleObjName='name'
				cardImageObjName='image'
				editPath='/edit-product'
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
Products.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Products);
