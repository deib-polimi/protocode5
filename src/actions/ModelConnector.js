import uniqid from 'uniqid';

export const CREATE_MODEL_CONNECTOR = 'CREATE_MODEL_CONNECTOR';
export const DELETE_MODEL_CONNECTOR = 'DELETE_MODEL_CONNECTOR';

export function createModelConnector(sceneId, viewControllerId, controlId, adapterId, keypath, controlProperty) {
    return {
        type: CREATE_MODEL_CONNECTOR,
        connector: {
            id: uniqid(),
            sceneId,
            viewControllerId,
            controlId,
            adapterId,
            keypath,
            property: controlProperty
        }
    }
}

export function deleteModelConnector(connectorId) {
    return {
        type: DELETE_MODEL_CONNECTOR,
        connectorId
    }
}