/* eslint-disable no-console */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles, Paper, TableCell, TableSortLabel, IconButton} from '@material-ui/core';
import { AutoSizer, Column, SortDirection, Table } from 'react-virtualized';
import EditIcon from '@material-ui/icons/Edit';
import {Link} from 'react-router-dom';
import CoreTableToolbar from './CoreTableToolbar';



const styles = theme => ({
	table: {
		fontFamily: theme.typography.fontFamily,
	},
	flexContainer: {
		display: 'flex',
		alignItems: 'center',
		boxSizing: 'border-box',
	},
	tableRow: {
		cursor: 'pointer',
	},
	tableRowHover: {
		'&:hover': {
			backgroundColor: theme.palette.grey[200],
		},
	},
	tableCell: {
		flex: 1,
	},
	noClick: {
		cursor: 'initial',
	},
	margin: {
		margin: theme.spacing.unit,
	},
});

class MuiVirtualizedTable extends React.PureComponent {
	getRowClassName = ({ index }) => {
		const { classes, rowClassName, onRowClick } = this.props;

		return classNames(classes.tableRow, classes.flexContainer, rowClassName, {
			[classes.tableRowHover]: index !== -1 && onRowClick != null,
		});
	};

	cellRenderer = ({ cellData, columnIndex = null }) => {
		const { columns, classes, rowHeight, onRowClick } = this.props;
		return (
			<TableCell
				component="div"
				className={classNames(classes.tableCell, classes.flexContainer, {
					[classes.noClick]: onRowClick == null,
				})}
				variant="body"
				style={{ height: rowHeight }}
				align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
			>
				{cellData}
			</TableCell>
		);
	};

	renderActionCell = ({ cellData, columnIndex = null }) => {
		const { columns, classes, rowHeight, onRowClick, editPath } = this.props;
		return (
			<TableCell
				component="div"
				className={classNames(classes.tableCell, classes.flexContainer, {
					[classes.noClick]: onRowClick == null,
				})}
				variant="body"
				style={{ height: rowHeight }}
				align={(columnIndex != null && columns[columnIndex].numeric) || false ? 'right' : 'left'}
			>
				<div>
					<Link style={{textDecoration: 'none'}} to={{pathname: editPath, search: '?id=' + cellData}}>
						<IconButton aria-label="Edit" className={classes.margin}>
							<EditIcon fontSize="small" />
						</IconButton>
					</Link>
				</div>
			</TableCell>
		);
	}

	headerRenderer = ({ label, columnIndex, dataKey, sortBy, sortDirection }) => {
		const { headerHeight, columns, classes, sort } = this.props;
		const direction = {
			[SortDirection.ASC]: 'asc',
			[SortDirection.DESC]: 'desc',
		};

		const inner =
			!columns[columnIndex].disableSort && sort != null ? (
				<TableSortLabel active={dataKey === sortBy} direction={direction[sortDirection]}>
					{label}
				</TableSortLabel>
			) : (
				label
			);

		return (
			<TableCell
				component="div"
				className={classNames(classes.tableCell, classes.flexContainer, classes.noClick)}
				variant="head"
				style={{ height: headerHeight }}
				align={columns[columnIndex].numeric || false ? 'right' : 'left'}
			>
				{inner}
			</TableCell>
		);
	};

	render() {
		const { classes, columns, ...tableProps } = this.props;
		return (
			<AutoSizer>
				{({ height, width }) => (
					<Table
						className={classes.table}
						height={height}
						width={width}
						{...tableProps}
						rowClassName={this.getRowClassName}
					>
						{columns.map(({isActions = false, cellContentRenderer = null, className, dataKey, ...other }, index) => {
							let renderer;
							if (isActions === true) {
								renderer = this.renderActionCell;
							}
							else if (cellContentRenderer != null) {
								renderer = cellRendererProps =>
									this.cellRenderer({
										cellData: cellContentRenderer(cellRendererProps),
										columnIndex: index,
									});
							} else {
								renderer = this.cellRenderer;
							}

							return (
								<Column
									key={dataKey}
									headerRenderer={headerProps =>
										this.headerRenderer({
											...headerProps,
											columnIndex: index,
										})
									}
									className={classNames(classes.flexContainer, className)}
									cellRenderer={renderer}
									dataKey={dataKey}
									{...other}
								/>
							);
						})}
					</Table>
				)}
			</AutoSizer>
		);
	}
}

MuiVirtualizedTable.propTypes = {
	classes: PropTypes.object.isRequired,
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			cellContentRenderer: PropTypes.func,
			dataKey: PropTypes.string.isRequired,
			width: PropTypes.number.isRequired,
		}),
	).isRequired,
	headerHeight: PropTypes.number,
	onRowClick: PropTypes.func,
	rowClassName: PropTypes.string,
	rowHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.func]),
	sort: PropTypes.func,
	editPath: PropTypes.string
};

MuiVirtualizedTable.defaultProps = {
	headerHeight: 56,
	rowHeight: 56,
};

const WrappedVirtualizedTable = withStyles(styles)(MuiVirtualizedTable);

function desc(a, b, orderBy) {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function stableSort(array, cmp) {
	const stabilizedThis = array.map((el, index) => [el, index]);
	stabilizedThis.sort((a, b) => {
		const order = cmp(a[0], b[0]);
		if (order !== 0) return order;
		return a[1] - b[1];
	});
	return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
	return order === 'DESC' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

class ReactVirtualizedTable extends Component {
	constructor(props){
		super(props);
		const sortBy = props.sortBy;
		const sortDirection = SortDirection.ASC;
		const sortedList = stableSort(props.data, getSorting(sortDirection, sortBy));

		this.state = {
			sortBy,
			sortDirection,
			sortedList,
			list: props.data,
		};
		this._sort = this._sort.bind(this);
	}


	_sort({sortBy, sortDirection}) {
		const {list} = this.state;
		//const sortedList = this._sortList({sortBy, sortDirection});
		const sortedList = stableSort(list, getSorting(sortDirection, sortBy));
		this.setState({sortBy, sortDirection, sortedList});
	}
	
	actionsColumns() {
		return {
			width: 200,
			label: 'Actions',
			disableSort: true,
			dataKey: 'id',
			isActions: true
		};
	}
	

	render() {
		const {sortedList, sortBy, sortDirection} = this.state;
		const {columns,withActions, editPath, title} = this.props;
		let newColumns = columns;
		if(withActions === true) {
			newColumns.push(this.actionsColumns());
		}
		return (
			<Paper style={{  width: '100%' }}>
				{title && 
					<CoreTableToolbar 
						title={title}
					/>
				}
				<div style={{ height: 400, width: '100%' }}>
					<WrappedVirtualizedTable
						rowCount={sortedList.length}
						rowGetter={({ index }) => sortedList[index]}
						onRowClick={event => console.log(event)}
						sort={this._sort}
						sortBy={sortBy}
						sortDirection={sortDirection}
						columns={newColumns}
						editPath={editPath}
					/>
				</div>
				
			</Paper>
		);
	}
	
}

ReactVirtualizedTable.propTypes = {
	columns: PropTypes.array.isRequired,
	sortBy: PropTypes.string,
	data: PropTypes.array.isRequired,
	withActions: PropTypes.bool,
	editPath: PropTypes.string,
	title: PropTypes.string,
};

export default ReactVirtualizedTable;
