import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowsAlt, faExpand } from '@fortawesome/free-solid-svg-icons';
import { Card, Tab, Nav } from 'react-bootstrap';
import PositionTab from '../UiPhoneControl/PositionTab';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import { UI_PHONE_CONTROL_CONSTRAINT } from '../../../../../Constants';
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
                    <Nav variant="tabs" className="border-bottom mb-3" defaultActiveKey="position">
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
                    </Nav>
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