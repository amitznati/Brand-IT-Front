import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import {Dialog, DialogTitle, DialogActions,DialogContent, Button, Toolbar, AppBar, Tabs, Tab, Typography, IconButton} from '@material-ui/core';
import ThemeImagesList from '../../themes/components/ThemeImagesList';
function TabContainer(props) {
	return (
		<Typography component="div" >
			{props.children}
		</Typography>
	);
}
  
TabContainer.propTypes = {
	children: PropTypes.node.isRequired,
};
const types = [
	'image','text','shape'
];
class AddLayoutDialog extends React.Component {
	state = {
		value: 0,
	};
	handleClose = () => {
		this.props.onClose();
	};
	
	handleChange = (event, value) => {
		this.setState({ value });
	};

	onImageSelect(url) {
		this.props.onClose(types[this.state.value],{url});
	}

	render() {
		const {open, /* classes, onClose, selectedValue,*/ ...other, } = this.props;
		const {value} = this.state;
		return (
			<Dialog 
				onClose={this.handleClose}
				fullScreen
				open={open}
				aria-labelledby="simple-dialog-title" {...other}>
				<DialogTitle id="simple-dialog-title">
					<AppBar position="static">
						<Toolbar>
							<IconButton color="inherit" onClick={this.handleClose} aria-label="Close">
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" color="inherit" >
								Add Layout
							</Typography>
						</Toolbar>
						<Tabs value={value} onChange={this.handleChange.bind(this)}>
							<Tab label="Image"/>
							<Tab label="Text" />
							<Tab label="Shape" />
						</Tabs>
					</AppBar>
				</DialogTitle>
				<DialogContent>
					{value === 0 && <TabContainer><ThemeImagesList isForSelect onSelect={this.onImageSelect.bind(this)}/></TabContainer>}
					{value === 1 && <TabContainer>Text</TabContainer>}
					{value === 2 && <TabContainer>Shape</TabContainer>}
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