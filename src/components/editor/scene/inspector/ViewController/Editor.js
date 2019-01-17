import { faCreditCard, faExclamationCircle, faPencilAlt, faRandom, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Tab } from 'react-bootstrap';
import { CommonNav } from '../partials/CommonNav';
import { BackLink } from '../utils/FormKit';
import Alerts from './Alerts';
import Async from './Async';
import MainProperties from './MainProperties';
import Progresses from './Progresses';

const ViewControllerEditor = ({ match, viewController, scene, onCreate, onEdit, onAlertAdd, onProgressAdd, onAsyncTaskAdd, onDelete }) => (
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
                    <CommonNav items={
                        viewController.isParent ? 
                        [{ eventKey: 'main', icon: faPencilAlt }] :
                        [
                            { eventKey: 'main', icon: faPencilAlt },
                            { eventKey: 'alert', icon: faExclamationCircle },
                            { eventKey: 'progress', icon: faCreditCard },
                            { eventKey: 'async', icon: faRandom },
                        ]
                    } />
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
            <Card.Footer>
                <Button variant="light" onClick={() => onDelete()}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </Card.Footer>
        </Card>
    </>
);

export default ViewControllerEditor;