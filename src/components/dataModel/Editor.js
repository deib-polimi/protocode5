import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { faCogs, faDatabase, faFileAlt, faCloud } from '@fortawesome/free-solid-svg-icons';
import { Switch, Route, Redirect } from 'react-router-dom';
import { Home } from './Home';
import { connect } from 'react-redux';
import '../../style/data_model_edit.scss';
import '../../style/data_handlers.scss';
import PreferenceEditor from './preferences/Editor';
import FilesEditor from './filestorage/Editor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DatabaseEditor from './database/Editor';
import CloudEditor from './cloud/Editor';

const DataModelEditor = ({ match, app }) => (
    <>
        {!app && <Redirect to="/" />}
        {app &&
            <Container fluid>
                <Row>
                    <Col sm={3} className="sidebar">
                        <Card>
                            <Card.Header className="side-title">STORAGE OPTIONS</Card.Header>
                            <Card.Body>
                                <ul className="side-menu">
                                    <Link to={`${match.url}/default_preferences`}>
                                        <li className="side-item">
                                            {'Default preferences'}
                                            <span className="side-icon">
                                                <FontAwesomeIcon icon={faCogs} />
                                            </span>
                                        </li>
                                    </Link>
                                    <Link to={`${match.url}/database`}>
                                        <li className="side-item">
                                            {'SQL Database'}
                                            <span className="side-icon">
                                                <FontAwesomeIcon icon={faDatabase} />
                                            </span>
                                        </li>
                                    </Link>
                                    <Link to={`${match.url}/files`}>
                                        <li className="side-item">
                                            {'File storage'}
                                            <span className="side-icon">
                                                <FontAwesomeIcon icon={faFileAlt} />
                                            </span>
                                        </li>
                                    </Link>
                                    <Link to={`${match.url}/cloud`}>
                                        <li className="side-item">
                                            {'Cloud Database'}
                                            <span className="side-icon">
                                                <FontAwesomeIcon icon={faCloud} />
                                            </span>
                                        </li>
                                    </Link>
                                </ul>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col sm={9}>
                        <Switch>
                            <Route path={`${match.path}/default_preferences`} component={PreferenceEditor} />
                            <Route path={`${match.path}/files`} component={FilesEditor} />
                            <Route path={`${match.path}/database`} component={DatabaseEditor} />
                            <Route path={`${match.path}/cloud`} component={CloudEditor} />
                            <Route component={Home} />
                        </Switch>
                    </Col>
                </Row>
            </Container>
        }
    </>
);

const mapStateToProps = state => {
    return {
        app: state.application
    }
}

export default connect(mapStateToProps, () => { return {}; })(DataModelEditor);