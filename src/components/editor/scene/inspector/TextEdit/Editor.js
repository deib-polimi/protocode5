import { faArrowsAlt, faExpand, faIndent, faPencilAlt, faTrashAlt, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form, Nav, Tab } from 'react-bootstrap';
import { UI_PHONE_CONTROL_CONSTRAINT, CONTROL_CHAIN } from '../../../../../Constants';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { ControlNumber, ControlText, ControlCustomColor, BackLink } from '../utils/FormKit';
import ModelTab from '../UiPhoneControl/ModelTab';

const TextEditEditor = ({ control, viewController, scene, onCreate, onEdit, onDelete, onConnect, onDisconnect }) => {
    let textEdit = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {textEdit.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="textedit-props-editor" defaultActiveKey="main">
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
                            <Nav.Link eventKey="dimension">
                                <FontAwesomeIcon icon={faExpand} />
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="spacing">
                                <FontAwesomeIcon icon={faIndent} />
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
                                <ControlText caption="Name" value={textEdit.name} onChange={value => onEdit('name', value)} />
                                <ControlText caption="Title" value={textEdit.title} onChange={value => onEdit('title', value)} />
                                <ControlText caption="Placeholder" value={textEdit.placeholder} onChange={value => onEdit('placeholder', value)} />
                                <ControlCustomColor caption="Text Color" customDefault="#000000" value={textEdit.textColor} onChange={value => onEdit('textColor', value)} />
                                <ControlNumber caption="Text Size" value={textEdit.textSize} onChange={value => onEdit('textSize', value)} min={8} max={24} />
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={textEdit}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={textEdit} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={textEdit} onEdit={onEdit} enableMargin={true} enablePadding={true} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="model">
                            <ModelTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={control}
                                onConnect={onConnect}
                                onDisconnect={onDisconnect}
                                properties={['value']}
                            />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
            <Card.Footer>
                <Button variant="light" onClick={() => onDelete()}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </Card.Footer>
        </Card>
    );
}

export default TextEditEditor;