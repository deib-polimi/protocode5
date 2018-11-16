import uniqid from 'uniqid';

export const CREATE_WATCH_CLICK_LISTENER = 'CREATE_WATCH_CLICK_LISTENER';
export const EDIT_WATCH_CLICK_LISTENER = 'EDIT_WATCH_CLICK_LISTENER';
export const DELETE_WATCH_CLICK_LISTENER = 'DELETE_WATCH_CLICK_LISTENER';

export function createWatchClickListener(controlId, watchControllerId) {
    return {
        type: CREATE_WATCH_CLICK_LISTENER,
        listenerId: uniqid(),
        controlId,
        watchControllerId
    }
}

export function editWatchClickListener(listenerId, prop, value) {
    return {
        type: EDIT_WATCH_CLICK_LISTENER,
        listenerId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteWatchClickListener(listenerId) {
    return {
        type: DELETE_WATCH_CLICK_LISTENER,
        listenerId
    }
}