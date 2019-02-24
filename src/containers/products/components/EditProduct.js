import { Button, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
//import ReactVirtualizedTable from '../../../components/core/ReactVirtualizedTable';
import {CoreText,CoreSlider} from './../../../components/core';
import {mockService, ResourceTemplates} from './../../../mocks';
import TemplatePreview from '../../editTemplate/components/TemplatePreview';
const {call,methods,apis} = mockService;

const styles = theme => ({
	button: {
		float: 'right'
	},
	padding: {
		padding: theme.spacing.unit
	},
	gridRoot: {
		'div': {
			padding: theme.spacing.unit
		}
	}
});


class EditKit extends React.Component {
	constructor(props){
		super(props);
		const product = ResourceTemplates.PRODUCT;
		let template = ResourceTemplates.TEMPLATE;
		template.layouts[0].properties.height = product.templateFrame.height;
		template.layouts[0].properties.width = product.templateFrame.width;
		this.state = {
			product,
			template,
			scale: 0.5
		};
	}

	getViewProperties = () => {
		const { product } = this.state;
		const {
			name: productName,
			productSize: {height: productH,width: productW }, 
			templateFrame: {height: templateFrameH, width: templateFrameW, x: templateFrameX, y: templateFrameY}} = product;
		return {
			productName,
			productH,
			productW,
			templateFrameH,
			templateFrameW,
			templateFrameX,
			templateFrameY
		};
	}

	componentDidMount() {
		let params = (new URL(document.location)).searchParams;
		if(params.has('id')) {
			const product = call(apis.PRODUCTS,methods.BYID,params.get('id'));
			let {template} = this.state;
			template.layouts[0].properties.height = product.templateFrame.height;
			template.layouts[0].properties.width = product.templateFrame.width;
			this.setState({product,template});
		}
	}

	onProductSizeChanged = (name, value) => {
		let {product} = this.state;
		product.productSize[name] = value;
		this.setState({product});
	}

	ontemplateFrameChanged = (name,value) => {
		let {product,template} = this.state;
		product.templateFrame[name] = value;
		template.layouts[0].properties[name] = value;
		this.setState({product});
	}

	onNameChanged = (value) => {
		let {product} = this.state;
		product.name = value;
		this.setState({product});
	}

	onProductChanged(product) {
		this.setState({product});
	}
    
	render() {
		const {classes} = this.props;
		const {product, scale, template} = this.state;
		const props = this.getViewProperties();

		return (
			<div>
				<Grid container
					direction="row"
					justify="space-between"
					alignItems="flex-end"
					className={classes.gridRoot}
				>
					<Grid item md={3}>
						<CoreText
							label="Name"
							value={props.productName}
							handleTextChange={(v) => this.onNameChanged(v)}
						/>
					</Grid>
					<Grid item md={3}>
						<CoreSlider
							label="Width"
							value={props.productW}
							handleSliderChange={(v)=> this.onProductSizeChanged('width',v)}
						/>
					</Grid>
					<Grid item md={3}>
						<CoreSlider
							label="height"
							value={props.productH}
							handleSliderChange={(v)=> this.onProductSizeChanged('height',v)}
						/>
					</Grid>
					<Grid item md={3}>
						<CoreSlider
							label="Template Height"
							value={props.templateFrameH}
							handleSliderChange={(v)=> this.ontemplateFrameChanged('height',v)}
						/>
					</Grid>
					<Grid item md={3}>
						<CoreSlider
							label="Template Width"
							value={props.templateFrameW}
							handleSliderChange={(v)=> this.ontemplateFrameChanged('width',v)}
						/>
					</Grid>
					<Grid item md={3}>
						<CoreSlider
							label="Template X"
							value={props.templateFrameX}
							handleSliderChange={(v)=> this.ontemplateFrameChanged('x',v)}
						/>
					</Grid>
					<Grid item md={3}>
						<CoreSlider
							label="Template Y"
							value={props.templateFrameY}
							handleSliderChange={(v)=> this.ontemplateFrameChanged('y',v)}
						/>
					</Grid>
					<Grid item md={3} >
						<Button variant="outlined" color="primary" style={{float: 'right'}}>
							Save
						</Button>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<CoreSlider
						label="Scale"
						value={scale}
						max={3}
						step={0.001}
						handleSliderChange={(v)=>this.setState({scale: Number(v)})}
					/>
					<div className={classes.templatePaper}>
						<TemplatePreview scale={scale} product={product} template={template}/>
					</div>
				</Grid>
			</div>
		);
	}
}
EditKit.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditKit);
