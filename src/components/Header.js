import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import classNames from 'classnames';

export default class Header extends Component {
	render(){
		const {classes, open, handleDrawerOpen} = this.props;
		return (
			<AppBar
				position="absolute"
				className={classNames(classes.appBar, open && classes.appBarShift)}
			>
				<Toolbar disableGutters={!open} className={classes.toolbar}>
					<IconButton
						color="inherit"
						aria-label="Open drawer"
						onClick={handleDrawerOpen}
						className={classNames(
							classes.menuButton,
							open && classes.menuButtonHidden,
						)}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						component="h1"
						variant="h6"
						color="inherit"
						noWrap
						className={classes.title}
					>
						Dashboard
					</Typography>
					<IconButton color="inherit">
						<Badge badgeContent={4} color="secondary">
							<NotificationsIcon />
						</Badge>
					</IconButton>
				</Toolbar>
			</AppBar>
			
		);
	}
}

Header.propTypes = {
	classes: PropTypes.object.isRequired,
	open: PropTypes.bool.isRequired,
	handleDrawerOpen: PropTypes.func.isRequired
};