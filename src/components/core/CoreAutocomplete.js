/* eslint-disable react/prop-types, react/jsx-handler-names */

import React from 'react';
import classNames from 'classnames';
import Select from 'react-select';
import {Typography, FormControl, NoSsr, TextField, Paper, Chip, MenuItem} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CancelIcon from '@material-ui/icons/Cancel';
import styles from '../../styles/styles';

function NoOptionsMessage(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.noOptionsMessage}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function inputComponent({ inputRef, ...props }) {
	return <div ref={inputRef} {...props} />;
}

function Control(props) {
	return (
		<TextField
			fullWidth
			InputProps={{
				inputComponent,
				inputProps: {
					className: props.selectProps.classes.input,
					inputRef: props.innerRef,
					children: props.children,
					...props.innerProps,
				},
			}}
			{...props.selectProps.textFieldProps}
		/>
	);
}

function Option(props) {
	return (
		<MenuItem
			buttonRef={props.innerRef}
			selected={props.isFocused}
			component="div"
			style={{
				fontWeight: props.isSelected ? 500 : 400,
			}}
			{...props.innerProps}
		>
			{props.children}
		</MenuItem>
	);
}

function Placeholder(props) {
	return (
		<Typography
			color="textSecondary"
			className={props.selectProps.classes.placeholder}
			{...props.innerProps}
		>
			{props.children}
		</Typography>
	);
}

function SingleValue(props) {
	return (
		<Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
			{props.children}
		</Typography>
	);
}

function ValueContainer(props) {
	return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
	return (
		<Chip
			tabIndex={-1}
			label={props.children}
			className={classNames(props.selectProps.classes.chip, {
				[props.selectProps.classes.chipFocused]: props.isFocused,
			})}
			onDelete={props.removeProps.onClick}
			deleteIcon={<CancelIcon {...props.removeProps} />}
		/>
	);
}

function Menu(props) {
	return (
		<Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
			{props.children}
		</Paper>
	);
}

const components = {
	Control,
	Menu,
	MultiValue,
	NoOptionsMessage,
	Option,
	Placeholder,
	SingleValue,
	ValueContainer,
};

class Autocomplete extends React.Component {


	render() {
		
		const {isMulti, classes, theme, single, handleChangeSingle, multi, handleChangeMulti} = this.props;
		const suggestions = this.props.options;
		const selectStyles = {
			input: base => ({
				...base,
				color: theme.palette.text.primary,
				'& input': {
					font: 'inherit',
				},
			}),
		};
		return (
			<FormControl fullWidth className={classes.selectControl}>
				<div className={classes.root}>
					<NoSsr>
						{!isMulti && <Select
							classes={classes}
							styles={selectStyles}
							options={suggestions}
							components={components}
							value={single}
							onChange={handleChangeSingle}
							placeholder="Search a country (start with a)"
						/>}

						{isMulti && <Select
							classes={classes}
							styles={selectStyles}
							textFieldProps={{
								label: 'Label',
								InputLabelProps: {
									shrink: true,
								},
							}}
							options={suggestions}
							components={components}
							value={multi}
							onChange={handleChangeMulti}
							placeholder="Select multiple countries"
							isMulti
						/>}
					</NoSsr>
				</div>
			</FormControl>
		);
	}
	
}

export default withStyles(styles, { withTheme: true })(Autocomplete);