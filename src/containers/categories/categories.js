import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import ReactVirtualizedTable from '../../components/core/ReactVirtualizedTable';
const styles = theme => ({
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	}
});
const data = [
	['Frozen yoghurt', 159, 6.0, 24, 4.0],
	['Ice cream sandwich', 237, 9.0, 37, 4.3],
	['Eclair', 262, 16.0, 24, 6.0],
	['Cupcake', 305, 3.7, 67, 4.3],
	['Gingerbread', 356, 16.0, 49, 3.9],
];

let id = 0;
function createData(dessert, calories, fat, carbs, protein) {
	id += 1;
	return { id, dessert, calories, fat, carbs, protein };
}

const rows = [];

for (let i = 0; i < 200; i += 1) {
	const randomSelection = data[Math.floor(Math.random() * data.length)];
	rows.push(createData(...randomSelection));
}

class Categories extends React.Component {

	render() {
		const {classes} = this.props;
		return (
			<Grid container>
				<Grid item xs={12} className={classes.padding}>
					<Button variant="outlined" size="large" color="primary" className={classes.button}>
					Add Theme
					</Button>
				</Grid>
				<Grid item xs={12} className={classes.padding}>
					<ReactVirtualizedTable 
						data={rows}
						//sortBy='dessert'
						columns={[
							{
								width: 200,
								flexGrow: 1.0,
								label: 'Dessert',
								dataKey: 'dessert',
							},
							{
								width: 120,
								label: 'Calories (g)',
								dataKey: 'calories',
								numeric: true,
							},
							{
								width: 120,
								label: 'Fat (g)',
								dataKey: 'fat',
								numeric: true,
							},
							{
								width: 120,
								label: 'Carbs (g)',
								dataKey: 'carbs',
								numeric: true,
							},
							{
								width: 120,
								label: 'Protein (g)',
								dataKey: 'protein',
								numeric: true,
							},
						]}
					/>
				</Grid>
			</Grid>
		);
	}
}
Categories.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Categories);
