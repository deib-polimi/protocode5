import { faDotCircle, faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button, Card, Col, Container, Row, InputGroup } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import { createCloudObject, deleteCloudObject, editCloudObject } from '../../../actions/CloudObject';
import { createCloudObjectAttribute, deleteCloudObjectAttribute } from '../../../actions/CloudObjectAttribute';
import { disableCloudDatabase, enableCloudDatabase } from '../../../actions/DataHandlers';
import { CloudObjectSelectorAll } from '../../../selectors/CloudObject';
import ObjectEditor from './ObjectEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SmartFormControl from '../../../utils/SmartChangeEvent';

const InitialState = {
    isCreating: false,
    name: 'newObject'
};

class CloudDatabaseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = { ...InitialState }
        this.startCreating = this.startCreating.bind(this);
        this.commit = this.commit.bind(this);
        this.clear = this.clear.bind(this);
        this.isValid = this.isValid.bind(this);
    }
    startCreating() {
        this.setState({
            isCreating: true
        });
    }
    isValid() {
        return /^[a-zA-Z_][a-zA-Z0-9_-]*$/g.test(this.state.name) && !this.props.objects.find(obj => obj.name === this.state.name);
    }
    commit() {
        if (this.isValid()) {
            this.props.onCreateObject(this.state.name);
            this.clear();
        }
    }
    clear() {
        this.setState({ ...InitialState });
    }
    render() {
        const { enabled, objects, onEnable, onDisable, onEditObject, onDeleteObject, onCreateAttribute, onDeleteAttribute, match } = this.props;
        return (
            <Card className="w-100 h-100">
            <Card.Header className="section-header">
                <div className="section-header-title">
                    {enabled && 'Cloud DB enabled'}
                    {!enabled && 'Enable a Cloud DB in your app'}
                </div>
                <div className="switch-button">
                    {enabled &&
                        <Button size="sm" variant="danger" onClick={onDisable}>Disable</Button>
                    }
                    {!enabled &&
                        <Button size="sm" variant="success" onClick={onEnable}>Enable</Button>
                    }
                </div>
            </Card.Header>
            {enabled &&
                <Card.Body>
                    <Container fluid>
                        <Row>
                            <Col sm={3} className="items-sidebar">
                                <div className="items-panel">
                                    <div className='items-title'>Objects</div>
                                    <hr />
                                    <ul className="items-list">
                                        {objects.map(object => (
                                            <Link to={`${match.url}/object/${object.id}`} key={object.id}>
                                                <li className="items-list-item">
                                                    <FontAwesomeIcon icon={faDotCircle} /> {object.name}
                                                </li>
                                            </Link>
                                        ))}
                                        {this.state.isCreating &&
                                            <li className="items-list-edit">
                                                <InputGroup size="sm">
                                                    <SmartFormControl value={this.state.name} onChange={val => this.setState({  name: val  })} />
                                                    <InputGroup.Append>
                                                        {this.isValid() && 
                                                            <Button variant="light" onClick={this.commit}>
                                                                <FontAwesomeIcon icon={faSave} />
                                                            </Button>
                                                        }
                                                        <Button variant={this.isValid() ? 'light' : 'danger'} onClick={this.clear}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </Button>
                                                    </InputGroup.Append>
                                                </InputGroup>
                                            </li>
                                        }
                                    </ul>
                                    {!this.state.isCreating &&
                                        <div className="panel-footer panel-buttons">
                                            <Button variant="light" onClick={this.startCreating}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </div>
                                    }
                                </div>
                            </Col>
                            <Col sm={9}>
                                <Route path={`${match.path}/object/:objectId`} render={({ match }) => (
                                    <ObjectEditor
                                        match={match}
                                        object={objects.find(obj => obj.id === match.params.objectId)}
                                        objects={objects}
                                        onCreateAttribute={onCreateAttribute}
                                        onEdit={onEditObject}
                                        onDelete={onDeleteObject}
                                        onDeleteAttribute={onDeleteAttribute}
                                    />
                                )}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            }
        </Card>
        );
    }
}

const mapStateToProps = state => {
    return {
        enabled: state.dataHandlers.cloud,
        objects: CloudObjectSelectorAll(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnable: () => dispatch(enableCloudDatabase()),
        onDisable: () => dispatch(disableCloudDatabase()),
        onCreateObject: name => dispatch(createCloudObject(name)),
        onEditObject: (id, prop, value) => dispatch(editCloudObject(id, prop, value)),
        onDeleteObject: id => dispatch(deleteCloudObject(id)),
        onCreateAttribute: (objectId, name, type, objectArg) => dispatch(createCloudObjectAttribute(objectId, name, type, objectArg)),
        onDeleteAttribute: attributeId => dispatch(deleteCloudObjectAttribute(attributeId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloudDatabaseEditor);