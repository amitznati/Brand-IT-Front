import { emphasize } from '@material-ui/core/styles/colorManipulator';

const style = theme => ({
	formControl: {
		margin: theme.spacing.unit,
		padding: theme.spacing.unit
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	paper: {
		margin: '8px'
	},
	layoutsListDetails: {
		padding: theme.spacing.unit
	},
	
	bigAvatar: {
		margin: 10,
		width: 60,
		height: 60,
	},
	container: {
		display: 'flex',
		flexWrap: 'wrap',
	},
	field: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit,
		width: '90%',
	},
	slider: {
		paddingTop: '31px'
	},
	sliderContainer: {
		bottom: 0,
		position: 'absolute',
	},
	label: {
		marginLeft: theme.spacing.unit,
	},
	input: {
		display: 'flex',
		padding: `${theme.spacing.unit / 4}px`,
	},
	valueContainer: {
		display: 'flex',
		flexWrap: 'wrap',
		flex: 1,
		alignItems: 'center',
		overflow: 'hidden',
	},
	chip: {
		margin: `${theme.spacing.unit / 4}px ${theme.spacing.unit / 4}px`,
	},
	chipFocused: {
		backgroundColor: emphasize(
			theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
			0.08,
		),
	},
	noOptionsMessage: {
		padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
	},
	singleValue: {
		fontSize: 16,
	},
	placeholder: {
		position: 'absolute',
		left: 2,
		fontSize: 16,
	},
	margin: {
		margin: theme.spacing.unit,
	},
	divider: {
		height: theme.spacing.unit * 2,
	},
	selectStyles: {
		margin: `${theme.spacing.unit}px`,
		input: base => ({
			...base,
			color: theme.palette.text.primary,
			'& input': {
				font: 'inherit',
			},
		}),
	},
	selectControl: {
		margin: theme.spacing.unit
	}
});

export default style;