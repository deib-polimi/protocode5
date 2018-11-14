import React from 'react';
import { Card, Tab, Nav, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faPencilAlt, faArrowsAlt, faExpand, faIndent } from '@fortawesome/free-solid-svg-icons';
import { ControlText, ControlNumber, ControlCustomColor, BackLink } from '../utils/FormKit';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import { UI_PHONE_CONTROL_CONSTRAINT, CONTROL_CHAIN, SMARTPHONE } from '../../../../../Constants';
import NavigationEditor from '../partials/NavigationEditor';

const ButtonEditor = ({ control, viewController, scene, onCreate, onEdit, onDelete, onNavigationCreate, onNavigationEdit, onNavigationDelete, scenes }) => {
    let button = control;
    let targetViewControllers = [];
    if (scene) {
        // SMARTPHONE or TABLET layout does not matter, children are the same
        targetViewControllers = scene.layout[SMARTPHONE].containers.map(c => c.containedViewController).filter(vc => vc.id !== viewController.id);
    }
    let navigation = null;
    if (scene) {
        navigation = control.navigations.find(nav => nav.fromSceneId === scene.id) || null;
    }
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={CONTROL_CHAIN} control={control.controlChain} />
                {button.name}
            </Card.Header>
            <Card.Body>
                <Tab.Container id="button-props-editor" defaultActiveKey="main">
                    <Nav variant="tabs" className="border-bottom mb-3">
                        <Nav.Item>
                            <Nav.Link eventKey="main">
                                <FontAwesomeIcon icon={faPencilAlt} />
                            </Nav.Link>
                        </Nav.Item>
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
                        <Nav.Item>
                            <Nav.Link eventKey="spacing">
                                <FontAwesomeIcon icon={faIndent} />
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Tab.Content>
                        <Tab.Pane eventKey="main">
                            <Form>
                                <ControlText caption="Name" value={button.name} onChange={value => onEdit('name', value)} />
                                <ControlText caption="Title" value={button.title} onChange={value => onEdit('title', value)} />
                                <ControlCustomColor customDefault="#000000" caption="Text Color" value={button.textColor} onChange={value => onEdit('textColor', value)} />
                                <ControlCustomColor customDefault="#cecece" caption="Background Color" value={button.backgroundColor} onChange={value => onEdit('backgroundColor', value)} />
                                <ControlCustomColor customDefault="#999999" caption="On Click Color" value={button.clickColor} onChange={value => onEdit('clickColor', value)} />
                                <ControlNumber caption="Border Radius" value={button.borderRadius} onChange={value => onEdit('borderRadius', value)} min={0} max={40} />
                                {scene &&
                                    <NavigationEditor
                                        navigation={navigation}
                                        scenes={scenes.filter(s => s.id !== scene.id)}
                                        viewControllers={targetViewControllers}
                                        onCreate={() => onNavigationCreate(scene.id, viewController.id, control.id, null, null)}
                                        onEdit={(toSceneId, toViewControllerId) => onNavigationEdit(navigation.id, toSceneId, toViewControllerId)}
                                        onDelete={() => onNavigationDelete(navigation.id)}
                                    />
                                }
                            </Form>
                        </Tab.Pane>
                        <Tab.Pane eventKey="position">
                            <PositionTab
                                scene={scene}
                                viewController={viewController}
                                uiPhoneControl={button}
                                onEdit={onEdit}
                                onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                            />
                        </Tab.Pane>
                        <Tab.Pane eventKey="dimension">
                            <DimensionTab uiPhoneControl={button} onEdit={onEdit} />
                        </Tab.Pane>
                        <Tab.Pane eventKey="spacing">
                            <SpacingTab uiPhoneControl={button} onEdit={onEdit} enableMargin={true} enablePadding={true} />
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
    );
}

export default ButtonEditor;