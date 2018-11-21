import { faPlus, faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button } from 'react-bootstrap';
import { TYPE_BOOLEAN, TYPE_DATE, TYPE_DOUBLE, TYPE_FLOAT, TYPE_INT, TYPE_STRING } from '../../../Constants';
import SmartFormControl from '../../../utils/SmartChangeEvent';

export default class EntityAttributeEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            name: 'newAttribute',
            type: TYPE_STRING,
        }
        this.startCreateAttribute = this.startCreateAttribute.bind(this);
        this.commitAttribute = this.commitAttribute.bind(this);
        this.clearAttribute = this.clearAttribute.bind(this);
        this.isNameValid = this.isNameValid.bind(this);
    }
    startCreateAttribute() {
        this.setState({ isCreating: true });
    }
    commitAttribute() {
        this.props.onCreateAttribute(this.props.entity.id, this.state.name, this.state.type);
        this.clearAttribute();
    }
    clearAttribute() {
        this.setState({
            isCreating: false,
            name: 'newAttribute',
            type: TYPE_STRING,
        })
    }
    isNameValid(name) {
        const entity = this.props.entity;
        return (
            /^[a-zA-Z_][a-zA-Z0-9_-]*$/g.test(name) &&
            !entity.attributes.find(attr => attr.name === name) &&
            !entity.relations.find(rel => rel.name === name)
        );
    }
    render() {
        const { entity, onDeleteAttribute } = this.props;
        return (
            <div className='entity-property'>
                <div className='entity-property-title'>Attributes:</div>
                <div className='panel table-container table-entity-properties'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr className='table-header'>
                                <th className='col-1'>#</th>
                                <th className='col-4'>Name</th>
                                <th className='col-4'>Type</th>
                                <th className='col-3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {entity.attributes.map((item, i) => (
                                <tr className='table-row' key={item.id}>
                                    <td className='col-1'>{i + 1}</td>
                                    <td className='col-4'>{item.name}</td>
                                    <td className='col-4'>{item.type}</td>
                                    <td className='col-3' id='row-controls'>
                                        <Button size="sm" variant="light" onClick={() => onDeleteAttribute(item.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {this.state.isCreating &&
                                <tr className='table-row'>
                                    <td className='col-1'>{entity.attributes.length + 1}</td>
                                    <td className='col-4'>
                                        <SmartFormControl value={this.state.name} onChange={value => this.setState({ name: value })} />
                                    </td>
                                    <td className='col-4'>
                                        <SmartFormControl as="select" value={this.state.type} onChange={value => this.setState({ type: value  })}>
                                            <option value={TYPE_STRING}>String</option>
                                            <option value={TYPE_INT}>Integer</option>
                                            <option value={TYPE_BOOLEAN}>Boolean</option>
                                            <option value={TYPE_DATE}>Date</option>
                                            <option value={TYPE_FLOAT}>Float</option>
                                            <option value={TYPE_DOUBLE}>Double</option>
                                        </SmartFormControl>
                                    </td>
                                    <td className='col-3 row-controls'>
                                        {this.isNameValid(this.state.name) &&
                                            <>
                                                <Button variant="light" size="sm" onClick={this.commitAttribute}>
                                                    <FontAwesomeIcon icon={faSave} />
                                                </Button>
                                                <Button variant="light" size="sm" onClick={this.clearAttribute}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </Button>
                                            </>
                                        }
                                        {!this.isNameValid(this.state.name) &&
                                            <>
                                                <span className="text-danger">Invalid attribute</span>
                                                <Button variant="danger" size="sm" onClick={this.clearAttribute}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </Button>
                                            </>
                                        }
                                    </td>
                                </tr>
                            }
                            {!this.state.isCreating &&
                                <tr>
                                    <td className='col-1'></td>
                                    <td className='col-4'></td>
                                    <td className='col-4'></td>
                                    <td className='col-3 row-controls'>
                                        <Button variant="light" onClick={this.startCreateAttribute}>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </Button>
                                    </td>
                                </tr>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}