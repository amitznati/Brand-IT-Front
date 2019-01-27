import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Tabs,Tab,Typography, Grid,Button, Paper}	from '@material-ui/core';
import GridIcon from '@material-ui/icons/GridOn';
import ListIcon from '@material-ui/icons/List';
import ReactVirtualizedTable, { EnhancedTableToolbar } from './ReactVirtualizedTable';
//import CategoryCard from '../../containers/categories/components/CategoryCard';
import CoreCard from './CoreCard';
//import CoreVirtualizedGrid from './CoreVirtualizedGrid';

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

const styles = theme => ({
	root: {
		flexGrow: 1,
		width: '100%',
		backgroundColor: theme.palette.background.paper,
	},
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	},
	margin: {
		margin: theme.spacing.unit
	}
});

class CoreDataView extends React.Component {
	state = {
		value: 0,
	};

	handleChange = (event, value) => {
		this.setState({ value });
	};

	render() {
		const { classes, data, title, cardTitleObjName, cardImageObjName, editPath, columns } = this.props;
		const { value } = this.state;

		return (
			<Paper className={classes.margin}>
				<Grid container
					direction="row"
					justify="space-between"
					alignItems="flex-end"
				>
					<Grid item xs={12} className={classes.padding}>
						<Button variant="outlined" color="primary" className={classes.button}>
						Add {title}
						</Button>
					</Grid>
					<Grid item xs={12}>
						{title && <EnhancedTableToolbar title={title}/>}
						<div className={classes.root}>
							
							<Tabs
								value={value}
								onChange={this.handleChange}
								variant="scrollable"
								scrollButtons="on"
								indicatorColor="primary"
								textColor="primary"
							>
								<Tab icon={<GridIcon />} />
								<Tab icon={<ListIcon />} />
							</Tabs>
							
							{value === 1 && <TabContainer><ReactVirtualizedTable 
								data={data}
								//title='Categories'
								withActions={true}
								editPath={editPath}
								columns={columns}
							/>
							</TabContainer>}
							{value === 0 && <TabContainer>
								<Grid container>
									{data.map((d,i) => {
										return (
											<Grid className={classes.padding} key={i} item md={3}>
												<CoreCard
													cardid={i}
													title={d[cardTitleObjName]}
													editPath={editPath}
													image={d[cardImageObjName]}
												/>
											</Grid>
										);
									})}
								</Grid>
							</TabContainer>}
						</div>
					</Grid>
				</Grid>
			</Paper>
			
			
		);
	}
}

CoreDataView.propTypes = {
	classes: PropTypes.object.isRequired,
	data: PropTypes.array.isRequired,
	title: PropTypes.string,
	cardTitleObjName: PropTypes.string,
	editPath: PropTypes.string,
	columns: PropTypes.array,
	cardImageObjName: PropTypes.string
};

export default withStyles(styles)(CoreDataView);