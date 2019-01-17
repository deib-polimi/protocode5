import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form, Tab } from 'react-bootstrap';
import { CONTROL_CHAIN, SOURCE_TYPE_HARDWARE, UI_PHONE_CONTROL_CONSTRAINT } from '../../../../../Constants';
import { DefaultNav } from '../partials/CommonNav';
import SourceTypeEditor from '../partials/SourceTypeEditor';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import ModelTab from '../UiPhoneControl/ModelTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { BackLink, ControlText } from '../utils/FormKit';

const VideoViewEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete, onSourceTypeEdit, onConnect, onDisconnect }) => {
    const videoView = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {videoView.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="videoView-props-editor" defaultActiveKey="main">
                    <DefaultNav main position dimension spacing model={videoView.sourceType.type !== SOURCE_TYPE_HARDWARE} />
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={videoView.name} onChange={value => onEdit('name', value)} />
                                <SourceTypeEditor
                                    sourceType={videoView.sourceType}
                                    onEdit={onSourceTypeEdit}
                                />
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={videoView}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={videoView} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={videoView} onEdit={onEdit} enableMargin={true} enablePadding={true} />
                        </Tab.Pane>
                        {videoView.sourceType.type !== SOURCE_TYPE_HARDWARE && 
                            <Tab.Pane eventKey="model">
                                <ModelTab
                                    scene={scene}
                                    viewController={viewController}
                                    uiPhoneControl={control}
                                    onConnect={onConnect}
                                    onDisconnect={onDisconnect}
                                    properties={['source']}
                                />
                            </Tab.Pane>
                        }
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

export default VideoViewEditor;