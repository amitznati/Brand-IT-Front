import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import {Dialog, DialogTitle, DialogActions,DialogContent, Button, Typography} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
function TabContainer(props) {
	return (
		<Typography component="div" style={{ padding: 8 * 3 }}>
			{props.children}
		</Typography>
	);
}
  
TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};

class AddLayoutDialog extends React.Component {
	state = {
		value: 0,
	};
	handleClose = () => {
		this.props.onClose(this.props.selectedValue);
	};
	
	handleListItemClick = value => {
		this.props.onClose(value);
	};

	render() {
		const {open, /* classes, onClose, selectedValue,*/ ...other, } = this.props;
		return (
			<Dialog 
				onClose={this.handleClose}
				//fullWidth={true}
				//maxWidth="lg"
				open={open}
				aria-labelledby="simple-dialog-title" {...other}>
				<DialogTitle id="simple-dialog-title">Add layout</DialogTitle>
				<DialogContent>
					<List component="nav">
						<ListItem button onClick={() => this.handleListItemClick('image')}>
							<ListItemIcon>
								<StarIcon />
							</ListItemIcon>
							<ListItemText inset primary="Image" />
						</ListItem>
						<ListItem button onClick={() => this.handleListItemClick('text')}>
							<ListItemText inset primary="Text" />
						</ListItem>
						<ListItem button onClick={() => this.handleListItemClick('shape')}>
							<ListItemText inset primary="Shape" />
						</ListItem>
					</List>
				</DialogContent>
				<DialogActions>
					<Button onClick={this.handleClose} color="primary">
					Close
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
}

AddLayoutDialog.propTypes = {
	//classes: PropTypes.object.isRequired,
	onClose: PropTypes.func,
	selectedValue: PropTypes.string,
	open: PropTypes.bool.isRequired
};

export default AddLayoutDialog;