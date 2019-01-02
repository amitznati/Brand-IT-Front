import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default function Box({ children, className }) {
	return (
		<div className={classNames('box',className)}>
			{children}
		</div>
	);
}

Box.propTypes = {
	children: PropTypes.any,
	className: PropTypes.string,
};