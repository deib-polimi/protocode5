import React from 'react';
import { TYPE_STRING, TYPE_REF_LIST, TYPE_INT, TYPE_FLOAT, TYPE_DOUBLE, TYPE_BOOLEAN, TYPE_REF } from '../../../Constants';
import { Redirect } from 'react-router-dom';
import { InputGroup, Button } from 'react-bootstrap';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const InitialState = {
    isCreating: false,
    name: 'newAttribute',
    type: TYPE_STRING,
    objectArg: undefined
}

export default class ObjectEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ...InitialState
        }
        this.startCreating = this.startCreating.bind(this);
        this.isValid = this.isValid.bind(this);
        this.commit = this.commit.bind(this);
        this.clear = this.clear.bind(this);
    }
    startCreating() {
        this.setState({
            isCreating: true
        })
    }
    isValid() {
        return /^[a-zA-Z_][a-zA-Z0-9_-]*$/g.test(this.state.name) &&
            this.state.type &&
            ((this.state.type !== TYPE_REF && this.state.type !== TYPE_REF_LIST) || this.state.objectArg !== undefined);
    }
    commit() {
        if (this.isValid()) {
            this.props.onCreateAttribute(this.props.object.id, this.state.name, this.state.type, this.state.objectArg);
            this.clear();
        }
    }
    clear() {
        this.setState({ ...InitialState });
    }
    render() {
        const { object, objects, onDelete, onDeleteAttribute, onEdit } = this.props;
        if (!object) {
            return <Redirect to="/model/cloud" />
        }
        return (
            <div class='entity-editor'>
                <div class='entity-header'>
                    <InputGroup size="sm">
                        <InputGroup.Prepend>
                            <InputGroup.Text>Name:</InputGroup.Text>
                        </InputGroup.Prepend>
                        <SmartFormControl value={object.name} onChange={value => onEdit(object.id, 'name', value)} />
                        <InputGroup.Append>
                            <Button variant="danger" onClick={() => onDelete(object.id)}>
                                <FontAwesomeIcon icon={faTrashAlt} />
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
                </div>
                <hr />
                <div class='entity-property'>
                    <div class='entity-property-title'>Attributes</div>
                    <div class='panel table-container table-entity-properties'>
                        <table class='table table-bordered table-hover'>
                            <thead>
                                <tr class='table-header'>
                                    <th class='col-1'>#</th>
                                    <th class='col-3'>Name</th>
                                    <th class='col-2'>Type</th>
                                    <th class='col-3'>Object</th>
                                    <th class='col-3'></th>
                                </tr>
                            </thead>
                            <tbody>
                                {object.attributes.map((attr, i) => (
                                    <tr class='table-row' key={attr.id}>
                                        <td class='col-1'>{i + 1}</td>
                                        <td class='col-3'>{attr.name}</td>
                                        <td class='col-2'>{attr.type}</td>
                                        <td class='col-3'>{attr.object && objects.find(obj => obj.id === attr.object).name}</td>
                                        <td class='col-3' id='row-controls'>
                                            <Button variant="light" onClick={() => onDeleteAttribute(attr.id)}>
                                                <FontAwesomeIcon icon={faTrashAlt} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                {this.state.isCreating &&
                                    <tr class='table-row'>
                                        <td class='col-1'>{object.attributes.length + 1}</td>
                                        <td class='col-3'>
                                            <SmartFormControl value={this.state.name} onChange={value => this.setState({ name: value })} />
                                        </td>
                                        <td class='col-2'>
                                            <SmartFormControl as="select" value={this.state.type} onChange={value => this.setState({ type: value, objectArg: undefined })}>
                                                <option value={TYPE_STRING}>String</option>
                                                <option value={TYPE_INT}>Integer</option>
                                                <option value={TYPE_FLOAT}>Float</option>
                                                <option value={TYPE_DOUBLE}>Double</option>
                                                <option value={TYPE_BOOLEAN}>Boolean</option>
                                                <option value={TYPE_REF}>Object</option>
                                                <option value={TYPE_REF_LIST}>Object list</option>
                                            </SmartFormControl>
                                        </td>
                                        <td class='col-3'>
                                            {(this.state.type === TYPE_REF || this.state.type === TYPE_REF_LIST) &&
                                                <SmartFormControl as="select" value={this.state.objectArg || '*undefined*'} onChange={value => this.setState({ objectArg: value })}>
                                                    <option value='*undefined*' disabled>Select an object</option>
                                                    {objects.map(object => (
                                                        <option key={object.id} value={object.id}>{object.name}</option>
                                                    ))}
                                                </SmartFormControl>
                                            }
                                        </td>
                                        <td class='col-3 row-controls'>
                                            {this.isValid() &&
                                                <>
                                                    <Button variant="light" onClick={this.commit}>
                                                        <FontAwesomeIcon icon={faSave} />
                                                    </Button>
                                                    <Button variant="light" onClick={this.clear}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </Button>
                                                </>
                                            }
                                            {!this.isValid() &&
                                                <>
                                                    <span className="text-danger">Invalid attribute</span>
                                                    <Button variant="danger" size="sm" onClick={this.clear}>
                                                        <FontAwesomeIcon icon={faTimes} />
                                                    </Button>
                                                </>
                                            }
                                        </td>
                                    </tr>
                                }
                                {!this.state.isCreating &&
                                    <tr>
                                        <td class='col-1'></td>
                                        <td class='col-3'></td>
                                        <td class='col-2'></td>
                                        <td class='col-3'></td>
                                        <td class='col-3 row-controls'>
                                            <Button variant="light" size="sm" onClick={this.startCreating}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}