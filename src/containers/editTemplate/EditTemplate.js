import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import {Grid, Button, Paper} from '@material-ui/core';
import LayoutsList from './components/LayoutsList';
import arrayMove from 'array-move';
import EditLayout from './components/EditLayout';
import AddLayoutDialog from './components/addLayoutDialog';
import TemplatePreview from './components/TemplatePreview';
import ProductProperties from './components/ProductProperties';
import {mockService} from './../../mocks';
import {CoreSlider} from './../../components/core';
import FontLoader from '../../utils/fontLoader';
import SVGPathBuilder from '../../components/core/SVGPathBuilder';
import {getPX} from './utils';

const {call,methods,apis} = mockService;
const styles = theme => ({
	section: {
		padding: '20px 0'
	},
	templatePaper: {
		position: 'relative',
		overflow: 'auto',
		padding: '20px 0',
		margin: 0
	},
	rootGrid: {
		// minHeight: '100%',
		padding: theme.spacing.unit
	}
}); 



const layoutsTemplate = (type,payload) => {
	switch(type) {
	case 'image':
		return {
			type: 'image',
			properties: {
				src: payload.url,
				x:8,y:8,height: 5,width:5, rotation: 0
			}
		};
	case 'text': 
		return {
			type: 'text',
			properties: {
				text: payload,
				x: 5, y: 5, scaleX: 1, scaleY: 1,
				fontSize: 40, fontFamily: 'Raleway', fontStyle: '100',
				rotation: 0,
				fill: {fill: 'black'}
			}
		};
	case 'textPath': 
		return {
			type: 'textPath',
			properties: {
				text: payload,
				x: 5, y: 5, scaleX: 1, scaleY: 1,
				fontSize: 40, fontFamily: 'Raleway', fontStyle: '100',
				rotation: 0,
				fill: {fill: 'black'},
			}
		};
	default:
		return '';
	}
};

class EditTemplate extends React.Component {

	state = {
		template: {layouts: []}, //call(apis.TEMPLATES,methods.BYID,1),
		product: call(apis.PRODUCTS,methods.BYID,1),
		selectedLayout: null,
		isAddOpen: false,
		selectedLayoutIndex: -1,
		scale: 0.5,
		allFontsLoaded: false,
		isSVGPathBuilderOpen: false
	};

	componentDidMount() {
		let {template} = this.state;

		template.layouts.push(layoutsTemplate('textPath','what\'s up'));
		this.setState({template});
		
	}

	onTemplateChanged(template) {
		this.setState({template});
	}

	onLayoutClick = (index) => {
		const {layouts} = this.state.template;
		this.setState({selectedLayout: layouts[index], selectedLayoutIndex: index});
	};

	onDeleteLayout(index) {
		let {template} = this.state;
		template.layouts.splice(index,1);
		this.setState({template});
	}

	onSortEnd = ({oldIndex, newIndex}) => {
		let {template} = this.state;
		const newLayouts = arrayMove(template.layouts, oldIndex, newIndex);
		template.layouts = newLayouts;
		this.setState({template});
	};

	handleAddClose(type,payload){
		if(!type) {
			this.setState({isAddOpen: false});
			return;
		}
		let {template} = this.state;

		template.layouts.push(layoutsTemplate(type,payload));
		
		this.setState({isAddOpen: false, template});
	}

	onUpdateLayout = (layout) => {
		let {template, selectedLayoutIndex} = this.state;
		template.layouts[selectedLayoutIndex] = layout;
		this.setState({template});
	}

	saveTemplate = () => {
		mockService('templates','create',this.state.template);
	}

	onEditLayoutEnd = () => {
		this.setState({selectedLayout: null, selectedLayoutIndex: -1, isSVGPathBuilderOpen: false});
	}

	getAllFonts = () => {
		const {template} = this.state;
		const {layouts = []} = template;
		const allFonts = [];
		layouts.map(l => {
			const {fontFamily, fontStyle} = l.properties;
			if (l.type === 'text' || l.type === 'textPath') {
				allFonts.push(`${fontFamily}:${(fontStyle && fontStyle.replace(' ',',')) || 300}`);
			}
			return false;
		});
		return allFonts;
	};


	onPathChange = (pathData) => {
		let {template, selectedLayoutIndex} = this.state;
		if (pathData.initiate) {
			template.layouts[selectedLayoutIndex].properties.x = 0;
			template.layouts[selectedLayoutIndex].properties.y = 0;
		}
		template.layouts[selectedLayoutIndex].properties.pathData = pathData;
		template.layouts[selectedLayoutIndex].properties.pathData.initiate = false;
		this.setState({template});
	};

	onTogglePathBuilder = () => {
		this.setState(s => {return {isSVGPathBuilderOpen: !s.isSVGPathBuilderOpen};});
	};

	getInitialPathPoints = () => {
		const {template, selectedLayoutIndex, scale} = this.state;
		const layout = template.layouts[selectedLayoutIndex];
		const {x, y} = layout.properties;
		const pxX = getPX(x, scale);
		const pxY = getPX(y, scale);
		return [
			{x: pxX, y: pxY}, {x: pxX + 100, y: pxY}
		];
	};

	renderPathBuilder = () => {
		const {selectedLayout} = this.state;
		const pathData = selectedLayout && selectedLayout.properties.pathData;
		const pathPoints = pathData && pathData.points ? pathData.points : this.getInitialPathPoints();
		return (
			<SVGPathBuilder
				onChange={this.onPathChange}
				pathData={pathData}
				initialClosePath={false}
				initialPoints={pathPoints}
				layout={selectedLayout}
			/>
		);
	};

	render() {
		const {classes} = this.props;
		const {selectedLayout, template, scale, product, selectedLayoutIndex, allFontsLoaded, isSVGPathBuilderOpen} = this.state;
		const {layouts = []} = template;
		const allFonts = this.getAllFonts();
		
		return (
			<Grid container className={classes.rootGrid}>
				<AddLayoutDialog 
					open={this.state.isAddOpen}
					onClose={this.handleAddClose.bind(this)}
				/>
				<Grid item xs={12} className={classes.section}>
					<Button variant="outlined" color="primary" onClick={this.saveTemplate}>
						Save
					</Button>
				</Grid>
				<Grid item xs={12} className={classes.section}>
					<Paper>
						<ProductProperties  product={undefined} onProductChanged={(p) => this.setState({product: p})}/>
					</Paper>
				</Grid>
				<Grid item md={3} className={classes.section}>
					<Button variant="outlined" color="primary" onClick={() => this.setState({isAddOpen: true})}>
					+ Add Layout
					</Button>
					{!selectedLayout && <LayoutsList 
						onSortEnd={this.onSortEnd.bind(this)} 
						layouts={layouts} 
						onLayoutClick={this.onLayoutClick.bind(this)}
						onDeleteLayout={this.onDeleteLayout.bind(this)}
					/>}
					{selectedLayout && <EditLayout 
						layout={selectedLayout} 
						onBack={this.onEditLayoutEnd}
						onUpdate={this.onUpdateLayout.bind(this)}
						onTogglePathBuilder={this.onTogglePathBuilder.bind(this)}
					/>}
				</Grid>
				{product && <Grid item md={9} className={classes.section}>
					<CoreSlider
						label="Scale"
						value={scale}
						max={3}
						step={0.001}
						handleSliderChange={(v)=>this.setState({scale: Number(v)})}
					/>
					<div className={classes.templatePaper}>
						{allFontsLoaded && <TemplatePreview 
							scale={scale} 
							product={product} 
							template={template}
							onUpdateLayout={this.onUpdateLayout}
							onLayoutClick={this.onLayoutClick}
							onEditLayoutEnd={this.onEditLayoutEnd}
							selectedLayoutIndex={selectedLayoutIndex}
						/>}
						{allFonts && allFonts.length && <FontLoader
							fontProvider="google"
							fontFamilies={allFonts}
							onActive={() => this.setState({allFontsLoaded: true})}
						/>}
					</div>
				</Grid>}
				{isSVGPathBuilderOpen && this.renderPathBuilder()}
			</Grid>
		);
	}
}
EditTemplate.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(EditTemplate);
