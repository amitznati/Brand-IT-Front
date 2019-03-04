import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import CoreDataView from '../../components/core/CoreDataView';
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


class CoreResourceView extends React.Component {
	constructor(props){
		super(props);
		const {apiName, availableFilters} = props;
		const resources = call(apis[apiName],methods.ALL);
		let selectedFilters = [];
		let filters = availableFilters;
		if(props.preFilters) {
			selectedFilters = props.preFilters.map(f => {
				filters = filters.filter(el => el.key !== f.key);
				return {
					name: f.name,
					key: f.key, 
					isMulti: true, 
					options: [{label: f.value, value: f.value}], 
					value: [{label: f.value, value: f.value}], 
					isDisabled: true 
				};
			});
		}
		this.state = {
			resources,
			filters,
			selectedFilters
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
		const {resources, filters, selectedFilters } = this.state;
		const {title, editPath, single} = this.props;
		if(!resources) {
			return '';
		}
		return (
			<CoreDataView 
				data={resources} 
				title={title}
				single={single}
				cardTitleObjName='name'
				cardImageObjName='image'
				editPath={editPath}
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
CoreResourceView.propTypes = {
	classes: PropTypes.object.isRequired,
	preFilters: PropTypes.array,
	title: PropTypes.string.isRequired,
	editPath: PropTypes.string.isRequired,
	single: PropTypes.string.isRequired,
	apiName: PropTypes.string.isRequired,
	availableFilters: PropTypes.array

};

export default withStyles(styles)(CoreResourceView);
