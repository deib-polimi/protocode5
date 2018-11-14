import React from 'react';
import { Form, Col, Row, Card, Button } from 'react-bootstrap';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { BackLink } from '../utils/FormKit';

const AsyncTaskEditor = ({ viewController, scene, control, onEdit, onDelete }) => {
    let asyncTask = control;
    return (
        <Card>
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} control={control.controlChain} />
                {asyncTask.name}
            </Card.Header>
            <Card.Body>
                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Name</Form.Label>
                        <Col sm={8}>
                            <SmartFormControl type="text" value={asyncTask.name} onChange={value => onEdit('name', value)} />
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

export default AsyncTaskEditor;

