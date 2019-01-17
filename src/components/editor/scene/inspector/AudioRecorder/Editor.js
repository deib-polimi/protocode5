import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Form, Row, Tab } from 'react-bootstrap';
import { CONTROL_CHAIN, UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_CONSTRAINT } from '../../../../../Constants';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import { DefaultNav } from '../partials/CommonNav';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { BackLink, ControlText } from '../utils/FormKit';

const AudioRecorderEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete }) => {
    const audioRecorder = control;
    let players = viewController.controls.filter(c => c.uiPhoneControlType === UI_PHONE_CONTROL_AUDIO_PLAYER);
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {audioRecorder.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="audioRecorder-props-editor" defaultActiveKey="main">
                    <DefaultNav main position dimension spacing />
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={audioRecorder.name} onChange={value => onEdit('name', value)} />
                                <Form.Group as={Row}>
                                    <Form.Label column sm={4}>Select audio player</Form.Label>
                                    <Col sm={8}>
                                        <SmartFormControl as="select" value={audioRecorder.audioPlayerId || ''} onChange={val => onEdit('audioPlayerId', val !== '' ? val : null)}>
                                            <option value=''>None</option>
                                            {players.map(player => (
                                                <option key={player.id} value={player.id}>{player.name}</option>
                                            ))}
                                        </SmartFormControl>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={audioRecorder}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={audioRecorder} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={audioRecorder} onEdit={onEdit} enableMargin={true} enablePadding={true} />
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

export default AudioRecorderEditor;