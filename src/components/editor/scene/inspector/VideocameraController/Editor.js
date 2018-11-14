import { faArrowsAlt, faExpand, faIndent, faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form, Nav, Tab, Row, Col, ButtonGroup } from 'react-bootstrap';
import { UI_PHONE_CONTROL_CONSTRAINT, UI_PHONE_CONTROL_VIDEO_VIEW, VIDEOCAMERA_BACKGROUND_NORMAL, VIDEOCAMERA_BACKGROUND_ICON, CONTROL_CHAIN } from '../../../../../Constants';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { ControlText, BackLink } from '../utils/FormKit';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';

const VideoCameraControllerEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete }) => {
    const videoCameraController = control;
    let videoViews = viewController.controls.filter(c => c.uiPhoneControlType === UI_PHONE_CONTROL_VIDEO_VIEW);
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {videoCameraController.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="videoCameraController-props-editor" defaultActiveKey="main">
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
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={videoCameraController.name} onChange={value => onEdit('name', value)} />
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Select video view</Form.Label>
                                    <Col sm={8}>
                                        <SmartFormControl as="select" value={videoCameraController.videoViewId || ''} onChange={val => onEdit('videoViewId', val !== '' ? val : null)}>
                                            <option value=''>None</option>
                                            {videoViews.map(videoView => (
                                                <option key={videoView.id} value={videoView.id}>{videoView.name}</option>
                                            ))}
                                        </SmartFormControl>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Background type</Form.Label>
                                    <Col sm={8}>
                                        <ButtonGroup>
                                            <Button
                                                variant={videoCameraController.backgroundType === VIDEOCAMERA_BACKGROUND_NORMAL ? 'dark' : 'light'}
                                                onClick={() => onEdit('backgroundType', VIDEOCAMERA_BACKGROUND_NORMAL)}
                                            >Normal</Button>
                                            <Button
                                                variant={videoCameraController.backgroundType === VIDEOCAMERA_BACKGROUND_ICON ? 'dark' : 'light'}
                                                onClick={() => onEdit('backgroundType', VIDEOCAMERA_BACKGROUND_ICON)}
                                            >Icon</Button>
                                        </ButtonGroup>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={videoCameraController}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={videoCameraController} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={videoCameraController} onEdit={onEdit} enableMargin={true} enablePadding={true} />
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

export default VideoCameraControllerEditor;