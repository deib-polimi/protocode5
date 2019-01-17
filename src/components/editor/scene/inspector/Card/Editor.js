import { faArrowsAlt, faPencilAlt, faTrashAlt, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form, Nav, Tab, Row, Col, ButtonGroup } from 'react-bootstrap';
import { UI_PHONE_CONTROL_CONSTRAINT, CONTROL_CHAIN } from '../../../../../Constants';
import PositionTab from '../UiPhoneControl/PositionTab';
import { ControlText, BackLink } from '../utils/FormKit';
import ModelTab from '../UiPhoneControl/ModelTab';

const CardEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete, onConnect, onDisconnect }) => {
    const card = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {card.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="card-props-editor" defaultActiveKey="main">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="main">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="position">
                                <FontAwesomeIcon icon={faArrowsAlt} />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="model">
                                <FontAwesomeIcon icon={faSitemap} />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={card.name} onChange={value => onEdit('name', value)} />
                                <ControlText caption="Title" value={card.title} onChange={value => onEdit('title', value)} />
                                <ControlText caption="Subtitle" value={card.subtitle} onChange={value => onEdit('subtitle', value)} />
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Number of Actions</Form.Label>
                                    <Col sm={8}>
                                        <ButtonGroup size="sm">
                                            <Button
                                                variant={card.numActions === 1 ? 'dark' : 'light'}
                                                onClick={() => onEdit('numActions', 1)}
                                            >1</Button>
                                            <Button
                                                variant={card.numActions === 2 ? 'dark' : 'light'}
                                                onClick={() => onEdit('numActions', 2)}
                                            >2</Button>
                                            <Button
                                                variant={card.numActions === 3 ? 'dark' : 'light'}
                                                onClick={() => onEdit('numActions', 3)}
                                            >3</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={card}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="model">
                            <ModelTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={control}
                                onConnect={onConnect}
                                onDisconnect={onDisconnect}
                                properties={['title', 'subtitle']}
                            />
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

export default CardEditor;