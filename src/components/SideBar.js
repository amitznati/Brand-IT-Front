import React, {Component} from 'react';
import PropTypes from 'prop-types';

import Drawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import List from '@material-ui/core/List';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { mainListItems, secondaryListItems } from './layout/listItems';
export default class SideBar extends Component {
	render(){
		const {classes, open, handleDrawerClose} = this.props;
		return (
			<Drawer
				variant="permanent"
				classes={{
					paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
				}}
				open={open}
			>
				<div className={classes.toolbarIcon}>
					<IconButton onClick={handleDrawerClose}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>{mainListItems}</List>
				<Divider />
				<List>{secondaryListItems}</List>
			</Drawer>
		);
	}
}
SideBar.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	handleDrawerClose: PropTypes.func.isRequired
};