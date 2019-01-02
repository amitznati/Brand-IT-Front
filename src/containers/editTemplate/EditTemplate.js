import React, { Component } from 'react';
import {Row, Col} from 'react-bootstrap';
import {Box, BoxHeader, ContentHeader, ContentWrapper, Content, BoxBody} from './../../components/core';

import LayoutsList from './components/LayoutsList';
import TemplateProperties from './components/TemplateProperties';
//import LayoutProperties from './components/LayoutProperties';
//import TemplatePreview from './components/TemplatePreview';
import './editTemplate.css';

export default class EditTemplate extends Component {


	
	render() {
		return (
			<ContentWrapper>
				<ContentHeader title="Edit Template" small="Form"/>
				<Content>
					<Row>
						<Col lg={12}>
							<Box className="box-primary" dataWidget="box-widget-main">
								<BoxHeader 
									title="Edit Template"
									icon="fa fa-object-group"
								/>
								<BoxBody>
									<Row>
										<Col sm={12}>
											<TemplateProperties />
										</Col>
										<Col md={3}>
											<LayoutsList />
											{/* <LayoutProperties /> */}
										</Col>
										<Col md={9}>
											{/* <TemplatePreview /> */}
										</Col>
									</Row>
								</BoxBody>
							</Box>
						</Col>
					</Row>
				</Content>
			</ContentWrapper>
		);
	}
}