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
import { BackLink, ControlNumber, ControlText } from '../utils/FormKit';

const MapEditor = ({ control, scene, viewController, onCreate, onEdit, onDelete, onConnect, onDisconnect }) => {
    const map = control;
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {map.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="map-props-editor" defaultActiveKey="main">
                    <DefaultNav main position dimension spacing model />
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={map.name} onChange={value => onEdit('name', value)} />
                                <ControlNumber caption="Longitude" parser={parseFloat} step={0.001} min={-180} max={180} value={map.longitude} onChange={val => onEdit('longitude', val)} />
                                <ControlNumber caption="Latitude" parser={parseFloat} step={0.001} min={-90} max={90} value={map.latitude} onChange={val => onEdit('latitude', val)} />
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={map}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={map} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={map} onEdit={onEdit} enableMargin={true} enablePadding={true} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="model">
                            <ModelTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={map}
                                onConnect={onConnect}
                                onDisconnect={onDisconnect}
                                properties={['latitude', 'longitude']}
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

export default MapEditor;