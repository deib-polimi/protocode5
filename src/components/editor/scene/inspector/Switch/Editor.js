import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Form, Tab } from 'react-bootstrap';
import { CONTROL_CHAIN, UI_PHONE_CONTROL_CONSTRAINT } from '../../../../../Constants';
import { DefaultNav } from '../partials/CommonNav';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import ModelTab from '../UiPhoneControl/ModelTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { BackLink, ControlText } from '../utils/FormKit';

const SwitchControlEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete, onConnect, onDisconnect }) => {
    const switchControl = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {switchControl.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="switchControl-props-editor" defaultActiveKey="main">
                    <DefaultNav main position dimension spacing model />
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={switchControl.name} onChange={value => onEdit('name', value)} />
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={switchControl}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={switchControl} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={switchControl} onEdit={onEdit} enableMargin={true} enablePadding={true} />
                        </Tab.Pane>
                        <Tab.Pane>
                            <ModelTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={switchControl}
                                onConnect={onConnect}
                                onDisconnect={onDisconnect}
                                properties={['value']}
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

export default SwitchControlEditor;