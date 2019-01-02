import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default function ContentWrapper({ className, children }) {
	return (
		<div className={classNames('content-wrapper',className)}>
			{children}
		</div>
	);
}
ContentWrapper.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};