import React from 'react';
import {Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Box, BoxHeader, BoxBody} from '../../../components/core';

export default function LayoutProperties() {
	return (
		<Box className="box-solid">
			<BoxHeader 
				title="Layout Properties" 
				icon="fa fa-cogs"
				boxTool={{collapse: true}}/>
			<BoxBody>
				<Row>
					<Col md={3}>
						<FormGroup>
							<ControlLabel>Name</ControlLabel>
							<FormControl 
								type="text"/>
						</FormGroup>
					</Col>
					<Col md={3}></Col>
					<Col md={3}></Col>
				</Row>
			</BoxBody>
		</Box>
	);
}