import { faArrowsAlt, faExpand, faIndent, faPencilAlt, faPlus, faSave, faTimes, faTrashAlt, faSitemap, faTable } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, ButtonGroup, Card, Form, ListGroup, Nav, Tab, Col, InputGroup, Row } from 'react-bootstrap';
import { GRID_VIEW_DETAILED, GRID_VIEW_IMAGE, UI_PHONE_CONTROL_CONSTRAINT, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_ELEMENT_GRID_VIEW_CELL, GRID_VIEW_SIMPLE, CONTROL_CHAIN, SMARTPHONE } from '../../../../../Constants';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import DimensionTab from '../UiPhoneControl/DimensionTab';
import PositionTab from '../UiPhoneControl/PositionTab';
import SpacingTab from '../UiPhoneControl/SpacingTab';
import { ControlCustomColor, ControlText, BackLink } from '../utils/FormKit';
import { Link } from 'react-router-dom';
import NavigationEditor from '../partials/NavigationEditor';
import ModelTab from '../UiPhoneControl/ModelTab';
import GridCellModelEditor from './EditorModelCell';

class GridViewEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            creatingName: ''
        }
        this.startCreating = this.startCreating.bind(this);
        this.saveCreation = this.saveCreation.bind(this);
        this.abortCreation = this.abortCreation.bind(this);
    }
    startCreating() {
        this.setState({
            isCreating: true,
            creatingName: ''
        })
    }
    saveCreation() {
        let name = this.state.creatingName;
        this.setState({
            isCreating: false,
            creatingName: ''
        });
        this.props.onCreate(UI_PHONE_ELEMENT_GRID_VIEW_CELL, this.props.viewController.id, this.props.control.id, name);
    }
    abortCreation() {
        this.setState({
            isCreating: false,
            creatingName: ''
        });
    }
    render() {
        const { control, viewController, scene, onCreate, onEdit, onDelete, onNavigationCreate, onNavigationEdit, onNavigationDelete, scenes, onConnect, onDisconnect } = this.props;
        let gridView = control;
        let cellLinkBase = '';
        if (scene) {
            cellLinkBase = `/editor/scenes/${scene.id}/viewControllers/${viewController.id}/${UI_PHONE_CONTROL_GRID_VIEW}/${gridView.id}/cell`;
        } else {
            cellLinkBase = `/editor/scenes/viewControllers/${viewController.id}/${UI_PHONE_CONTROL_GRID_VIEW}/${gridView.id}/cell`;
        }
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
                    {gridView.name}
                </Card.Header>
                <Card.Body>
                    <Tab.Container id="gridview-props-editor" defaultActiveKey="main">
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
                            <Nav.Item>
                                <Nav.Link eventKey="model">
                                    <FontAwesomeIcon icon={faSitemap} />
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="cellmodel">
                                    <FontAwesomeIcon icon={faTable} />
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="main">
                                <Form>
                                    <ControlText caption="Name" value={gridView.name} onChange={value => onEdit('name', value)} />
                                    <ControlCustomColor
                                        caption="Background Color"
                                        customDefault="#FFFFFF"
                                        value={gridView.backgroundColor}
                                        onChange={val => onEdit('backgroundColor', val)}
                                    />
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={4}>Grid style</Form.Label>
                                        <Col sm={8}>
                                            <ButtonGroup vertical size="sm">
                                                <Button
                                                    variant={gridView.gridType === GRID_VIEW_SIMPLE ? 'dark' : 'light'}
                                                    onClick={() => onEdit('gridType', GRID_VIEW_SIMPLE)}
                                                >Simple</Button>
                                                <Button
                                                    variant={gridView.gridType === GRID_VIEW_IMAGE ? 'dark' : 'light'}
                                                    onClick={() => onEdit('gridType', GRID_VIEW_IMAGE)}
                                                >With image</Button>
                                                <Button
                                                    variant={gridView.gridType === GRID_VIEW_DETAILED ? 'dark' : 'light'}
                                                    onClick={() => onEdit('gridType', GRID_VIEW_DETAILED)}
                                                >Detailed</Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Form.Group>
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
                                    <p className="text-align-center font-weight-bold">Grid view cells</p>
                                    <ListGroup>
                                        {gridView.gridViewCells.map(cell => (
                                            <ListGroup.Item key={cell.id}>
                                                <Link to={`${cellLinkBase}/${cell.id}`}>
                                                    {cell.name}
                                                </Link>
                                            </ListGroup.Item>
                                        ))}
                                        <ListGroup.Item>
                                            {this.state.isCreating &&
                                                <InputGroup>
                                                    <SmartFormControl
                                                        placeholder="Cell title"
                                                        value={this.state.creatingName}
                                                        onChange={v => this.setState({ creatingName: v })}
                                                    />
                                                    <InputGroup.Append>
                                                        <Button variant="light" onClick={this.saveCreation}>
                                                            <FontAwesomeIcon icon={faSave} />
                                                        </Button>
                                                        <Button variant="light" onClick={this.abortCreation}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            }
                                            {!this.state.isCreating &&
                                                <Button variant="light" onClick={this.startCreating}>
                                                    <FontAwesomeIcon icon={faPlus} /> {'Add grid view cell'}
                                                </Button>
                                            }
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="position">
                                <PositionTab
                                    scene={scene}
                                    viewController={viewController}
                                    uiPhoneControl={gridView}
                                    onEdit={onEdit}
                                    onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="dimension">
                                <DimensionTab uiPhoneControl={gridView} onEdit={onEdit} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="spacing">
                                <SpacingTab uiPhoneControl={gridView} onEdit={onEdit} enableMargin={true} enablePadding={true} />
                            </Tab.Pane>
                            <Tab.Pane eventKey="model">
                                <ModelTab
                                    scene={scene}
                                    viewController={viewController}
                                    uiPhoneControl={control}
                                    onConnect={onConnect}
                                    onDisconnect={onDisconnect}
                                    properties={['items']}
                                />
                            </Tab.Pane>
                            <Tab.Pane eventKey="cellmodel">
                                <GridCellModelEditor
                                    scene={scene}
                                    viewController={viewController}
                                    grid={gridView}
                                    onConnect={onConnect}
                                    onDisconnect={onDisconnect}
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
        );
    }
}

export default GridViewEditor;