import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default function Content({ className, children }) {
	return (
		<div className={classNames('content', className)}>{children}</div>
	);
}
Content.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};