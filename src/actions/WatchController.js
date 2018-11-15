import uniqid from 'uniqid';

export const CREATE_WATCH_CONTROLLER = 'CREATE_WATCH_CONTROLLER';
export const EDIT_WATCH_CONTROLLER = 'EDIT_WATCH_CONTROLLER';
export const DELETE_WATCH_CONTROLLER = 'DELETE_WATCH_CONTROLLER';

export function createWatchController() {
    return {
        type: CREATE_WATCH_CONTROLLER,
        watchControllerId: uniqid()
    }
}

export function editWatchController(watchControllerId, prop, value) {
    return {
        type: EDIT_WATCH_CONTROLLER,
        watchControllerId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteWatchController(watchControllerId) {
    return {
        type: DELETE_WATCH_CONTROLLER,
        watchControllerId
    }
}