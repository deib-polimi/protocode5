import { faPlus, faSave, faTable, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Container, Row, InputGroup } from 'react-bootstrap';
import { Route, Link } from 'react-router-dom';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import EntityEditor from './EntityEditor';
import { EntitySelectorAll } from '../../../selectors/Entity';
import { connect } from 'react-redux';
import { enableDatabase, disableDatabase } from '../../../actions/DataHandlers';
import { createEntity, editEntity, deleteEntity } from '../../../actions/Entity';
import { createEntityAttribute, deleteEntityAttribute } from '../../../actions/Entity_Attribute';
import { createEntityRelation, deleteEntityRelation } from '../../../actions/Entity_Relation';

class DatabaseEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            name: 'newEntity'
        }
        this.startCreateEntity = this.startCreateEntity.bind(this);
        this.commitEntity = this.commitEntity.bind(this);
        this.clearEntity = this.clearEntity.bind(this);
    }
    startCreateEntity() {
        this.setState({isCreating: true });
    }
    commitEntity() {
        this.props.onCreateEntity(this.state.name);
        this.clearEntity();
    }
    clearEntity() {
        this.setState({
            isCreating: false,
            name: 'newEntity'
        })
    }
    render() {
        const { enabled, onEnable, onDisable, entities, match } = this.props;
        return (
            <Card className="w-100 h-100">
                <Card.Header className="section-header">
                    <div className="section-header-title">
                        {enabled && 'SQLite DB enabled'}
                        {!enabled && 'Enable a SQLite DB in your app'}
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
                                        <div className='items-title'>Entities</div>
                                        <hr />
                                        <ul className="items-list">
                                            {entities.map(entity => (
                                                <Link to={`${match.url}/entity/${entity.id}`}>
                                                    <li className="items-list-item">
                                                        <FontAwesomeIcon icon={faTable} /> {entity.name}
                                                    </li>
                                                </Link>
                                            ))}
                                            {this.state.isCreating &&
                                                <li className="items-list-edit">
                                                    <InputGroup size="sm">
                                                        <SmartFormControl value={this.state.name} onChange={val => this.setState({  name: val  })} />
                                                        <InputGroup.Append>
                                                            <Button variant="light" onClick={this.commitEntity}>
                                                                <FontAwesomeIcon icon={faSave} />
                                                            </Button>
                                                            <Button variant="light" onClick={this.clearEntity}>
                                                                <FontAwesomeIcon icon={faTimes} />
                                                            </Button>
                                                        </InputGroup.Append>
                                                    </InputGroup>
                                                </li>
                                            }
                                        </ul>
                                        {!this.state.isCreating &&
                                            <div className="panel-footer panel-buttons">
                                                <Button variant="light" onClick={this.startCreateEntity}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </div>
                                        }
                                    </div>
                                </Col>
                                <Col sm={9}>
                                    <Route path={`${match.path}/entity/:entityId`} render={({ match }) => (
                                        <EntityEditor
                                            match={match}
                                            entity={entities.find(e => e.id === match.params.entityId)}
                                            entities={entities}
                                            onCreateAttribute={this.props.onCreateAttribute}
                                            onCreateRelation={this.props.onCreateRelation}
                                            onEdit={this.props.onEdit}
                                            onDelete={this.props.onDeleteEntity}
                                            onDeleteAttribute={this.props.onDeleteAttribute}
                                            onDeleteRelation={this.props.onDeleteRelation}
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
        enabled: state.dataHandlers.database,
        entities: EntitySelectorAll(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnable: () => dispatch(enableDatabase()),
        onDisable: () => dispatch(disableDatabase()),
        onCreateEntity: name => dispatch(createEntity(name)),
        onEdit: (id, prop, value) => dispatch(editEntity(id, prop, value)),
        onDeleteEntity: id => dispatch(deleteEntity(id)),
        onCreateAttribute: (entityId, name, type) => dispatch(createEntityAttribute(entityId, name, type)),
        onDeleteAttribute: attrId => dispatch(deleteEntityAttribute(attrId)),
        onCreateRelation: (name, from, to, type) => dispatch(createEntityRelation(name, from, to, type)),
        onDeleteRelation: relId => dispatch(deleteEntityRelation(relId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DatabaseEditor);