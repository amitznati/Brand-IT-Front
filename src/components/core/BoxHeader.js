import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default function BoxHeader({ className, icon, title, boxTool }) {
	return (
		<div className={classNames('box-header',className)}>
			{icon && <i className={icon}></i>}
			{title && <h3 className="box-title">{title}</h3>}
			{boxTool && <div className="box-tools pull-right">
				{boxTool.collapse && <button type="button" className="btn bg-aqua btn-sm" data-widget="collapse"><i className="fa fa-minus"></i>
				</button>}
			</div>}
		</div>
	);
}

BoxHeader.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
	title: PropTypes.string,
	icon: PropTypes.string,
	boxTool: PropTypes.object
};