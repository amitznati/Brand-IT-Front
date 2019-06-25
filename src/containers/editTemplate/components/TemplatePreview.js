import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import DesignCanvas from './DesignCanvas';
import URLImage from './Layouts/URLImage';
import Text from './Layouts/Text';
import TextPath from './Layouts/TextPath';
import {getPX, getCM} from './../utils';
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
	},
	productImage: {
		//boxShadow: '2px 3px 14px -3px rgba(0,0,0,0.75)',
		position: 'absolute'
		
	}
});


class TemplatePreview extends React.Component {

	getPX = (cm) => {
		const s = this.props.scale || 0.1;
		return Number( (cm * s * (96 / 2.54)).toFixed(2) );
	}

	getCM = (px) => {
		const s = this.props.scale || 0.1;
		return Number( (px / s / (96 / 2.54)).toFixed(2) );
	}

	getLayout(node) {
		const {template = {}} = this.props;
		const {layouts = []} = template;
		const index = Number(node.attrs.name);
		const layout = layouts[index];
		return layout;
	}

	onUpdateNode = (node) => {
		const layout = this.getLayout(node);
		layout.properties.scaleX = node.attrs.scaleX;
		layout.properties.scaleY = node.attrs.scaleY;
		layout.properties.rotation = node.attrs.rotation;
		layout.properties.x = getCM(node.attrs.x);
		layout.properties.y = getCM(node.attrs.y);
		this.props.onUpdateLayout(layout);
	}

	onPathChange = (pathData, node) => {
		const layout = this.getLayout(node);
		const {onUpdateLayout} = this.props;
		layout.properties.pathData = pathData;
		onUpdateLayout(layout);
	};

	renderImage(layout, index) {
		const p = layout.properties;
		return (
			<URLImage
				key={index}
				src={p.src}
				x={this.getPX(p.x)}
				y={this.getPX(p.y)}
				height={this.getPX(p.height)}
				width={this.getPX(p.width)}
				rotation={p.rotation}
				name={`${index}`}
				onUpdateNode={this.onUpdateNode}
			/>
		);
	}
	renderText(layout, index) {
		const p = layout.properties;
		return (
			<Text 
				key={index} 
				fontFamily={p.fontFamily}
				fontSize={(p.fontSize)}
				fontStyle={p.fontStyle}
				x={getPX(p.x)}
				y={getPX(p.y)}
				scaleX={p.scaleX}
				scaleY={p.scaleY}
				text={p.text}
				{...p.fill}
				rotation={p.rotation}
				name={`${index}`}
				onUpdateNode={this.onUpdateNode}
			/>
		);
	}

	renderTextPath(layout, index) {
		const p = layout.properties;
		return (
			<TextPath 
				key={index} 
				fontFamily={p.fontFamily}
				fontSize={(p.fontSize)}
				fontStyle={p.fontStyle}
				x={getPX(p.x)}
				y={getPX(p.y)}
				scaleX={p.scaleX}
				scaleY={p.scaleY}
				text={p.text}
				{...p.fill}
				pathData={p.pathData}
				rotation={p.rotation}
				name={`${index}`}
				onUpdateNode={this.onUpdateNode}
				onPathChange={this.onPathChange}
			/>
		);
	}

	renderLayout = {
		text: this.renderText.bind(this),
		textPath: this.renderTextPath.bind(this),
		image: this.renderImage.bind(this),
	};

	render() {
		const {template = {}, scale} = this.props;
		const {layouts = []} = template;
		const {product, classes } = this.props;
		const productH = getPX(product.productSize.height, scale);
		const productW = getPX(product.productSize.width, scale);
		const templateH = getPX(product.templateFrame.height, scale);
		const templateW = getPX(product.templateFrame.width, scale);
		const templateX = getPX(product.templateFrame.x, scale);
		const templateY = getPX(product.templateFrame.y, scale);
		return (
			<div style={{height: productH,width: productW, position: 'relative'}}>
				<img className={classes.productImage} src={product.image} alt="product" style={{height: productH,width: productW}}/>
				<div id="templateDiv" style={{height: templateH,width: templateW, position: 'absolute', overflow: 'hidden', bottom: templateY, left: templateX}}>
					{/* {layouts.map((l,i) => this.renderLayout[l.type](l,i))} */}
					<DesignCanvas
						onUpdateNode={this.onUpdateNode}
						onLayoutClick={this.props.onLayoutClick}
						onEditLayoutEnd={this.props.onEditLayoutEnd}
						selectedLayoutIndex={this.props.selectedLayoutIndex}
						h={templateH}
						w={templateW}
						scale={scale}
					>
						{layouts.map((l,i) => this.renderLayout[l.type](l,i))}
					</DesignCanvas>
				</div>
			</div>
		);
	}
	
}

TemplatePreview.propTypes = {
	classes: PropTypes.object.isRequired,
	template: PropTypes.object.isRequired,
	scale: PropTypes.number,
	product: PropTypes.object.isRequired,
	onUpdateLayout: PropTypes.func,
	onLayoutClick: PropTypes.func,
	onEditLayoutEnd: PropTypes.func,
	selectedLayoutIndex: PropTypes.any
};

export default withStyles(styles)(TemplatePreview);
