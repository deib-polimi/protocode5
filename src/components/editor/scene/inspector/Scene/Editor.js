import { faHome, faPencilAlt, faPlus, faTh, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Button, Card, Col, Form, ListGroup, Nav, Row, Tab } from 'react-bootstrap';
import { Link, Route } from 'react-router-dom';
import { SCENE_MULTI_VC, SCENE_SINGLE_VC, SCENE_SINGLE_VC_TAB } from '../../../../../Constants';
import SingleVCImage from '../../../../../img/gui/scene_type_1.jpg';
import SingleVCTabImage from '../../../../../img/gui/scene_type_2.jpg';
import MultiVCImage from '../../../../../img/gui/scene_type_3.jpg';
import { ControlImageSelect, ControlText } from '../utils/FormKit';

const SceneEditor = ({ viewControllers, scene, onLinkCreate, onEdit, onParentVCEdit, onDelete, onLinkDelete, device, onCreateConstraint, onContainerEdit }) => {
    let layout = scene.layout[device.type]; // indeed a ViewController!!!
    
    let childrenVCs = layout.containers;
    let childrenHash = {};
    childrenVCs.forEach(child => childrenHash[child.containedViewControllerId] = true);

    let availableVCs = viewControllers.filter(vc => childrenHash[vc.id] === undefined);

    let viewControllersHash = {};
    viewControllers.forEach(vc => viewControllersHash[vc.id] = vc);

    return (
        <>
            <Card style={{ width: '100%' }}>
                <Card.Header>
                    {scene.name}
                </Card.Header>
                <Card.Body>
                    <Tab.Container id="view-controller-props-editor" defaultActiveKey="main">
                        <Nav variant="tabs" className="border-bottom mb-3">
                            <Nav.Item>
                                <Nav.Link eventKey="main">
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="main">
                                {!scene.valid && 
                                    <Alert variant="danger">
                                        <p>Scene is invalid</p>
                                        <hr />
                                        <p>Please add at least one view controller</p>
                                    </Alert>
                                }
                                <Button
                                    className="mb-2 btn-block"
                                    variant={scene.launcher ? 'dark' : 'light'}
                                    onClick={() => { onEdit('launcher', !scene.launcher) }}
                                >
                                    <FontAwesomeIcon icon={faHome} /> {'Set launcher'}
                                </Button>
                                <Form>
                                    <ControlText
                                        caption="Name"
                                        value={scene.name}
                                        onChange={value => onEdit('name', value)}
                                    />
                                    <ControlImageSelect
                                        caption={`Type ${device.type}`}
                                        value={layout.type}
                                        onChange={value => onParentVCEdit(layout.id, 'type', value)}
                                    >
                                        <ControlImageSelect.Option value={SCENE_SINGLE_VC} image={SingleVCImage}>One VC per screen, without tab menu</ControlImageSelect.Option>
                                        <ControlImageSelect.Option value={SCENE_SINGLE_VC_TAB} image={SingleVCTabImage}>One VC per screen, with tab menu</ControlImageSelect.Option>
                                        <ControlImageSelect.Option value={SCENE_MULTI_VC} image={MultiVCImage}>Composed (all VCs on same screen)</ControlImageSelect.Option>
                                    </ControlImageSelect>
                                    {layout.type === SCENE_MULTI_VC &&
                                        <Route render={({history}) => (
                                            <Button className="btn-block" onClick={() => history.push(`/editor/scenes/${scene.id}/viewControllers/${layout.id}`)} >
                                                <FontAwesomeIcon icon={faTh} /> {'Arrange content'}
                                            </Button>
                                        )} />
                                    }
                                </Form>
                                <Card>
                                    <Card.Header>View Controllers</Card.Header>
                                    <ListGroup variant="flush">
                                        {childrenVCs.map(vcbox => (
                                            <ListGroup.Item key={vcbox.id}>
                                                <Row>
                                                    <Col sm={8}>
                                                        <div className="d-flex h-100 w-100 align-items-center">
                                                            <Link to={`/editor/scenes/${scene.id}/viewControllers/${vcbox.containedViewControllerId}`}>
                                                                {vcbox.containedViewController.name}
                                                            </Link>
                                                        </div>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Button variant="light" size="sm" onClick={() => onLinkDelete(vcbox.linkId)}>
                                                            <FontAwesomeIcon icon={faTrashAlt} />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    <Card.Header>Add another view controller</Card.Header>
                                    <ListGroup variant="flush">
                                        {availableVCs.map(vc => (
                                            <ListGroup.Item key={vc.id}>
                                                <Row>
                                                    <Col sm={8}>
                                                        <div className="d-flex h-100 w-100 align-items-center">
                                                            {vc.name}
                                                        </div>
                                                    </Col>
                                                    <Col sm={4}>
                                                        <Button variant="success" size="sm" onClick={() => onLinkCreate(scene.id, vc.id)}>
                                                            <FontAwesomeIcon icon={faPlus} />
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Card>
                            </Tab.Pane>
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
    )
};

export default SceneEditor;