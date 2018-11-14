import uniqid from 'uniqid';

export const CREATE_ALERT_DIALOG = 'CREATE_ALERT_DIALOG';
export const DELETE_ALERT_DIALOG = 'DELETE_ALERT_DIALOG';
export const EDIT_ALERT_DIALOG = 'EDIT_ALERT_DIALOG';

export function createAlertDialog(viewControllerId) {
    return {
        type: CREATE_ALERT_DIALOG,
        viewControllerId,
        dialogId: uniqid()
    }
}

export function deleteAlertDialog(dialogId) {
    return {
        type: DELETE_ALERT_DIALOG,
        dialogId
    };
}

export function editAlertDialog(dialogId, prop, value) {
    return {
        type: EDIT_ALERT_DIALOG,
        dialogId,
        edits: {
            [prop]: value
        }
    }
}