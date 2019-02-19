import React from 'react';
import PropTypes from 'prop-types';
// import {Paper} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
//import styles from './../../../styles/styles';

const styles = theme => ({
	templateRoot: {
		//background: 'white',
		position: 'absolute',
		margin: 'auto',
		top: 0,
		right: 0,
		bottom: 0,
		left: 0,
		borderRadius: 0
	},
	padding: {
		padding: theme.spacing.unit
	}
});


class TemplatePreview extends React.Component {
	// constructor(props){
	// 	super(props);
	// 	this.renderImage = this.renderImage.bind(this);
	// 	this.renderText = this.renderText.bind(this);
	// }

	getPX(cm){
		const s = this.props.scale || 0.1;
		return cm * s * (96 / 2.54);
	}

	renderImage(layout, index) {
		const p = layout.properties;
		return (
			<img key={index} src={p.src} alt={p.src} style={{
				position: 'absolute',
				bottom: this.getPX(p.y),
				left: this.getPX(p.x), 
				height: this.getPX(p.height),
				width: this.getPX(p.width)}}
			/>
		);
	}
	renderText(layout, index) {
		const p = layout.properties;
		const {scale = 1} = this.props;
		return (
			<span key={index} 
				style={{
					position: 'absolute',
					whiteSpace: 'nowrap',
					fontFamily: p.fontFamily,
					fontSize: (scale * p.fontSize) + 'pt',
					fontStyle: p.fontStyle,
					bottom: this.getPX(p.y),
					left: this.getPX(p.x)
				}} >
				{p.text}
			</span>
		);
	}
	renderLayout = {
		text: this.renderText.bind(this),
		image: this.renderImage.bind(this),
	};

	render() {
		const {template: { layouts},product } = this.props;
		const productH = this.getPX(product.productSize.height);
		const productW = this.getPX(product.productSize.width);
		const templateH = this.getPX(product.templatePosition.height);
		const templateW = this.getPX(product.templatePosition.width);
		const templateX = this.getPX(product.templatePosition.x);
		const templateY = this.getPX(product.templatePosition.y);
		return (
			<div style={{height: productH,width: productW, position: 'relative'}}>
				<img src={product.image} alt="product" style={{height: productH,width: productW, position: 'absolute'}}/>
				<div style={{height: templateH,width: templateW, position: 'absolute', overflow: 'hidden', bottom: templateY, left: templateX}}>
					{layouts.map((l,i) => this.renderLayout[l.type](l,i))}
				</div>
			</div>
		);
	}
	
}

TemplatePreview.propTypes = {
	classes: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	scale: PropTypes.number,
	product: PropTypes.object.isRequired
};

export default withStyles(styles)(TemplatePreview);
