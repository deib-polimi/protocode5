import uniqid from 'uniqid';

export const CREATE_WATCH_CONTROL = 'CREATE_WATCH_CONTROL';
export const EDIT_WATCH_CONTROL = 'EDIT_WATCH_CONTROL';
export const DELETE_WATCH_CONTROL = 'DELETE_WATCH_CONTROL';

export function createWatchControl(itemClass, watchControllerId) {
    return {
        type: CREATE_WATCH_CONTROL,
        controlType: itemClass,
        controlId: uniqid(),
        watchControllerId
    }
}

export function editWatchControl(controlId, prop, value) {
    return {
        type: EDIT_WATCH_CONTROL,
        controlId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteWatchControl(controlId) {
    return {
        type: DELETE_WATCH_CONTROL,
        controlId
    }
}