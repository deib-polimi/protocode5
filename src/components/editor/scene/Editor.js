import React from 'react';
import Navigator from './Navigator';
import { Col, Row, Container, Button, Card } from 'react-bootstrap';
import { Route, Redirect, Switch } from 'react-router';
import { createViewController, editViewController, deleteViewController } from '../../../actions/ViewController';
import { createScene, editScene, deleteScene, unlinkViewController, linkViewController, editContainer } from '../../../actions/Scene';
import { createAlertDialog, editAlertDialog, deleteAlertDialog } from '../../../actions/AlertDialog';
import { createProgressDialog, editProgressDialog, deleteProgressDialog } from '../../../actions/ProgressDialog';
import { createAsyncTask, editAsyncTask, deleteAsyncTask } from '../../../actions/AsyncTask';
import { connect } from 'react-redux';
import ViewControllerEditor from './inspector/ViewController/Editor';
import Canvas from './canvas/Canvas';
import ViewControllerSelector, { ViewControllerAll } from '../../../selectors/ViewController';
import { deleteUiPhoneControl, createUiPhoneControl, editUiPhoneControl } from '../../../actions/UiPhoneControl';
import { UI_PHONE_CONTROL_LABEL, UI_PHONE_CONTROL_CONSTRAINT, UI_PHONE_CONTROL_BUTTON, UI_PHONE_CONTROL_TEXTEDIT, UI_PHONE_CONTROL_SPINNER, UI_PHONE_CONTROL_SWITCH, UI_PHONE_CONTROL_SLIDER, UI_PHONE_CONTROL_WEBVIEW, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, UI_PHONE_CONTROL_MAP, UI_PHONE_CONTROL_TIMEPICKER, UI_PHONE_CONTROL_CARD, UI_PHONE_CONTROL_LIST_VIEW, UI_PHONE_ELEMENT_ALERT_DIALOG, UI_PHONE_ELEMENT_PROGRESS_DIALOG, UI_PHONE_ELEMENT_LIST_VIEW_CELL, UI_PHONE_ELEMENT_GRID_VIEW_CELL, UI_PHONE_MEDIA_SOURCE_TYPE, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_ELEMENT_ASYNC_TASK, UI_PHONE_CONTROL_AUDIO_RECORDER, UI_PHONE_CONTROL_DATEPICKER, CONTROL_CHAIN, UI_PHONE_SCENE, SCENE_VC_LINK, UI_PHONE_CONTROL_CONTAINER, UI_PHONE_VIEW_CONTROLLER, UI_PHONE_DYNAMICS_NAVIGATION, UI_PHONE_ELEMENT_MENU, UI_PHONE_ELEMENT_MENU_ITEM } from '../../../Constants';
import { editConstraint, deleteConstraint, createConstraint } from '../../../actions/Constraint';
import ConstraintEditor from './inspector/Constraint/Editor';
import Inspector from './inspector/Inspector';
import { editSourceType } from '../../../actions/SourceType';
import { createControlChain, editControlChain, deleteControlChain } from '../../../actions/ControlChain';
import { createListViewCell, editListViewCell, deleteListViewCell } from '../../../actions/ListViewCell';
import { createGridViewCell, editGridViewCell, deleteGridViewCell } from '../../../actions/GridViewCell';
import SceneEditor from './inspector/Scene/Editor';
import { SmartPhones } from '../../../devices/Devices';
import SceneSelector, { SceneAll } from '../../../selectors/Scene';
import { createNavigation, deleteNavigation, editNavigation } from '../../../actions/Navigation';
import { MenuItemAll } from '../../../selectors/Menu';
import { createMenuItem, deleteMenuItem, editMenuItem } from '../../../actions/MenuItem';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import SceneReport from './report/Scene';
import ViewControllerReport from './report/ViewController';

/**
 * props = { match, app, scenes, viewControllers, scene, viewController, onCreate, onEdit, onDelete }
 */

class SmartphoneEditorTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: 'android',
            device: SmartPhones.find(s => s.platform === 'android')
        };
        this.changeDevice = this.changeDevice.bind(this);
        this.changePlatform = this.changePlatform.bind(this);
    }
    changeDevice(device) {
        this.setState({
            device
        });
    }
    changePlatform(platform) {
        this.setState({
            platform,
            device: SmartPhones.find(s => s.platform === platform)
        });
    }
    render() {
        let { match, app, scenes, viewControllers, scene, viewController, onCreate, onEdit, onDelete, menu } = this.props;
        return (
            <>
                {(scene !== null && viewController === null) &&
                    <Redirect to={`/editor/scenes/${scene.id}`} />
                }
                {(scene === null || (scene === false && viewController === null)) &&
                    <Redirect to="/editor/scenes" />
                }
                {app === null &&
                    <Redirect to="/" />
                }
                <Container fluid>
                    <Row>
                        <Col sm={3}>
                            <Row>
                                <Navigator
                                    className="mb-2 w-100 d-flex flex-column"
                                    scenes={scenes}
                                    viewControllers={viewControllers}
                                    onSceneCreate={() => onCreate(UI_PHONE_SCENE)}
                                    onViewControllerCreate={() => onCreate(UI_PHONE_VIEW_CONTROLLER)}
                                />
                                {!!scene &&
                                    <LinkContainer to={`${match.url}/menu`}>
                                        <Button variant="success" className="mb-2 btn-block">
                                            <FontAwesomeIcon icon={faBars} /> Edit application menu
                                        </Button>
                                    </LinkContainer>
                                }
                            </Row>
                            {(scene || viewController) &&
                                <Row>
                                    <Switch>
                                        <Route exact path={`${match.path}/${UI_PHONE_ELEMENT_MENU}`} render={props => (
                                            <Inspector
                                                {...props}
                                                viewController={viewController}
                                                scene={scene}
                                                scenes={scenes}
                                                controlId={null}
                                                controlType={UI_PHONE_ELEMENT_MENU}
                                                onCreate={onCreate}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                menu={menu}
                                            />
                                        )} />
                                        <Route exact path={`${match.path}/${UI_PHONE_ELEMENT_MENU}/:itemId`} render={props => (
                                            <Inspector
                                                {...props}
                                                viewController={viewController}
                                                scene={scene}
                                                scenes={scenes}
                                                controlId={props.match.params.itemId}
                                                controlType={UI_PHONE_ELEMENT_MENU_ITEM}
                                                onCreate={onCreate}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                menu={menu}
                                            />
                                        )} />
                                        <Route exact path={`${match.path}/:controlType/:controlId`} render={props => (
                                            <Inspector
                                                {...props}
                                                viewController={viewController}
                                                scene={scene}
                                                scenes={scenes}
                                                controlId={props.match.params.controlId}
                                                controlType={props.match.params.controlType}
                                                onCreate={onCreate}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                            />
                                        )} />
                                        <Route exact path={`${match.path}/${UI_PHONE_CONTROL_LIST_VIEW}/:controlId/cell/:cellId`} render={props => (
                                            <Inspector
                                                {...props}
                                                viewController={viewController}
                                                scene={scene}
                                                scenes={scenes}
                                                controlId={props.match.params.cellId}
                                                controlType={UI_PHONE_ELEMENT_LIST_VIEW_CELL}
                                                onCreate={onCreate}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                listId={props.match.params.controlId}
                                            />
                                        )} />
                                        <Route exact path={`${match.path}/${UI_PHONE_CONTROL_GRID_VIEW}/:controlId/cell/:cellId`} render={props => (
                                            <Inspector
                                                {...props}
                                                viewController={viewController}
                                                scene={scene}
                                                scenes={scenes}
                                                controlId={props.match.params.cellId}
                                                controlType={UI_PHONE_ELEMENT_GRID_VIEW_CELL}
                                                onCreate={onCreate}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                                gridId={props.match.params.controlId}
                                            />
                                        )} />
                                        <Route exact path={`${match.path}/:controlType/:controlId/constraints/:constraintId`} render={props => (
                                            <ConstraintEditor
                                                {...props}
                                                viewController={viewController}
                                                scene={scene}
                                                uiPhoneControlId={props.match.params.controlId}
                                                constraintId={props.match.params.constraintId}
                                                onEdit={(id, prop, value) => onEdit(UI_PHONE_CONTROL_CONSTRAINT, id, prop, value)}
                                                onDelete={id => onDelete(UI_PHONE_CONTROL_CONSTRAINT, id)}
                                            />
                                        )} />

                                        <Route render={props => (
                                            <>
                                                {viewController &&
                                                    <ViewControllerEditor
                                                        {...props}
                                                        viewController={viewController}
                                                        scene={scene}
                                                        onCreate={onCreate}
                                                        onEdit={(prop, value) => onEdit(UI_PHONE_VIEW_CONTROLLER, viewController.id, prop, value)}
                                                        onAlertAdd={() => onCreate(UI_PHONE_ELEMENT_ALERT_DIALOG, viewController.id)}
                                                        onProgressAdd={() => onCreate(UI_PHONE_ELEMENT_PROGRESS_DIALOG, viewController.id)}
                                                        onAsyncTaskAdd={() => onCreate(UI_PHONE_ELEMENT_ASYNC_TASK, viewController.id)}
                                                    />
                                                }
                                                {!viewController &&
                                                    <SceneEditor
                                                        {...props}
                                                        scene={scene}
                                                        viewControllers={viewControllers}
                                                        onEdit={(prop, value) => onEdit(UI_PHONE_SCENE, scene.id, prop, value)}
                                                        onParentVCEdit={(id, prop, value) => onEdit(UI_PHONE_VIEW_CONTROLLER, id, prop, value)}
                                                        onContainerEdit={(id, prop, value) => onEdit(UI_PHONE_CONTROL_CONTAINER, id, prop, value)}
                                                        onCreateConstraint={(...args) => onCreate(UI_PHONE_CONTROL_CONSTRAINT, ...args)}
                                                        onDelete={() => onDelete(UI_PHONE_SCENE, scene.id)}
                                                        device={this.state.device}
                                                        onLinkCreate={(sceneId, viewControllerId) => onCreate(SCENE_VC_LINK, sceneId, viewControllerId)}
                                                        onLinkDelete={linkId => onDelete(SCENE_VC_LINK, linkId)}
                                                    />
                                                }
                                            </>
                                        )} />
                                    </Switch>
                                </Row>
                            }
                            <Row>
                                {scene &&
                                    <Card className="w-100 h-100 mt-3">
                                        <Card.Body>
                                            <SceneReport scene={scene} />
                                        </Card.Body>
                                    </Card>
                                }
                                {!scene && viewController &&
                                    <Card className="w-100 h-100 mt-3">
                                        <Card.Body>
                                            <ViewControllerReport viewController={viewController} />
                                        </Card.Body>
                                    </Card>
                                }
                            </Row>
                        </Col>
                        <Col sm={9}>
                            {(scene || viewController) &&
                                <Switch>
                                    <Route path={`${match.path}/:controlType/:controlId`} render={props => (
                                        <Canvas
                                            app={app}
                                            viewController={viewController || scene.layout[this.state.device.type]}
                                            scene={scene}
                                            platform={this.state.platform}
                                            device={this.state.device}
                                            onPlatformChange={this.changePlatform}
                                            onDeviceChange={this.changeDevice}
                                            onCreate={onCreate}
                                            menu={menu}
                                            activeControlId={props.match.params.controlId}
                                        />
                                    )} />
                                    <Route render={props => (
                                        <Canvas
                                            app={app}
                                            viewController={viewController || scene.layout[this.state.device.type]}
                                            scene={scene}
                                            platform={this.state.platform}
                                            device={this.state.device}
                                            onPlatformChange={this.changePlatform}
                                            onDeviceChange={this.changeDevice}
                                            onCreate={onCreate}
                                            menu={menu}
                                            activeControlId={null}
                                        />
                                    )} />
                                </Switch>
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let sid = ownProps.match.params.sid;
    let vcid = ownProps.match.params.vcid;
    let scene = false, viewController = false;
    if (vcid) {
        viewController = ViewControllerSelector(state, vcid);
    }
    if (sid) {
        scene = SceneSelector(state, sid);
    }
    return {
        scenes: SceneAll(state),
        viewControllers: ViewControllerAll(state),
        menu: MenuItemAll(state),
        scene,
        viewController,
        app: state.application
    };
}

const creators = {
    [UI_PHONE_VIEW_CONTROLLER]: createViewController,
    [UI_PHONE_SCENE]: createScene,
    [SCENE_VC_LINK]: linkViewController,
    [UI_PHONE_ELEMENT_ALERT_DIALOG]: createAlertDialog,
    [UI_PHONE_ELEMENT_PROGRESS_DIALOG]: createProgressDialog,
    [UI_PHONE_ELEMENT_ASYNC_TASK]: createAsyncTask,
    [UI_PHONE_CONTROL_BUTTON]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_BUTTON, ...args),
    [UI_PHONE_CONTROL_LABEL]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_LABEL, ...args),
    [UI_PHONE_CONTROL_TEXTEDIT]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_TEXTEDIT, ...args),
    [UI_PHONE_CONTROL_SPINNER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_SPINNER, ...args),
    [UI_PHONE_CONTROL_SWITCH]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_SWITCH, ...args),
    [UI_PHONE_CONTROL_SLIDER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_SLIDER, ...args),
    [UI_PHONE_CONTROL_WEBVIEW]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_WEBVIEW, ...args),
    [UI_PHONE_CONTROL_IMAGE_VIEW]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_IMAGE_VIEW, ...args),
    [UI_PHONE_CONTROL_VIDEO_VIEW]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_VIDEO_VIEW, ...args),
    [UI_PHONE_CONTROL_AUDIO_PLAYER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_AUDIO_PLAYER, ...args),
    [UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, ...args),
    [UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, ...args),
    [UI_PHONE_CONTROL_AUDIO_RECORDER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_AUDIO_RECORDER, ...args),
    [UI_PHONE_CONTROL_MAP]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_MAP, ...args),
    [UI_PHONE_CONTROL_DATEPICKER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_DATEPICKER, ...args),
    [UI_PHONE_CONTROL_TIMEPICKER]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_TIMEPICKER, ...args),
    [UI_PHONE_CONTROL_CARD]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_CARD, ...args),
    [UI_PHONE_CONTROL_LIST_VIEW]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_LIST_VIEW, ...args),
    [UI_PHONE_CONTROL_GRID_VIEW]: (...args) => createUiPhoneControl(UI_PHONE_CONTROL_GRID_VIEW, ...args),
    [UI_PHONE_CONTROL_CONSTRAINT]: createConstraint,
    [UI_PHONE_ELEMENT_LIST_VIEW_CELL]: createListViewCell,
    [UI_PHONE_ELEMENT_GRID_VIEW_CELL]: createGridViewCell,
    [CONTROL_CHAIN]: createControlChain,
    [UI_PHONE_DYNAMICS_NAVIGATION]: createNavigation,
    [UI_PHONE_ELEMENT_MENU_ITEM]: createMenuItem
};

const editors = {
    [UI_PHONE_VIEW_CONTROLLER]: editViewController,
    [UI_PHONE_SCENE]: editScene,
    [UI_PHONE_ELEMENT_ALERT_DIALOG]: editAlertDialog,
    [UI_PHONE_ELEMENT_PROGRESS_DIALOG]: editProgressDialog,
    [UI_PHONE_ELEMENT_ASYNC_TASK]: editAsyncTask,
    [UI_PHONE_CONTROL_BUTTON]: editUiPhoneControl,
    [UI_PHONE_CONTROL_LABEL]: editUiPhoneControl,
    [UI_PHONE_CONTROL_TEXTEDIT]: editUiPhoneControl,
    [UI_PHONE_CONTROL_SPINNER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_SWITCH]: editUiPhoneControl,
    [UI_PHONE_CONTROL_SLIDER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_WEBVIEW]: editUiPhoneControl,
    [UI_PHONE_CONTROL_IMAGE_VIEW]: editUiPhoneControl,
    [UI_PHONE_CONTROL_VIDEO_VIEW]: editUiPhoneControl,
    [UI_PHONE_CONTROL_AUDIO_PLAYER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_AUDIO_RECORDER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_MAP]: editUiPhoneControl,
    [UI_PHONE_CONTROL_DATEPICKER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_TIMEPICKER]: editUiPhoneControl,
    [UI_PHONE_CONTROL_CARD]: editUiPhoneControl,
    [UI_PHONE_CONTROL_LIST_VIEW]: editUiPhoneControl,
    [UI_PHONE_CONTROL_GRID_VIEW]: editUiPhoneControl,
    [UI_PHONE_CONTROL_CONSTRAINT]: editConstraint,
    [UI_PHONE_MEDIA_SOURCE_TYPE]: editSourceType,
    [UI_PHONE_ELEMENT_LIST_VIEW_CELL]: editListViewCell,
    [UI_PHONE_ELEMENT_GRID_VIEW_CELL]: editGridViewCell,
    [CONTROL_CHAIN]: editControlChain,
    [UI_PHONE_CONTROL_CONTAINER]: editContainer,
    [UI_PHONE_DYNAMICS_NAVIGATION]: editNavigation,
    [UI_PHONE_ELEMENT_MENU_ITEM]: editMenuItem
};

const deletors = {
    [UI_PHONE_VIEW_CONTROLLER]: deleteViewController,
    [UI_PHONE_SCENE]: deleteScene,
    [SCENE_VC_LINK]: unlinkViewController,
    [UI_PHONE_ELEMENT_ALERT_DIALOG]: deleteAlertDialog,
    [UI_PHONE_ELEMENT_PROGRESS_DIALOG]: deleteProgressDialog,
    [UI_PHONE_ELEMENT_ASYNC_TASK]: deleteAsyncTask,
    [UI_PHONE_CONTROL_BUTTON]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_LABEL]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_TEXTEDIT]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_SPINNER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_SWITCH]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_SLIDER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_WEBVIEW]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_IMAGE_VIEW]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_VIDEO_VIEW]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_AUDIO_PLAYER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_AUDIO_RECORDER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_MAP]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_DATEPICKER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_TIMEPICKER]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_CARD]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_LIST_VIEW]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_GRID_VIEW]: deleteUiPhoneControl,
    [UI_PHONE_CONTROL_CONSTRAINT]: deleteConstraint,
    [UI_PHONE_ELEMENT_LIST_VIEW_CELL]: deleteListViewCell,
    [UI_PHONE_ELEMENT_GRID_VIEW_CELL]: deleteGridViewCell,
    [CONTROL_CHAIN]: deleteControlChain,
    [UI_PHONE_DYNAMICS_NAVIGATION]: deleteNavigation,
    [UI_PHONE_ELEMENT_MENU_ITEM]: deleteMenuItem
}

const mapDispatchToProps = dispatch => {
    return {
        onCreate: (itemClass, ...params) => {
            if (creators[itemClass]) {
                dispatch(creators[itemClass](...params));
            }
        },
        onEdit: (itemClass, itemId, prop, value) => {
            if (editors[itemClass]) {
                dispatch(editors[itemClass](itemId, prop, value));
            }
        },
        onDelete: (itemClass, itemId) => {
            if (deletors[itemClass]) {
                dispatch(deletors[itemClass](itemId));
            }
        }
    }
}

const SmartphoneEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartphoneEditorTemplate);

export default SmartphoneEditor;