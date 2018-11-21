import uniqid from 'uniqid';

export const CREATE_ENTITY_ATTRIBUTE = 'CREATE_ENTITY_ATTRIBUTE';
export const DELETE_ENTITY_ATTRIBUTE = 'DELETE_ENTITY_ATTRIBUTE';

export function createEntityAttribute(entityId, name, type) {
    return {
        type: CREATE_ENTITY_ATTRIBUTE,
        attribute: {
            id: uniqid(),
            entityId,
            name,
            type
        }
    }
}

export function deleteEntityAttribute(attributeId) {
    return {
        type: DELETE_ENTITY_ATTRIBUTE,
        attributeId
    }
}