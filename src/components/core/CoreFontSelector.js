import React, { Component } from 'react';
import FontPicker from 'font-picker-react';
import config from '../../config';

export default class CoreFontSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			activeFontFamily: 'Open Sans',
		};
	}
 
	render() {
		return (
			<div>
				<FontPicker
					apiKey={config.googleFontAPIKey}
					activeFontFamily={this.state.activeFontFamily}
					limit={10}
					onChange={nextFont =>
						this.setState({
							activeFontFamily: nextFont.family,
						})
					}
				/>
				<p className="apply-font">The font will be applied to this text.</p>
			</div>
		);
	}
}