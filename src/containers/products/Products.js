import PropTypes from 'prop-types';
import React from 'react';
import CoreResourceView from '../../components/core/CoreResourceView';

const availableFilters = [
	{name: 'Name', key: 'name', isMulti: true, options: [], value: [], isDisabled: false }
];


class Products extends React.Component {


	render() {
		return (
			<CoreResourceView 
				title='Products'
				single='Product'
				editPath='/edit-product'
				apiName="PRODUCTS"
				availableFilters={availableFilters}
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
	preFilters: PropTypes.array
};

export default Products;
