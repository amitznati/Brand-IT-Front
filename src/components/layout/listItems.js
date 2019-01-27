import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {Link} from 'react-router-dom';

const links = [
	{text: 'Edit Template', icon: <DashboardIcon />, link: '/edit-template'},
	{text: 'Themes', icon: <DashboardIcon />, link: '/themes'},
	{text: 'Categories', icon: <DashboardIcon />, link: '/categories'},
	{text: 'Kits', icon: <DashboardIcon />, link: '/kits'},
	{text: 'Products', icon: <DashboardIcon />, link: '/products'}
];
export const mainListItems = (
	<div>
		{links.map((l,i) => {
			return (<Link key={i} to={l.link} style={{textDecoration: 'none'}}>
				<ListItem button>
					<ListItemIcon>
						{l.icon}
					</ListItemIcon>
					<ListItemText primary={l.text} />
				</ListItem>
			</Link>);
		})}
	</div>
);

export const secondaryListItems = (
	<div>
		<ListSubheader inset>Saved reports</ListSubheader>
		<ListItem button>
			<ListItemIcon>
				<AssignmentIcon />
			</ListItemIcon>
			<ListItemText primary="סתם עוד קישורים" />
		</ListItem>
	</div>
);