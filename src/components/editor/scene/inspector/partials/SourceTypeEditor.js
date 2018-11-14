import React from 'react';
import { Form, ButtonGroup, Button, Col, Row } from 'react-bootstrap';
import { SOURCE_TYPE_HARDWARE, SOURCE_TYPE_LOCAL, SOURCE_TYPE_REMOTE } from '../../../../../Constants';
import { ControlText } from '../utils/FormKit';

const SourceTypeEditor = ({ sourceType, onEdit }) => (
    <>
        <Form.Group as={Row}>
            <Form.Label column sm={4}>Source type</Form.Label>
            <Col sm={8}>
                <ButtonGroup vertical size="sm">
                    <Button
                        variant={sourceType.type === SOURCE_TYPE_HARDWARE ? 'dark' : 'light'}
                        onClick={() => onEdit('type', SOURCE_TYPE_HARDWARE)}
                    >Hardware file (preview)</Button>
                    <Button
                        variant={sourceType.type === SOURCE_TYPE_LOCAL ? 'dark' : 'light'}
                        onClick={() => onEdit('type', SOURCE_TYPE_LOCAL)}
                    >Resource file</Button>
                    <Button
                        variant={sourceType.type === SOURCE_TYPE_REMOTE ? 'dark' : 'light'}
                        onClick={() => onEdit('type', SOURCE_TYPE_REMOTE)}
                    >Remote source (http://...)</Button>
                </ButtonGroup>
            </Col>
        </Form.Group>
        <ControlText caption="File Uri" value={sourceType.fileUri} onChange={val => onEdit('fileUri', val)} />
    </>
);

export default SourceTypeEditor;