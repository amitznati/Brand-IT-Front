import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Drawer} from '@material-ui/core';

import { positive, rangeGrid } from './utils/maths';
import { L, Q, C, A } from './utils/points';
import { getPath } from './utils/path';

import SVG from './SVG';
import Controls from './Controls';
import Portal from '../../../containers/editTemplate/components/Layouts/Portal';


import './Builder/styles.css';

class SVGPathBuilder extends Component {
	static propTypes = {
		initialPoints: PropTypes.array.isRequired,
		initialClosePath: PropTypes.bool.isRequired,
		onChange: PropTypes.func.isRequired,
		layout: PropTypes.object.isRequired,
		pathData: PropTypes.shape({
			w: PropTypes.number,
			h: PropTypes.number,
			ctrl: PropTypes.bool,
			activePoint: PropTypes.number,
			isDragging: PropTypes.any,
			fillPath: PropTypes.bool,
			grid: PropTypes.shape({
				show: PropTypes.bool,
				snap: PropTypes.bool,
				size: PropTypes.number,
			}),
			points: PropTypes.array,
			closePath: PropTypes.bool,
			path: PropTypes.string,
			pointsInitated: PropTypes.bool,
			initiate: PropTypes.bool
		})
	}
	
	constructor(props) {
		super(props);
		this.svg = React.createRef();
		this.portalRef = React.createRef();
	}

	static defaultProps = {
		pathData: {
			w: 1000,
			h: 800,
			ctrl: false,
			activePoint: 0,
			isDragging: false,
			fillPath: false,
			grid: {
				show: true,
				snap: true,
				size: 20,
			},
			points: null,
			closePath: false,
			path: '',//getPath(this.props.initialPoints, this.props.initialClosePath)
			pointsInitated: false,
			initiate: true
		}
	}

	componentDidMount() {
		document.addEventListener('keydown', this.handleKeyDown, false);
		document.addEventListener('keyup', this.handleKeyUp, false);
		const {clientWidth, clientHeight} = document.getElementById('templateDiv');
		const w = this.props.layout.properties.scaleX * clientWidth;
		const h = this.props.layout.properties.scaleY * clientHeight;
		const points = this.props.pathData.points || this.props.initialPoints;
		const path = this.props.pathData.path || getPath(this.props.initialPoints, this.props.initialClosePath);
		this.handleChange({points, path, w, h});
	}

	componentWillUnmount() {
		document.removeEventListener('keydown', this.handleKeyDown, false);
		document.removeEventListener('keyup', this.handleKeyUp, false);
	}

	handleChange = (newValues) => {
		const {onChange} = this.props;
		if(onChange) {
			onChange({...this.props.pathData, ...newValues});
		}
	}

	handleKeyDown = (e) => {
		if (e.ctrlKey || e.metaKey) {
			this.handleChange({ ctrl: true });
		}
	}

	handleKeyUp = (e) => {
		if ( ! e.ctrlKey && ! e.metaKey) {
			this.handleChange({ ctrl: false });
		}
	}

	/**
	 * SVG document parameters
	 */
	setWidth = (e) => {
		let v = positive(e.target.value),
			min = 1;

		if (v < min) {
			v = min;
		}

		this.handleChange({ w: v });
	}

	setHeight = (e) => {
		let v = positive(e.target.value),
			min = 1;

		if (v < min) {
			v = min;
		}

		this.handleChange({ h: v });
	}

	/**
	 * Path parameters
	 */
	setClosePath = (e) => {
		const { points } = this.props.pathData,
			closePath = e.target.checked;

		this.handleChange({
			closePath,
			path: getPath(points, closePath),
		});
	}

	setFillPath = (e) => {
		this.handleChange({ fillPath: e.target.checked });
	}

	/**
	 * Grid parameters
	 */
	setGridSize = (e) => {
		let grid = this.props.pathData.grid;

		grid.size = rangeGrid(positive(e.target.value), 1, Math.min(this.props.pathData.w, this.props.pathData.h));

		this.handleChange({ grid });
	}

	setGridSnap = (e) => {
		let grid = this.props.pathData.grid;

		grid.snap = e.target.checked;

		this.handleChange({ grid });
	}

	setGridShow = (e) => {
		let grid = this.props.pathData.grid;

		grid.show = e.target.checked;

		this.handleChange({ grid });
	}

	getMouseCoords = (e) => {
		const { left, top } = this.svg.current.getBoundingClientRect(),
			{ size, snap } = this.props.pathData.grid;

		let x = Math.round(e.pageX - left),
			y = Math.round(e.pageY - top);

		if (snap) {
			x = size * Math.round(x / size);
			y = size * Math.round(y / size);
		}

		return { x, y };
	}

	resetNextCurve = (points, active) => {
		if (active !== points.length - 1) {
			if (points[active + 1].quadratic) {
				points[active + 1].quadratic.t = false;
			}

			if (points[active + 1].cubic) {
				points[active + 1].cubic.s = false;
			}
		}

		return points;
	}

	/**
	 * Default point values
	 */
	setPointType = (e) => {
		let { points, activePoint, closePath } = this.props.pathData;

		// not the first point
		if (activePoint !== 0) {
			let v = e.target.value;

			points = this.resetNextCurve(points, activePoint);

			let p = points[activePoint],
				_p = points[activePoint - 1];

			switch (v) {
			case 'l':
				points[activePoint] = L(p.x, p.y);
				break;

			case 'q':
				points[activePoint] = Q(p.x, p.y, (p.x + _p.x) / 2, (p.y + _p.y) / 2);
				break;

			case 'c':
				points[activePoint] = C(p.x, p.y, (p.x + _p.x - 50) / 2, (p.y + _p.y) / 2, (p.x + _p.x + 50) / 2, (p.y + _p.y) / 2);
				break;

			case 'a':
				points[activePoint] = A(p.x, p.y, 50, 50, 0, 1, 1);
				break;
			default: 
				break;
			}

			this.handleChange({
				points,
				path: getPath(points, closePath),
			});
		}
	}

	setPointPosition = (coord, e) => {
		let coords = this.props.pathData.points[this.props.pathData.activePoint],
			v = positive(e.target.value);

		if (coord === 'x' && v > this.props.pathData.w) {
			v = this.props.pathData.w;
		} else if (coord === 'y' && v > this.props.pathData.h) {
			v = this.props.pathData.h;
		}

		coords[coord] = v;

		this.setPointCoords(coords);
	}

	setPointCoords = (coords) => {
		const { points, activePoint, closePath } = this.props.pathData;

		points[activePoint].x = coords.x;
		points[activePoint].y = coords.y;

		this.handleChange({
			points,
			path: getPath(points, closePath),
		});
	}

	setQuadraticPosition = (coord, e) => {
		let coords = this.props.pathData.points[this.props.pathData.activePoint].quadratic,
			v = positive(e.target.value);

		if (coord === 'x' && v > this.props.pathData.w) {
			v = this.props.pathData.w;
		} else if (coord === 'y' && v > this.props.pathData.h) {
			v = this.props.pathData.h;
		}

		coords[coord] = v;

		this.setQuadraticCoords(coords);
	}

	setQuadraticCoords = (coords) => {
		const { points, activePoint, closePath } = this.props.pathData;

		points[activePoint].quadratic.x = coords.x;
		points[activePoint].quadratic.y = coords.y;

		this.handleChange({
			points,
			path: getPath(points, closePath),
		});
	}

	setQuadraticT = (e) => {
		const { points, activePoint, closePath } = this.props.pathData;

		points[activePoint].quadratic.t = e.target.checked;

		this.handleChange({
			points,
			path: getPath(points, closePath),
		});
	}

	setCubicPosition = (coord, e) => {
		let coords = this.props.pathData.points[this.props.pathData.activePoint].cubic;
		let	v = positive(e.target.value);

		if (coord === 'x1') {
			this.setCubicCoords({
				x: v,
				y: coords.y1,
			}, 1);
		}

		if (coord === 'y1') {
			this.setCubicCoords({
				x: coords.x1,
				y: v,
			}, 1);
		}

		if (coord === 'x2') {
			this.setCubicCoords({
				x: v,
				y: coords.y2,
			}, 2);
		}

		if (coord === 'y2') {
			this.setCubicCoords({
				x: coords.x2,
				y: v,
			}, 2);
		}
	}

	setCubicCoords = (coords, n) => {
		const { points, activePoint, closePath } = this.props.pathData;

		if (n === 1) {
			points[activePoint].cubic.x1 = coords.x;
			points[activePoint].cubic.y1 = coords.y;
		}

		if (n === 2) {
			points[activePoint].cubic.x2 = coords.x;
			points[activePoint].cubic.y2 = coords.y;
		}

		this.handleChange({
			points,
			path: getPath(points, closePath),
		});
	}

	setCubicS = (e) => {
		const { points, activePoint, closePath } = this.props.pathData;

		points[activePoint].cubic.s = e.target.checked;

		this.handleChange({
			points,
			path: getPath(points, closePath),
		});
	}

	setArcParam = (param, e) => {
		const { points, activePoint, closePath } = this.props.pathData;

		let v;

		if (['laf', 'sf'].indexOf(param) > -1) {
			v = e.target.checked ? 1 : 0;
		} else {
			v = positive(e.target.value);
		}

		points[activePoint].arc[param] = v;

		this.handleChange({
			points,
			path: getPath(points, closePath),
		});
	}

	drag = (e, index, object = 'point', n = false) => {
		e.preventDefault();

		if ( ! this.props.pathData.ctrl) {
			const newState = {
				activePoint: index,
				isDragging: { object, n },
			};
			this.handleChange({
				...newState
			});
		}
	}

	cancelDragging = () => {
		this.handleChange({ isDragging: false });
	}

	addPoint = (e) => {
		if (this.props.pathData.ctrl) {
			const coords = this.getMouseCoords(e),
				{ points, closePath } = this.props.pathData;

			points.push(coords);

			const path = getPath(points, closePath);
			const newState = {
				points,
				path,
				activePoint: points.length - 1,
			};

			this.handleChange({
				...newState
			});
		}
	}

	removeActivePoint = () => {
		let { points, activePoint, closePath } = this.props.pathData;

		if (points.length > 1 && activePoint !== 0) {
			points = this.resetNextCurve(points, activePoint);
			points.splice(activePoint, 1);

			this.handleChange({
				points,
				path: getPath(points, closePath),
				activePoint: points.length - 1,
			});
		}
	}

	handleMouseMove = (e) => {
		e.preventDefault();

		if ( ! this.props.pathData.ctrl) {
			let { object, n } = this.props.pathData.isDragging;

			switch (object) {
			case 'point':
				this.setPointCoords(this.getMouseCoords(e));
				break;

			case 'quadratic':
				this.setQuadraticCoords(this.getMouseCoords(e));
				break;

			case 'cubic':
				this.setCubicCoords(this.getMouseCoords(e), n);
				break;
			default:
				break;
			}
		}
	}

	reset = () => {
		const { w, h } = this.props.pathData,
			points = [{ x: w / 2, y: h / 2 }],
			closePath = false,
			path = getPath(points, closePath);

		this.handleChange({
			points,
			path,
			closePath,
			activePoint: 0,
		});
	}

	render() {
		if (!this.props.pathData.points) return null;
		return (
			<div
				className="ad-Builder"
				onMouseUp={ this.cancelDragging }
			>
				<Portal elementId="templateDiv">
					<div ref={this.portalRef}
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: this.props.pathData.w,
							height: this.props.pathData.h
						}}
						onMouseUp={ this.cancelDragging }
					>
						<div className="ad-Builder-main">
							<div className="ad-Builder-svg">
								<SVG
									propRef={this.svg}
									{ ...this.props.pathData }
									drag={ this.drag }
									addPoint={ this.addPoint }
									handleMouseMove={ this.handleMouseMove } />
							</div>
						</div>
					</div>
				</Portal>
				<Drawer
					variant="persistent"
					anchor="right"
					open
				>
					<div className="ad-Builder-controls">
						<Controls
							{ ...this.props.pathData }
							reset={ this.reset }
							removeActivePoint={ this.removeActivePoint }
							setPointPosition={ this.setPointPosition }
							setQuadraticPosition={ this.setQuadraticPosition }
							setQuadraticT={ this.setQuadraticT }
							setCubicPosition={ this.setCubicPosition }
							setCubicS={ this.setCubicS }
							setArcParam={ this.setArcParam }
							setPointType={ this.setPointType }
							setWidth={ this.setWidth }
							setHeight={ this.setHeight }
							setGridSize={ this.setGridSize }
							setGridSnap={ this.setGridSnap }
							setGridShow={ this.setGridShow }
							setClosePath={ this.setClosePath }
							setFillPath={ this.setFillPath } />
					</div>
				</Drawer>
			</div>
		);
	}
}

export default SVGPathBuilder;