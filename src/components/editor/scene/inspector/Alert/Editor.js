import React from 'react';
import { Form, Col, Row, Card, Button } from 'react-bootstrap';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BackLink } from '../utils/FormKit';

const AlertEditor = ({ scene, viewController, control, onEdit, onDelete }) => {
    let alert = control;
    return (
        <Card>
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} />
                {alert.name}
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Name</Form.Label>
                        <Col sm={8}>
                            <SmartFormControl type="text" value={alert.name} onChange={value => onEdit('name', value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Title</Form.Label>
                        <Col sm={8}>
                            <SmartFormControl type="text" value={alert.title} onChange={value => onEdit('title', value)} />
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Message</Form.Label>
                        <Col sm={8}>
                            <SmartFormControl type="text" value={alert.message} onChange={value => onEdit('message', value)} />
                        </Col>
                    </Form.Group>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button variant="light" onClick={() => { onDelete(); }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </Card.Footer>
        </Card>
    )
};

export default AlertEditor;

