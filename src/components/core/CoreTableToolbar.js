import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import {withStyles, IconButton, Toolbar, Typography, Tooltip, Menu, MenuItem, Grid} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import CoreAutocomplete from './CoreAutocomplete';

const toolbarStyles = theme => ({
	root: {
		paddingRight: theme.spacing.unit,
		display: 'block'
	},
	highlight:
		theme.palette.type === 'light'
			? {
				color: theme.palette.secondary.main,
				backgroundColor: lighten(theme.palette.secondary.light, 0.85),
			}
			: {
				color: theme.palette.text.primary,
				backgroundColor: theme.palette.secondary.dark,
			},
	spacer: {
		//flex: '1 1 100%',
	},
	actions: {
		color: theme.palette.text.secondary,
	},
	title: {
		//flex: '0 0 auto',
	},
});

class TableToolbar extends Component {
	constructor(props){
		super(props);
		this.state = {
			anchorEl: null,
		};
	}

	handleFilterClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};

	handleFilterClose = (f) => {
		if(!f) {
			this.setState({anchorEl: null});
			return;
		}
		this.setState({anchorEl: null});
		this.props.onAddFilter(f);	
	};

	handleFilterChange = key => value => {
		let {selectedFilters} = this.props;
		let field = selectedFilters.find(f=> f.key === key); 
		const newSelectedFilters = selectedFilters.filter(f => f.key !== key);
		field.value =  value;
		newSelectedFilters.push(field);
		this.props.onFilterChange(newSelectedFilters);
	}

	renderFilterField(f) {
		return (
			<div>
				<CoreAutocomplete
					placeholder={f.name}
					isMulti={f.isMulti}
					value={f.value}
					options={f.options}
					label={f.name}
					handleChange={this.handleFilterChange(f.key)}
				>
				</CoreAutocomplete>
			</div>
		);
	}

	render() {
		const { numSelected = 0, classes, title, selectedFilters, filters } = this.props;
		const {anchorEl} = this.state;
		return (
			<Toolbar
				className={classNames(classes.root, {
					[classes.highlight]: numSelected > 0,
				})}
			>
				<div className={classes.title}>
					{numSelected > 0 ? (
						<Typography color="inherit" variant="subtitle1">
							{numSelected} selected
						</Typography>
					) : (
						<Typography variant="h6" id="tableTitle">
							{title}
						</Typography>
					)}
				</div>
				<div className={classes.spacer} />
				<div className={classes.actions}>
					{numSelected > 0 ? (
						<Tooltip title="Delete">
							<IconButton aria-label="Delete">
								<DeleteIcon />
							</IconButton>
						</Tooltip>
					) : (
						
						<div>
							<IconButton 
								aria-label="Filter list"
								aria-owns={anchorEl ? 'filter-menu' : undefined}
								aria-haspopup="true"
								onClick={this.handleFilterClick}
							>
								<FilterListIcon />
							</IconButton>
							<Menu
								id="filter-menu"
								anchorEl={anchorEl}
								open={Boolean(anchorEl)}
								onClose={() => this.handleFilterClose()}
							>
								{filters && filters.map(f => {
									return (
										<MenuItem key={f.key}
											onClick={() => this.handleFilterClose(f)}>{f.name}
										</MenuItem>
									);
								})}
							</Menu>
						</div>
						
					)}
				</div>
				<div>
					<Grid container>
						{selectedFilters && selectedFilters.map(f=>{
							return (
								<Grid key={f.key} item md={3}>
									{this.renderFilterField(f)}
								</Grid>
							);
						})}
					</Grid>
				</div>
			</Toolbar>
		);
	}
}

TableToolbar.propTypes = {
	classes: PropTypes.object.isRequired,
	numSelected: PropTypes.number,
	title: PropTypes.string,
	filters: PropTypes.array,
	selectedFilters: PropTypes.array,
	onFilterChange: PropTypes.func,
	onAddFilter: PropTypes.func
};

export default withStyles(toolbarStyles)(TableToolbar);