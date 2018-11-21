import uniqid from 'uniqid';

export const CREATE_ENTITY = 'CREATE_ENTITY';
export const DELETE_ENTITY = 'DELETE_ENTITY';
export const EDIT_ENTITY = 'EDIT_ENTITY';

export function createEntity(name) {
    return {
        type: CREATE_ENTITY,
        entity: {
            id: uniqid(),
            name,
            primaryKey: 'primaryKeyName'
        }
    }
}

export function editEntity(entityId, prop, value) {
    return {
        type: EDIT_ENTITY,
        entityId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteEntity(entityId) {
    return {
        type: DELETE_ENTITY,
        entityId
    }
}