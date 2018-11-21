import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, InputGroup } from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import SmartFormControl from '../../../utils/SmartChangeEvent';
import EntityAttributeEditor from './EntityAttribute';
import EntityRelationEditor from './EntityRelation';

const EntityEditor = ({ entity, entities, onCreateAttribute, onCreateRelation, onEdit, onDelete, onDeleteAttribute, onDeleteRelation }) => {
    if (!entity) {
        return <Redirect to="/model/database" />
    }
    return (
        <div className='entity-editor'>
            <div className='entity-header'>
                <InputGroup size="sm">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Name:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <SmartFormControl value={entity.name} onChange={value => onEdit(entity.id, 'name', value)} />
                    <InputGroup.Append>
                        <Button variant="danger" size="sm" onClick={() => onDelete(entity.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </Button>
                    </InputGroup.Append>
                </InputGroup>
            </div>
            <hr />
            <div className='primary-key mb-3'>
                <InputGroup size="sm">
                    <InputGroup.Prepend>
                        <InputGroup.Text>Primary key:</InputGroup.Text>
                    </InputGroup.Prepend>
                    <SmartFormControl value={entity.primaryKey} onChange={value => onEdit(entity.id, 'primaryKey', value)} />
                </InputGroup>
            </div>
            <EntityAttributeEditor
                entity={entity}
                onCreateAttribute={onCreateAttribute}
                onDeleteAttribute={onDeleteAttribute}
            />
            <EntityRelationEditor
                entity={entity}
                entities={entities}
                onCreateRelation={onCreateRelation}
                onDeleteRelation={onDeleteRelation}
            />
        </div>
    );
}

export default EntityEditor;