import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
export default function BoxFooter({ className, children }) {
	return (
		<div className={classNames('box-footer clearfix',className)}>
			{children}
		</div>
	);
}

BoxFooter.propTypes = {
	className: PropTypes.string,
	children: PropTypes.any
};