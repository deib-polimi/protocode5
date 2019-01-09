import uniqid from 'uniqid';

export const CREATE_ADAPTER_BINDING = 'CREATE_ADAPTER_BINDING';
export const DELETE_ADAPTER_BINDING = 'DELETE_ADAPTER_BINDING';

export function createAdapterBinding(name, scene, adapterClass, file, entity, preference, cloudObject, isList) {
    return {
        type: CREATE_ADAPTER_BINDING,
        scene,
        adapterClass,
        file, 
        entity,
        preference,
        cloudObject,
        isList: isList || false,
        name,
        adapterId: uniqid()
    }
}

export function deleteAdapterBinding(adapterId) {
    return {
        type: DELETE_ADAPTER_BINDING,
        adapterId
    }
}