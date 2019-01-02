import React from 'react';
import {Row, Col, FormGroup, ControlLabel, FormControl} from 'react-bootstrap';
import {Box, BoxHeader, BoxBody} from '../../../components/core';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import Select2 from 'react-select2-wrapper';

export default function TemplateProperties() {
	return (
		<Box className="box-solid">
			<BoxHeader 
				title="Template Properties" 
				icon="fa fa-list"
				boxTool={{collapse: true}}/>
			<BoxBody className="border-radius-none">
				<Row>
					<Col md={3}>
						<FormGroup>
							<ControlLabel>Name</ControlLabel>
							<FormControl 
								type="text"/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Unit</ControlLabel>
							<FormControl componentClass="select" >
								<option>cm</option>
								<option>px</option>
							</FormControl>
						</FormGroup>
					</Col>
					<Col md={3}>
						<FormGroup>
							<ControlLabel>Width</ControlLabel>
							<ReactBootstrapSlider
								value={50}
								//change={this.changeValue}
								//slideStop={this.changeValue}
								step={0.1}
								max={200}
								min={0}
								//orientation="vertical"
								orientation="horizontal"
								reversed={false}
								//disabled="disabled" 
							/>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Height</ControlLabel>
							<ReactBootstrapSlider
								value={50}
								step={0.1}
								max={200}
								min={0}
								orientation="horizontal"
								reversed={false}
							/>
						</FormGroup>
					</Col>
					<Col md={3}>
						<FormGroup>
							<ControlLabel>For Item</ControlLabel>
							<FormControl componentClass="select" >
								<option>cop</option>
								<option>some item</option>
							</FormControl>
						</FormGroup>
						<FormGroup>
							<ControlLabel>Tags</ControlLabel>
							<Select2
								style={{width: '100%'}}
								multiple
								data={['bug', 'feature', 'documents', 'discussion']}
								options={{placeholder: 'search by tags'}}
							/>
						</FormGroup>
					</Col>
				</Row>
			</BoxBody>
		</Box>
	);
}