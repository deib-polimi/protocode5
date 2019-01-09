import React from 'react';
import { FileStorageRecordSelectorAll } from '../../../selectors/FileStorageRecord';
import { enableFileStorage, disableFileStorage } from '../../../actions/DataHandlers';
import { createFileStorageRecord, deleteFileStorageRecord } from '../../../actions/FileStorageRecord';
import { EXTENSION_TEXT, EXTENSION_IMAGE, EXTENSION_OTHER } from '../../../Constants'; import { Card, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faSave, faTimes, faPlus, faCheck } from '@fortawesome/free-solid-svg-icons';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import { connect } from 'react-redux';

class FileStorageEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isCreating: false,
            filename: '',
            extension: EXTENSION_TEXT,
            isTemp: false
        }
        this.startCreating = this.startCreating.bind(this);
        this.commit = this.commit.bind(this);
        this.clear = this.clear.bind(this);
    }
    startCreating() {
        this.setState({
            isCreating: true
        })
    }
    clear() {
        this.setState({
            isCreating: false,
            filename: '',
            extension: EXTENSION_TEXT,
            isTemp: false
        });
    }
    commit() {
        this.props.onCreate(this.state.filename, this.state.extension, this.state.isTemp);
        this.clear();
    }
    render() {
        const { enabled, files, onEnable, onDisable, onDelete } = this.props;
        return (
            <Card className="w-100 h-100">
                <Card.Header className="section-header">
                    <div className="section-header-title">
                        {enabled && 'Internal storage enabled'}
                        {!enabled && 'Enable Internal storage in your app'}
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
                                        <th className='col-3'>File name</th>
                                        <th className='col-3'>Extension</th>
                                        <th className='col-3'>tempFile</th>
                                        <th className='col-2'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {files.map((item, index) => (
                                        <tr className='table-row'>
                                            <td className='col-1'>{index + 1}</td>
                                            <td className='col-3'>{item.name}</td>
                                            <td className='col-3'>{item.extension}</td>
                                            <td className='col-3'>
                                                {item.isTemp && <FontAwesomeIcon icon={faCheck} />}
                                                {!item.isTemp && <FontAwesomeIcon icon={faTimes} />}
                                            </td>
                                            <td className='col-2 row-controls'>
                                                <Button size="sm" variant="light" onClick={() => onDelete(item.id)}>
                                                    <FontAwesomeIcon icon={faTrashAlt} />
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    {this.state.isCreating &&
                                        <tr className='table-row'>
                                            <td className='col-1'>{files.length + 1}</td>
                                            <td className='col-3'>
                                                <SmartFormControl value={this.state.filename} onChange={val => this.setState({ filename: val })} />

                                            </td>
                                            <td className='col-3'>
                                                <SmartFormControl as="select" value={this.state.extension} onChange={val => this.setState({ extension: val })}>
                                                    <option value={EXTENSION_TEXT}>Text</option>
                                                    <option value={EXTENSION_IMAGE}>Image</option>
                                                    <option value={EXTENSION_OTHER}>Other</option>
                                                </SmartFormControl>
                                            </td>
                                            <td className='col-3'>
                                                <SmartFormControl as="select" value={this.state.isTemp} onChange={value => this.setState({ isTemp: value })}>
                                                    <option value={true}>True</option>
                                                    <option value={false}>False</option>
                                                </SmartFormControl>
                                            </td>
                                            <td className='col-2 row-controls'>
                                                {/^[a-zA-Z_][a-zA-Z0-9_-]*$/g.test(this.state.filename) &&
                                                    <>
                                                        <Button variant="light" size="sm" onClick={this.commit}>
                                                            <FontAwesomeIcon icon={faSave} />
                                                        </Button>
                                                        <Button variant="light" size="sm" onClick={this.clear}>
                                                            <FontAwesomeIcon icon={faTimes} />
                                                        </Button>
                                                    </>
                                                }
                                                {/^[a-zA-Z_][a-zA-Z0-9_]*$/g.test(this.state.filename) === false &&
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
                                    <tr className='table-row'>
                                        <td className='col-1'></td>
                                        <td className='col-3'></td>
                                        <td className='col-3'></td>
                                        <td className='col-3'></td>
                                        <td className='col-2 row-controls'>
                                            <div className="btn-group">
                                                <Button size="sm" variant="light" onClick={this.startCreating}>
                                                    <FontAwesomeIcon icon={faPlus} />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
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
    return {
        enabled: state.dataHandlers.files,
        files: FileStorageRecordSelectorAll(state)
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onEnable: () => dispatch(enableFileStorage()),
        onDisable: () => dispatch(disableFileStorage()),
        onCreate: (filename, extension, isTemp) => dispatch(createFileStorageRecord(filename, extension, isTemp)),
        onDelete: recordId => dispatch(deleteFileStorageRecord(recordId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FileStorageEditor);