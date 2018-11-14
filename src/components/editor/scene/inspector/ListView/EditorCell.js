import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { ControlText, BackLink } from '../utils/FormKit';
import { UI_PHONE_CONTROL_LIST_VIEW } from '../../../../../Constants';

const ListCellEditor = ({ scene, viewController, listId, control, onEdit, onDelete }) => {
    const listCell = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={UI_PHONE_CONTROL_LIST_VIEW} controlId={listId} />
                {listCell.name}
            </Card.Header>
            <Card.Body>
                <Form>
                    <ControlText caption="Name" value={listCell.name} onChange={value => onEdit('name', value)} />
                    <ControlText caption="Title" value={listCell.title} onChange={value => onEdit('title', value)} />
                    <ControlText caption="Subtitle" value={listCell.subtitle} onChange={value => onEdit('subtitle', value)} />
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

export default ListCellEditor;