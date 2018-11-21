import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave, faTimes, faPlus } from '@fortawesome/free-solid-svg-icons';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import { TYPE_STRING, TYPE_INT, TYPE_BOOLEAN, TYPE_FLOAT, TYPE_DOUBLE, TYPE_LONG } from '../../../Constants';
import { enablePreferences, disablePreferences } from '../../../actions/DataHandlers';
import { connect } from 'react-redux';
import { PreferenceRecordsSelector } from '../../../selectors/PreferenceRecord';
import { createPreferenceRecord, deletePreferenceRecord } from '../../../actions/PreferenceRecord';

class PreferencesEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            type: TYPE_STRING,
            key: '',
            value: 'newStringValue'
        }
        this.changeType = this.changeType.bind(this);
        this.commit = this.commit.bind(this);
        this.clear = this.clear.bind(this);
    }
    changeType(newType) {
        let defaultValues = {
            [TYPE_STRING]: 'newStringValue',
            [TYPE_BOOLEAN]: true,
            [TYPE_INT]: 0,
            [TYPE_FLOAT]: 0,
            [TYPE_DOUBLE]: 0,
            [TYPE_LONG]: 0
        };
        this.setState({
            type: newType,
            value: defaultValues[newType]
        });
    }
    commit() {
        this.props.onCreate(this.state.type, this.state.key, this.state.value);
        this.clear();
    }
    clear() {
        this.setState({
            isCreating: false,
            type: TYPE_STRING,
            key: '',
            value: ''
        });
    }
    render() {
        const { enabled, records, onEnable, onDisable, onDelete } = this.props;
        return (
            <Card className="w-100 h-100">
                <Card.Header className="section-header">
                    <div className="section-header-title">
                        {enabled && 'Default preferences enabled'}
                        {!enabled && 'Enable the default preferences in your app'}
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
                        <div className="panel table-container table-preferences-container">
                            <table className='table table-hover table-bordered'>
                                <thead>
                                    <tr className='table-header'>
                                        <th className='col-1'>#</th>
                                        <th className='col-3'>Type</th>
                                        <th className='col-3'>Key</th>
                                        <th className='col-3'>Default value</th>
                                        <th className='col-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {records.map((item, index) => (
                                        <tr className='table-row'>
                                            <td className='col-1'>{index + 1}</td>
                                            <td className='col-3'>{item.type}</td>
                                            <td className='col-3'>{item.key}</td>
                                            <td className='col-3'>{item.value}</td>
                                            <td className='col-2 row-controls'>
                                                <Button size="sm" variant="light" onClick={() => onDelete(item.id)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {this.state.isCreating &&
                                        <tr className='table-row'>
                                            <td className='col-1'>{records.length + 1}</td>
                                            <td className='col-3'>
                                                <SmartFormControl as="select" value={this.state.type} onChange={this.changeType}>
                                                    <option value={TYPE_STRING}>String</option>
                                                    <option value={TYPE_INT}>Int</option>
                                                    <option value={TYPE_LONG}>Long</option>
                                                    <option value={TYPE_BOOLEAN}>Boolean</option>
                                                    <option value={TYPE_FLOAT}>Float</option>
                                                    <option value={TYPE_DOUBLE}>Double</option>
                                                </SmartFormControl>
                                            </td>
                                            <td className='col-3'>
                                                <SmartFormControl value={this.state.key} onChange={val => this.setState({ key: val })} />
                                            </td>
                                            <td className='col-3'>
                                                {this.state.type === TYPE_BOOLEAN &&
                                                    <SmartFormControl as="select" value={this.state.value} onChange={value => this.setState({ value })}>
                                                        <option value={true}>True</option>
                                                        <option value={false}>False</option>
                                                    </SmartFormControl>
                                                }
                                                {this.state.type === TYPE_STRING &&
                                                    <SmartFormControl value={this.state.value} onChange={value => this.setState({ value })} />
                                                }
                                                {(this.state.type === TYPE_INT || this.state.type === TYPE_LONG) &&
                                                    <SmartFormControl value={this.state.value.toString()} onChange={value => this.setState({ value: parseInt(value) })} />
                                                }
                                                {(this.state.type === TYPE_FLOAT || this.state.type === TYPE_DOUBLE) &&
                                                    <SmartFormControl value={this.state.value.toString()} onChange={value => this.setState({ value: parseFloat(value) })} />
                                                }
                                            </td>
                                            <td className='col-2 row-controls'>
                                                {/^[a-zA-Z_][a-zA-Z0-9_]*$/g.test(this.state.key) &&
                                                    <>
                                                        <Button variant="light" size="sm" onClick={this.commit}>
                                                            <FontAwesomeIcon icon={faSave} />
                                                        </Button>
                                                        <Button variant="light" size="sm" onClick={this.clear}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </Button>
                                                    </>
                                                }
                                                {/^[a-zA-Z_][a-zA-Z0-9_]*$/g.test(this.state.key) === false &&
                                                    <>
                                                        <span className="text-danger">Invalid record</span>
                                                        <Button variant="danger" size="sm" onClick={this.clear}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </Button>
                                                    </>
                                                }
                                            </td>
                                        </tr>
                                    }
                                    {!this.state.isCreating &&
                                        <tr className='table-row'>
                                            <td className='col-1'></td>
                                            <td className='col-3'></td>
                                            <td className='col-3'></td>
                                            <td className='col-3'></td>
                                            <td className='col-2 row-controls'>
                                                <div className="btn-group">
                                                    <Button size="sm" variant="light" onClick={() => this.setState({ isCreating: true })}>
                                                        <FontAwesomeIcon icon={faPlus} />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </Card.Body>
                }
            </Card>
        );
    }
}

const mapStateToProps = state => {
    console.log(state);
    return {
        enabled: state.dataHandlers.preferences,
        records: PreferenceRecordsSelector(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnable: () => dispatch(enablePreferences()),
        onDisable: () => dispatch(disablePreferences()),
        onCreate: (type, key, value) => dispatch(createPreferenceRecord(type, key, value)),
        onDelete: recordId => dispatch(deletePreferenceRecord(recordId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferencesEditor);
