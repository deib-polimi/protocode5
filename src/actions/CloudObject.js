import uniqid from 'uniqid';

export const CREATE_CLOUD_OBJECT = 'CREATE_CLOUD_OBJECT';
export const EDIT_CLOUD_OBJECT = 'EDIT_CLOUD_OBJECT';
export const DELETE_CLOUD_OBJECT = 'DELETE_CLOUD_OBJECT';

export function createCloudObject(name) {
    return {
        type: CREATE_CLOUD_OBJECT,
        object: {
            id: uniqid(),
            name
        }
    }
}

export function editCloudObject(objectId, prop, value) {
    return {
        type: EDIT_CLOUD_OBJECT,
        objectId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteCloudObject(objectId) {
    return {
        type: DELETE_CLOUD_OBJECT,
        objectId
    }
}