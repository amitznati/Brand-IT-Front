import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default function BoxBody({ className, children }) {
	return (
		<div className={classNames('box-body',className)}>{children}</div>
		
	);
}
BoxBody.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};