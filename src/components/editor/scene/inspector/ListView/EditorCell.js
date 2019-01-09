import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form, Nav, Tab } from 'react-bootstrap';
import { UI_PHONE_CONTROL_LIST_VIEW } from '../../../../../Constants';
import { BackLink, ControlText } from '../utils/FormKit';

const ListCellEditor = ({ scene, viewController, listId, control, onEdit, onDelete, onConnect, onDisconnect }) => {
    const listCell = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={UI_PHONE_CONTROL_LIST_VIEW} controlId={listId} />
                {listCell.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="listviewcell-props-editor" defaultActiveKey="main">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="main">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={listCell.name} onChange={value => onEdit('name', value)} />
                                <ControlText caption="Title" value={listCell.title} onChange={value => onEdit('title', value)} />
                                <ControlText caption="Subtitle" value={listCell.subtitle} onChange={value => onEdit('subtitle', value)} />
                            </Form>
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
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