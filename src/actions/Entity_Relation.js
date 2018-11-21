import uniqid from 'uniqid';

export const CREATE_ENTITY_RELATION = 'CREATE_ENTITY_RELATION';
export const DELETE_ENTITY_RELATION = 'DELETE_ENTITY_RELATION';

export function createEntityRelation(name, fromEntityId, toEntityId, cardinality) {
    return {
        type: CREATE_ENTITY_RELATION,
        relation: {
            id: uniqid(),
            name,
            fromEntityId,
            toEntityId,
            cardinality
        }
    }
}

export function deleteEntityRelation(relationId) {
    return {
        type: DELETE_ENTITY_RELATION,
        relationId
    }
}