import React from 'react';
import { Card, Tab } from 'react-bootstrap';
import { UI_PHONE_CONTROL_CONSTRAINT } from '../../../../../Constants';
import { DefaultNav } from '../partials/CommonNav';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import { BackLink } from '../utils/FormKit';

const ContainerEditor = ({ control, scene, viewController, onEdit, onCreate }) => {
    let container = control;
    return (
        <Card>
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} />
                {`Container for ${container.containedViewController.name}`}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="container-editor" defaultActiveKey="position">
                    <DefaultNav position dimension />
                    <Tab.Content>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={container}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={container} onEdit={onEdit} />
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    );
}

export default ContainerEditor;