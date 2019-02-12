import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button, Card, CardHeader, CardContent} from '@material-ui/core';
import {CardActions, Typography} from '@material-ui/core';

import bl from './../../../assets/lizard/babkground-landscape.jpg';
import bp from './../../../assets/lizard/babkground-portraite.jpg';
import br from './../../../assets/lizard/bottom-right.jpg';
import h from './../../../assets/lizard/header.jpg';
const themeImages= {
	bl,	bp,	br,	h
};
const styles = theme => ({
	padding: {
		padding: theme.spacing.unit
	},
	noPadding: {
		padding: 0
	}
});
const availableThemeImages = [
	{title: 'Babkground Landscape', fileName: 'bl'},
	{title: 'Background Portraite', fileName: 'bp'},
	{title: 'Header', fileName: 'h'},
	{title: 'Top Left', fileName: 'tl'},
	{title: 'Top Right', fileName: 'tr'},
	{title: 'Footer', fileName: 'f'},
	{title: 'Bottom Left', fileName: 'btl'},
	{title: 'Bottom Right', fileName: 'btr'}
];


class ThemeImagesList extends React.Component {

	renderThemeImage(image) {
		const {classes, isForSelect, onSelect} = this.props;
		const themeImage = themeImages[image.fileName];
		return (
			<Grid className={classes.padding} key={image.fileName} item md={12}>
				<Card>
					<CardHeader className={classes.padding}
						title={<Typography variant="h5" component="h2">
							{image.title}
						</Typography>}
					/>
					<CardContent className={classes.noPadding}>
						{themeImage && <img src={themeImage} alt={image.title} />}
					</CardContent>
					{!isForSelect ? <CardActions>
						<Button size="small" color="primary">
							{themeImage ? 'Replace' : 'Add'}
						</Button>
						{themeImage &&<Button size="small" color="primary">
							Remove
						</Button>}
					</CardActions>
						: 
						<CardActions>
							{themeImage &&
							<Button size="small" color="primary" onClick={() => onSelect(themeImage)}>
							Select
							</Button>}
						</CardActions>
						
					}
				</Card>
			</Grid>
		);
	}

	render() {
		return (
			<Grid container>
				{availableThemeImages.map(image => this.renderThemeImage(image))}
			</Grid>
			
		);
	}
	
}

ThemeImagesList.propTypes = {
	classes: PropTypes.object.isRequired,
	isForSelect: PropTypes.bool,
	onSelect: PropTypes.func
};

export default withStyles(styles)(ThemeImagesList);