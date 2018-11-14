import uniqid from 'uniqid';

export const CREATE_PROGRESS_DIALOG = 'CREATE_PROGRESS_DIALOG';
export const DELETE_PROGRESS_DIALOG = 'DELETE_PROGRESS_DIALOG';
export const EDIT_PROGRESS_DIALOG = 'EDIT_PROGRESS_DIALOG';

export function createProgressDialog(viewControllerId) {
    return {
        type: CREATE_PROGRESS_DIALOG,
        viewControllerId,
        dialogId: uniqid()
    }
}

export function deleteProgressDialog(dialogId) {
    return {
        type: DELETE_PROGRESS_DIALOG,
        dialogId
    }
}

export function editProgressDialog(dialogId, prop, value) {
    return {
        type: EDIT_PROGRESS_DIALOG,
        dialogId,
        edits: {
            [prop]: value
        }
    }
}
