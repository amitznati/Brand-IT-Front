import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
export default function ContentHeader({ className, title, small }) {
	return (
		<section className={classNames('content-header',className)}>
			<h1>
				{title}
				<small>{small}</small>
			</h1>
			<ol className="breadcrumb">
				<li><a href="/"><i className="fa fa-dashboard"></i> Home</a></li>
				<li className="active">{title}</li>
			</ol>
		</section>
	);
}

ContentHeader.propTypes = {
	className: PropTypes.string,
	title: PropTypes.string,
	small: PropTypes.string
};