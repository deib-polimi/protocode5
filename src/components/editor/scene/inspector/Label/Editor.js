import { faAlignCenter, faAlignLeft, faAlignRight, faBold, faFont, faItalic, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup, Card, Col, Form, Row, Tab } from 'react-bootstrap';
import { CONTROL_CHAIN, UI_PHONE_CONTROL_CONSTRAINT } from '../../../../../Constants';
import { DefaultNav } from '../partials/CommonNav';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import ModelTab from '../UiPhoneControl/ModelTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { BackLink, ControlColor, ControlNumber, ControlText } from '../utils/FormKit';

const LabelEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete, onConnect, onDisconnect }) => {
    const label = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {label.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="label-props-editor" defaultActiveKey="main">
                    <DefaultNav main position dimension spacing model />
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={label.name} onChange={value => onEdit('name', value)} />
                                <ControlText caption="Title" value={label.title} onChange={value => onEdit('title', value)} />
                                <ControlColor caption="Text Color" value={label.textColor} onChange={value => onEdit('textColor', value)} />
                                <ControlNumber caption="Text Size" value={label.textSize} onChange={value => onEdit('textSize', value)} min={8} max={36} />
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Text Decoration</Form.Label>
                                    <Col sm={8}>
                                        <ButtonGroup>
                                            <Button variant={label.textDecoration === 'none' ? 'dark' : 'light'} onClick={() => onEdit('textDecoration', 'none')}>
                                                <FontAwesomeIcon icon={faFont} />
                                            </Button>
                                            <Button variant={label.textDecoration === 'bold' ? 'dark' : 'light'} onClick={() => onEdit('textDecoration', 'bold')}>
                                                <FontAwesomeIcon icon={faBold} />
                                            </Button>
                                            <Button variant={label.textDecoration === 'italic' ? 'dark' : 'light'} onClick={() => onEdit('textDecoration', 'italic')}>
                                                <FontAwesomeIcon icon={faItalic} />
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Text Align</Form.Label>
                                    <Col sm={8}>
                                        <ButtonGroup>
                                            <Button variant={label.textAlign === 'left' ? 'dark' : 'light'} onClick={() => onEdit('textAlign', 'left')}>
                                                <FontAwesomeIcon icon={faAlignLeft} />
                                            </Button>
                                            <Button variant={label.textAlign === 'center' ? 'dark' : 'light'} onClick={() => onEdit('textAlign', 'center')}>
                                                <FontAwesomeIcon icon={faAlignCenter} />
                                            </Button>
                                            <Button variant={label.textAlign === 'right' ? 'dark' : 'light'} onClick={() => onEdit('textAlign', 'right')}>
                                                <FontAwesomeIcon icon={faAlignRight} />
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={label}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={label} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={label} onEdit={onEdit} enableMargin={true} enablePadding={true} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="model">
                            <ModelTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={control}
                                onConnect={onConnect}
                                onDisconnect={onDisconnect}
                                properties={['title']}
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

export default LabelEditor;