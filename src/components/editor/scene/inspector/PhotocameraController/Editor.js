import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup, Card, Col, Form, Row, Tab } from 'react-bootstrap';
import { CONTROL_CHAIN, PHOTOCAMERA_BACKGROUND_ICON, PHOTOCAMERA_BACKGROUND_NORMAL, UI_PHONE_CONTROL_CONSTRAINT, UI_PHONE_CONTROL_IMAGE_VIEW } from '../../../../../Constants';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import { DefaultNav } from '../partials/CommonNav';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { BackLink, ControlText } from '../utils/FormKit';

const PhotoCameraControllerEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete }) => {
    const photoCameraController = control;
    let imageViews = viewController.controls.filter(c => c.uiPhoneControlType === UI_PHONE_CONTROL_IMAGE_VIEW);
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {photoCameraController.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="photoCameraController-props-editor" defaultActiveKey="main">
                    <DefaultNav main position dimension spacing />
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={photoCameraController.name} onChange={value => onEdit('name', value)} />
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Select image view</Form.Label>
                                    <Col sm={8}>
                                        <SmartFormControl as="select" value={photoCameraController.imageViewId || ''} onChange={val => onEdit('imageViewId', val !== '' ? val : null)}>
                                            <option value=''>None</option>
                                            {imageViews.map(imageView => (
                                                <option key={imageView.id} value={imageView.id}>{imageView.name}</option>
                                            ))}
                                        </SmartFormControl>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Background type</Form.Label>
                                    <Col sm={8}>
                                        <ButtonGroup>
                                            <Button
                                                variant={photoCameraController.backgroundType === PHOTOCAMERA_BACKGROUND_NORMAL ? 'dark' : 'light'}
                                                onClick={() => onEdit('backgroundType', PHOTOCAMERA_BACKGROUND_NORMAL)}
                                            >Normal</Button>
                                            <Button
                                                variant={photoCameraController.backgroundType === PHOTOCAMERA_BACKGROUND_ICON ? 'dark' : 'light'}
                                                onClick={() => onEdit('backgroundType', PHOTOCAMERA_BACKGROUND_ICON)}
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
                                uiPhoneControl={photoCameraController}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={photoCameraController} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={photoCameraController} onEdit={onEdit} enableMargin={true} enablePadding={true} />
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

export default PhotoCameraControllerEditor;