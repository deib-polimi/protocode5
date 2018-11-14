import uniqid from 'uniqid';

export const CREATE_VIEW_CONTROLLER = 'CREATE_VIEW_CONTROLLER';
export const EDIT_VIEW_CONTROLLER = 'EDIT_VIEW_CONTROLLER';
export const DELETE_VIEW_CONTROLLER = 'DELETE_VIEW_CONTROLLER';

export function createViewController() {
    return {
        type: CREATE_VIEW_CONTROLLER,
        vcId: uniqid(),
    }
};

export function editViewController(vcId, prop, value) {
    return {
        type: EDIT_VIEW_CONTROLLER,
        vcId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteViewController(vcId) {
    return {
        type: DELETE_VIEW_CONTROLLER,
        vcId
    }
}
