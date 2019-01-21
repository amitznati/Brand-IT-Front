import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Card, CardHeader, Menu, CardContent, CardMedia, MenuItem, Typography, IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {Link} from 'react-router-dom';

const styles = {
	card: {
		maxWidth: 345,
	},
	media: {
		// ⚠️ object-fit is not supported by IE 11.
		objectFit: 'cover',
	},
};

class ThemeCard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			anchorEl: null,
		};

		this.handleClick = this.handleClick.bind(this);
		this.handleClose = this.handleClose.bind(this);
	}
	
	
	handleClick = event => {
		this.setState({ anchorEl: event.currentTarget });
	};
	
	handleClose = () => {
		this.setState({ anchorEl: null });
	};

	render () {
		const {classes, cardid} = this.props;
		const {anchorEl} = this.state;
		return (
			<Card className={classes.card}>
				<CardHeader
					action={<div>
						<IconButton onClick={this.handleClick} aria-owns={anchorEl ? `simple-menu${cardid}` : undefined} aria-haspopup="true">
							<MoreVertIcon/>
						</IconButton>
						<Menu
							id={`simple-menu${cardid}`}
							anchorEl={anchorEl}
							open={Boolean(anchorEl)}
							onClose={this.handleClose}
						>
							<MenuItem onClick={this.handleClose}>
								<Link to={{pathname: '/edit-theme', search: '?id=' + cardid}}>Edit</Link>
							</MenuItem>
							<MenuItem onClick={this.handleClose}>Delete</MenuItem>
							<MenuItem onClick={this.handleClose}>Something</MenuItem>
						</Menu>
					</div>}
					title={<Typography gutterBottom variant="h5" component="h2">
					Lizard
					</Typography>}
					// subheader="September 14, 2016"
				/>
				<CardMedia
					component="img"
					alt="Contemplative Reptile"
					className={classes.media}
					height="140"
					image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
					title="Contemplative Reptile"
				/>
				<CardContent>
					{/* <Typography gutterBottom variant="h5" component="h2">
						Lizard
					</Typography> */}
					<Typography component="p">
						some description
					</Typography>
				</CardContent>
				{/* <CardActions>
					<Button size="small" color="primary">
						Edit
					</Button>
					<Button size="small" color="primary">
						Learn More
					</Button>
				</CardActions> */}
			</Card>
		);
	}
}

ThemeCard.propTypes = {
	classes: PropTypes.object.isRequired,
	cardid: PropTypes.any
};

export default withStyles(styles)(ThemeCard);