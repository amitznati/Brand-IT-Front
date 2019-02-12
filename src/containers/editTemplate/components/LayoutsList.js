import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid,Paper} from '@material-ui/core';
import {ImageLayoutHeader, TextLayoutHeader} from './layoutsHeaders';
import CoreSortableList from '../../../components/core/CoreSortableList';

import {sortableHandle} from 'react-sortable-hoc';
import ReorderIcon from '@material-ui/icons/Reorder';
const DragHandle = sortableHandle(() => <ReorderIcon style={{cursor: 'move'}}/>);

const styles = theme => ({

	layoutPaper: {
		margin: theme.spacing.unit,
		marginLeft: 0,
		padding: theme.spacing.unit,

	},
	layoutGrid: {
		height: '50px'
	}
}); 
class LayoutsList extends React.Component {

	getLayoutHeader(l,i){
		switch(l.type) {
		case 'image':
			return <ImageLayoutHeader key={i} layout={l}/>;
		case 'text':
			return <TextLayoutHeader key={i} layout={l}/>;
		default:
			return '';
		}
	}
	renderLayout(l,i) {
		const {classes} = this.props;
		return (
			<Paper square className={classes.layoutPaper}>
				<Grid container alignItems="center" className={classes.layoutGrid}>
					<Grid item xs={2}><DragHandle/></Grid>
					<Grid item xs={10}>
						{this.getLayoutHeader(l,i)}
					</Grid>
				</Grid>
			</Paper>
			
		);
		
	}

	render() {
		const {layouts, onSortEnd, onLayoutClick} = this.props;
		const items = layouts.map((l,i) => this.renderLayout(l,i));
		return (
			<Grid container >
				<Grid item xs={12} >
					<CoreSortableList
						items={items}
						useDragHandle={true}
						onItemClick={onLayoutClick}
						onSortEnd={onSortEnd}
					/>
				</Grid>
			</Grid>
		);
	}
}
LayoutsList.propTypes = {
	classes: PropTypes.object.isRequired,
	layouts: PropTypes.array.isRequired,
	onSortEnd: PropTypes.func,
	onLayoutClick: PropTypes.func
};

export default withStyles(styles)(LayoutsList);
