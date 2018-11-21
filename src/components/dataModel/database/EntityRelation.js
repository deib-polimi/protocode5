import { faPlus, faSave, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Button } from 'react-bootstrap';
import { CARDINALITY_1_1, CARDINALITY_1_N, CARDINALITY_N_1 } from '../../../Constants';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default class EntityRelationEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            name: 'newRelation',
            to: undefined,
            type: CARDINALITY_1_N
        }
        this.startCreateRelation = this.startCreateRelation.bind(this);
        this.commitRelation = this.commitRelation.bind(this);
        this.clearRelation = this.clearRelation.bind(this);
        this.isRelationValid = this.isRelationValid.bind(this);
    }
    startCreateRelation() {
        this.setState({ isCreating: true });
    }
    commitRelation() {
        this.props.onCreateRelation(this.state.name, this.props.entity.id, this.state.to, this.state.type);
        this.clearRelation();
    }
    clearRelation() {
        this.setState({
            isCreating: false,
            name: 'newRelation',
            to: undefined,
            type: CARDINALITY_1_N
        })
    }
    isRelationValid() {
        const entity = this.props.entity;
        const name = this.state.name;
        const to = this.state.to;
        return (
            /^[a-zA-Z_][a-zA-Z0-9_-]*$/g.test(name) &&
            !entity.attributes.find(attr => attr.name === name) &&
            !entity.relations.find(rel => rel.name === name) &&
            to !== undefined
        );
    }
    render() {
        const { entity, entities, onDeleteRelation } = this.props;
        return (
            <div className='entity-property'>
                <div className='entity-property-title'>Relationships:</div>
                <div className='panel table-container table-entity-properties'>
                    <table className='table table-bordered table-hover'>
                        <thead>
                            <tr className='table-header'>
                                <th className='col-1'>#</th>
                                <th className='col-3'>Name</th>
                                <th className='col-3'>Destination</th>
                                <th className='col-2'>Type</th>
                                <th className='col-3'></th>
                            </tr>
                        </thead>
                        <tbody>
                            {entity.relations.map((item, i) => (
                                <tr className='table-row' key={item.id}>
                                    <td className='col-1'>{i + 1}</td>
                                    <td className='col-3'>{item.name}</td>
                                    <td className='col-3'>{entities.find(e => e.id === item.toEntityId).name}</td>
                                    <td className='col-2'>{item.cardinality}</td>
                                    <td className='col-3 row-controls'>
                                        <Button variant="light" size="sm" onClick={() => onDeleteRelation(item.id)}>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {this.state.isCreating &&
                                <tr className='table-row'>
                                    <td className='col-1'>{entity.relations.length + 1}</td>
                                    <td className='col-3'>
                                        <SmartFormControl value={this.state.name} onChange={value => this.setState({ name: value })} />
                                    </td>
                                    <td className='col-3'>
                                        <SmartFormControl as="select" value={this.state.to || '*undefined*'} onChange={value => this.setState({ to: value })}>
                                            <option value="*undefined*" disabled>Select target</option>
                                            {entities.map(entity => (
                                                <option key={entity.id} value={entity.id}>{entity.name}</option>
                                            ))}
                                        </SmartFormControl>
                                    </td>
                                    <td className='col-2'>
                                        <SmartFormControl as="select" value={this.state.type} onChange={value => this.setState({ type: value })} >
                                            <option value={CARDINALITY_1_N}>1:N</option>
                                            <option value={CARDINALITY_1_1}>1:1</option>
                                            <option value={CARDINALITY_N_1}>N:1</option>
                                        </SmartFormControl>
                                    </td>
                                    <td className='col-3 row-controls'>
                                        {this.isRelationValid() &&
                                            <>
                                                <Button variant="light" size="sm" onClick={this.commitRelation}>
                                                    <FontAwesomeIcon icon={faSave} />
                                                </Button>
                                                <Button variant="light" size="sm" onClick={this.clearRelation}>
                                                    <FontAwesomeIcon icon={faTimes} />
                                                </Button>
                                            </>
                                        }
                                        {!this.isRelationValid() &&
                                            <>
                                                <span className="text-danger">Invalid relation</span>
                                                <Button variant="danger" size="sm" onClick={this.clearRelation}>
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
                                    <td className='col-3'></td>
                                    <td className='col-3'></td>
                                    <td className='col-2'></td>
                                    <td className='col-3 row-controls'>
                                        <Button variant="light" size="sm" onClick={this.startCreateRelation}>
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