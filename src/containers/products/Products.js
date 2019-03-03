//import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
//import ThemeCard from '../themes/components/ThemeCard';
//import CategoryCard from './components/CategoryCard';
import CoreDataView from '../../components/core/CoreDataView';
//import ReactVirtualizedTable from '../../components/core/ReactVirtualizedTable';
import {mockService} from './../../mocks';
const {call,methods,apis} = mockService;
const styles = theme => ({
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	}
});

const filters = [
	{name: 'Name', key: 'name', isMulti: true, options: [{label: 'Paper Bag #Brown', value: '1'},{label: 'prod2', value: '1'}], value: [] },
];

// const selectedFilters = [
// 	{name: 'Name', key: 'name', isMulti: true, options: [{label: 'Paper Bag #Brown', value: '1'},{label: 'prod2', value: '1'}], value: [{label: 'Paper Bag #Brown', value: '1'}] },
// ];

class Products extends React.Component {
	constructor(props){
		super(props);
		const products = call(apis.PRODUCTS,methods.ALL);
		this.state = {
			products,
			filters,
			selectedFilters: props.selectedFilters || []
		};
	}

	onFilterChange = newSelectedFilters => {
		this.setState({selectedFilters: newSelectedFilters});
	}

	onAddFilter = f => {
		let {selectedFilters, filters} = this.state;
		selectedFilters.push(f);
		const newFilters = filters.filter(fi=> fi.key !== f.key);
		this.setState({filters: newFilters, selectedFilters});
	}

	render() {
		const {products, filters, selectedFilters} = this.state;
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
				filters={filters}
				selectedFilters={selectedFilters}
				onFilterChange={this.onFilterChange}
				onAddFilter={this.onAddFilter}
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
	selectedFilters: PropTypes.array
};

export default withStyles(styles)(Products);
