import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router-dom';
import { createWatchControl, deleteWatchControl, editWatchControl } from '../../../actions/WatchControl';
import { createWatchController, deleteWatchController, editWatchController } from '../../../actions/WatchController';
import { WATCHOS, WATCH_BUTTON, WATCH_CONTROLLER, WATCH_LABEL, WATCH_SLIDER, WATCH_SWITCH, WATCH_VOICE } from '../../../Constants';
import { SmartWatches } from '../../../devices/Devices';
import { WatchControllerSelector, WatchControllerSelectorAll } from '../../../selectors/WatchController';
import Canvas from './canvas/Canvas';
import Inspector from './Inspector';
import WatchControllerEditor from './Inspector/WatchControllerEditor';
import Navigator from './Navigator';


class SmartwatchEditorTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            platform: WATCHOS,
            device: SmartWatches.find(s => s.platform === WATCHOS)
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
            device: SmartWatches.find(s => s.platform === platform)
        });
    }
    render() {
        let { match, app, watchControllers, watchController, onCreate, onEdit, onDelete } = this.props;
        return (
            <>
                {watchController === null &&
                    <Redirect to={`/editor/watch/`} />
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
                                    watchControllers={watchControllers}
                                    onWatchControllerCreate={() => onCreate(WATCH_CONTROLLER)}
                                />
                            </Row>
                            {watchController &&
                                <Row>
                                    <Switch>
                                        <Route exact path={`${match.path}/:controlType/:controlId`} render={props => (
                                            <Inspector
                                                {...props}
                                                watchController={watchController}
                                                watchControllers={watchControllers}
                                                controlId={props.match.params.controlId}
                                                controlType={props.match.params.controlType}
                                                onEdit={onEdit}
                                                onDelete={onDelete}
                                            />
                                        )} />
                                        <Route render={props => (
                                            <>
                                                {watchController &&
                                                    <WatchControllerEditor
                                                        {...props}
                                                        watchController={watchController}
                                                        onEdit={(prop, value) => onEdit(WATCH_CONTROLLER, watchController.id, prop, value)}
                                                        onDelete={() => onDelete(WATCH_CONTROLLER, watchController.id)}
                                                    />
                                                }
                                            </>
                                        )} />
                                    </Switch>
                                </Row>
                            }
                        </Col>
                        <Col sm={9}>
                            {watchController &&
                                <Canvas
                                    app={app}
                                    watchController={watchController}
                                    platform={this.state.platform}
                                    device={this.state.device}
                                    onPlatformChange={this.changePlatform}
                                    onDeviceChange={this.changeDevice}
                                    onCreate={onCreate}
                                />
                            }
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    let wid = ownProps.match.params.wid;
    let watchController = false;
    if (wid) {
        watchController = WatchControllerSelector(state, wid);
    }
    return {
        watchControllers: WatchControllerSelectorAll(state),
        watchController,
        app: state.application
    };
}

const creators = {
    [WATCH_CONTROLLER]: createWatchController,
    [WATCH_BUTTON]: (controllerId) => createWatchControl(WATCH_BUTTON, controllerId),
    [WATCH_LABEL]: (controllerId) => createWatchControl(WATCH_LABEL, controllerId),
    [WATCH_SLIDER]: (controllerId) => createWatchControl(WATCH_SLIDER, controllerId),
    [WATCH_SWITCH]: (controllerId) => createWatchControl(WATCH_SWITCH, controllerId),
    [WATCH_VOICE]: (controllerId) => createWatchControl(WATCH_VOICE, controllerId),
};

const editors = {
    [WATCH_CONTROLLER]: editWatchController,
    [WATCH_BUTTON]: editWatchControl,
    [WATCH_LABEL]: editWatchControl,
    [WATCH_SLIDER]: editWatchControl,
    [WATCH_SWITCH]: editWatchControl,
    [WATCH_VOICE]: editWatchControl,
};

const deletors = {
    [WATCH_CONTROLLER]: deleteWatchController,
    [WATCH_BUTTON]: deleteWatchControl,
    [WATCH_LABEL]: deleteWatchControl,
    [WATCH_SLIDER]: deleteWatchControl,
    [WATCH_SWITCH]: deleteWatchControl,
    [WATCH_VOICE]: deleteWatchControl,
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

const SmartwatchEditor = connect(
    mapStateToProps,
    mapDispatchToProps
)(SmartwatchEditorTemplate);

export default SmartwatchEditor;