import { faSave, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { CLOUD_OBJECT, ENTITY, FILESTORAGE, PREFERENCE } from "../../Constants";

function arrayDiff(source, idsToSubtract) {
    let hash = {};
    idsToSubtract.forEach(item => hash[item] = true);
    return source.filter(item => !hash[item.id]);
}

class SceneAdapterEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            isList: false,
            type: undefined,
            file: undefined,
            entity: undefined,
            cloudObject: undefined,
            preference: undefined
        }
        this.bind = this.bind.bind(this);
        this.reset = this.reset.bind(this);
    }
    bind() {
        this.props.onBindingCreate(
            this.state.name,
            this.props.scene.id,
            this.state.type,
            this.state.file ? this.state.file.id : undefined,
            this.state.entity ? this.state.entity.id : undefined,
            this.state.preference ? this.state.preference.id: undefined,
            this.state.cloudObject ? this.state.cloudObject.id : undefined,
            this.state.isList
        );
        this.reset();
    }
    reset() {
        this.setState({
            name: '',
            isList: false,
            type: undefined,
            file: undefined,
            entity: undefined,
            cloudObject: undefined,
            preference: undefined
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.scene.id !== this.props.scene.id) this.reset();
    }
    render() {
        const { scene, entities, cloudObjects, preferences, files, onBindingDelete } = this.props;
        const adapters = scene.adapters;
        const availableFiles = arrayDiff(
            files,
            adapters.filter(adapter => adapter.adapterClass === FILESTORAGE).map(adapter => adapter.file)
        );
        const availablePreferences = arrayDiff(
            preferences,
            adapters.filter(adapter => adapter.adapterClass === PREFERENCE).map(adapter => adapter.preference)
        );
        return (
            <Container fluid>
                <Row className="justify-content-center">
                    <h3>{this.props.scene.name}</h3>
                </Row>
                <Row>
                    <Col sm={6}>
                        <Card>
                            <Card.Header>
                                In use elements
                            </Card.Header>
                            <Card.Body>
                                {adapters.map(adapter => (
                                    <div className={`adapter-binding adapter-binding-${adapter.adapterClass} ${adapter.isList ? 'adapter-binding-list' : ''}`} key={adapter.id}>
                                        <small>
                                            {adapter.adapterClass === FILESTORAGE ? adapter.file.name : ''}
                                            {adapter.adapterClass === PREFERENCE ? adapter.preference.key : ''}
                                            {adapter.adapterClass === ENTITY ? adapter.entity.name : ''}
                                            {adapter.adapterClass === CLOUD_OBJECT ? adapter.cloudObject.name : ''}
                                        </small><br />
                                        {adapter.name}
                                        <FontAwesomeIcon icon={faTrashAlt} onClick={() => onBindingDelete(adapter.id)} className="ml-2"/>
                                    </div>
                                ))}
                            </Card.Body>
                            <Card.Footer>
                                {this.state.type &&
                                    <>
                                        <div className={`adapter-binding adapter-binding-${this.state.type} ${this.state.isList ? 'adapter-binding-list' : ''}`}>
                                            <small>
                                                {this.state.type === FILESTORAGE ? this.state.file.name : ''}
                                                {this.state.type === PREFERENCE ? this.state.preference.key : ''}
                                                {this.state.type === ENTITY ? this.state.entity.name : ''}
                                                {this.state.type === CLOUD_OBJECT ? this.state.cloudObject.name : ''}
                                            </small><br />
                                            <input placeholder="Give me a name!" type="text" value={this.state.name} onChange={event => this.setState({ name: event.target.value })} />
                                        </div>
                                        <Button variant="light" size="sm" onClick={this.bind}>
                                            <FontAwesomeIcon icon={faSave} />
                                        </Button>
                                    </>
                                }
                                {!this.state.type && 
                                    <p>Click some element on the right area to add it to the current scene!</p>
                                }
                            </Card.Footer>
                        </Card>
                    </Col>
                    <Col sm={6}>
                        <Card>
                            <Card.Header>
                                Available elements
                            </Card.Header>
                            <Card.Body>
                                {availableFiles.map(file => (
                                    <div
                                        className={`adapter-binding adapter-binding-${FILESTORAGE}`}
                                        key={file.id}
                                        onClick={() => this.setState({ type: FILESTORAGE, file, isList: false })}
                                    >
                                        {file.name}
                                    </div>
                                ))}
                                {availablePreferences.map(pref => (
                                    <div
                                        className={`adapter-binding adapter-binding-${PREFERENCE}`}
                                        key={pref.id}
                                        onClick={() => this.setState({ type: PREFERENCE, preference: pref, isList: false })}
                                    >
                                        {pref.key}
                                    </div>
                                ))}
                                {entities.map(entity => (
                                    <React.Fragment key={entity.id}>
                                        <div
                                            className={`adapter-binding adapter-binding-${ENTITY}`}
                                            onClick={() => this.setState({ type: ENTITY, entity, isList: false })}
                                        >
                                            {entity.name}
                                        </div>
                                        <div
                                            className={`adapter-binding adapter-binding-${ENTITY} adapter-binding-list`}
                                            onClick={() => this.setState({ type: ENTITY, entity, isList: true })}
                                        >
                                            {entity.name}
                                        </div>
                                    </React.Fragment>
                                ))}
                                {cloudObjects.map(obj => (
                                    <React.Fragment key={obj.id}>
                                        <div 
                                            className={`adapter-binding adapter-binding-${CLOUD_OBJECT}`}
                                            onClick={() => this.setState({ type: CLOUD_OBJECT, cloudObject: obj, isList: false})}
                                        >
                                            {obj.name}
                                        </div>
                                        <div 
                                            className={`adapter-binding adapter-binding-${CLOUD_OBJECT} adapter-binding-list`}
                                            onClick={() => this.setState({ type: CLOUD_OBJECT, cloudObject: obj, isList: true})}
                                        >
                                            {obj.name}
                                        </div>
                                    </React.Fragment>
                                ))}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default SceneAdapterEditor;