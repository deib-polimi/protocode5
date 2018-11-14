import React from 'react';
import { Card, Tab, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faExclamationCircle, faCreditCard, faRandom } from '@fortawesome/free-solid-svg-icons';
import MainProperties from './MainProperties';
import Async from './Async';
import Alerts from './Alerts';
import Progresses from './Progresses';
import { BackLink } from '../utils/FormKit';

const ViewControllerEditor = ({ match, viewController, scene, onCreate, onEdit, onAlertAdd, onProgressAdd, onAsyncTaskAdd }) => (
    <>
        <Card style={{ width: '100%' }}>
            <Card.Header>
                {scene &&
                    <BackLink scene={scene} />
                }
                {viewController.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="view-controller-props-editor" defaultActiveKey="main">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="main">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Nav.Link>
                        </Nav.Item>
                        {!viewController.isParent &&
                            <>
                                <Nav.Item>
                                    <Nav.Link eventKey="alert">
                                        <FontAwesomeIcon icon={faExclamationCircle} />{viewController.alertDialogs.length}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="progress">
                                        <FontAwesomeIcon icon={faCreditCard} />{viewController.progressDialogs.length}
                                    </Nav.Link>
                                </Nav.Item>
                                <Nav.Item>
                                    <Nav.Link eventKey="async">
                                        <FontAwesomeIcon icon={faRandom} />{viewController.asyncTasks.length}
                                    </Nav.Link>
                                </Nav.Item>
                            </>
                        }
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <MainProperties
                                scene={scene}
                                onCreate={onCreate}
                                viewController={viewController}
                                onEdit={onEdit}
                            />
                        </Tab.Pane>
                        {!viewController.isParent &&
                            <>
                                <Tab.Pane eventKey="alert">
                                    <Alerts match={match} alertDialogs={viewController.alertDialogs} onAlertAdd={() => onAlertAdd(viewController.id)} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="progress">
                                    <Progresses match={match} progressDialogs={viewController.progressDialogs} onProgressAdd={() => onProgressAdd(viewController.id)} />
                                </Tab.Pane>
                                <Tab.Pane eventKey="async">
                                    <Async match={match} asyncTasks={viewController.asyncTasks} onAsyncTaskAdd={() => onAsyncTaskAdd(viewController.id)} />
                                </Tab.Pane>
                            </>
                        }
                    </Tab.Content>
                </Tab.Container>
            </Card.Body>
        </Card>
    </>
);

export default ViewControllerEditor;