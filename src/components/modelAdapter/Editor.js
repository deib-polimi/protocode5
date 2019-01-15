import React from 'react';
import { connect } from 'react-redux';
import { SceneAll } from '../../selectors/Scene';
import { FileStorageRecordSelectorAll } from '../../selectors/FileStorageRecord';
import { EntitySelectorAll } from '../../selectors/Entity';
import { CloudObjectSelectorAll } from '../../selectors/CloudObject';
import { createAdapterBinding, deleteAdapterBinding } from '../../actions/AdapterBinding';
import SceneAdapterEditor from './Scene';
import AdapterEditorHome from './Home';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Route, Switch, Link, Redirect } from 'react-router-dom';
import { PreferenceRecordsSelector } from '../../selectors/PreferenceRecord';
import '../../style/adapter.scss';

const _AdapterEditor = ({ app, scenes, files, entities, preferences, cloudObjects, match, bind, unbind }) => (
    <>
        {!app && <Redirect to="/" />}
        {app &&
            <Container fluid>
                <Row>
                    <Col sm={3} className="sidebar">
                        <Card>
                            <Card.Header className="side-title">SCENES</Card.Header>
                            <Card.Body>
                                <ul className="side-menu">
                                    {scenes.map(scene => (
                                        <Link to={`${match.url}/${scene.id}`} key={scene.id}>
                                            <li className="side-item">
                                                {scene.name}
                                                <span className="side-icon">
                                                    <FontAwesomeIcon icon={faMobileAlt} />
                                                </span>
                                            </li>
                                        </Link>
                                    ))}
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={9}>
                        <Switch>
                            <Route path={`${match.path}/:sceneId`} render={({match}) => (
                                <SceneAdapterEditor
                                    scene={scenes.find(scene => scene.id === match.params.sceneId)}
                                    files={files}
                                    entities={entities}
                                    preferences={preferences}
                                    cloudObjects={cloudObjects}
                                    onBindingCreate={bind}
                                    onBindingDelete={unbind}
                                />
                            )} />
                            <Route component={AdapterEditorHome} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        }
    </>
);

const mapStateToProps = state => {
    return {
        app: state.application,
        scenes: SceneAll(state),
        files: FileStorageRecordSelectorAll(state),
        entities: EntitySelectorAll(state),
        preferences: PreferenceRecordsSelector(state),
        cloudObjects: CloudObjectSelectorAll(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        bind: (name, scene, adapterClass, fileName, entityName, preferenceName, cloudObjectName, isList, cloudRefPath) => {
            dispatch(createAdapterBinding(name, scene, adapterClass, fileName, entityName, preferenceName, cloudObjectName, isList, cloudRefPath))
        },
        unbind: id => dispatch(deleteAdapterBinding(id))
    }
}

const AdapterEditor = connect(mapStateToProps, mapDispatchToProps)(_AdapterEditor);

export default AdapterEditor;