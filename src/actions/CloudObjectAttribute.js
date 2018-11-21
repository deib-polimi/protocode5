import uniqid from 'uniqid';

export const CREATE_CLOUD_OBJECT_ATTRIBUTE = 'CREATE_CLOUD_OBJECT_ATTRIBUTE';
export const DELETE_CLOUD_OBJECT_ATTRIBUTE = 'DELETE_CLOUD_OBJECT_ATTRIBUTE';

export function createCloudObjectAttribute(objectId, name, type, objectType) {
    return {
        type: CREATE_CLOUD_OBJECT_ATTRIBUTE,
        attribute: {
            id: uniqid(),
            objectId,
            name,
            type, 
            object: objectType
        }
    }
}

export function deleteCloudObjectAttribute(attributeId) {
    return {
        type: DELETE_CLOUD_OBJECT_ATTRIBUTE,
        attributeId
    }
}