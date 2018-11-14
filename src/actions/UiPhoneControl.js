import uniqid from 'uniqid';

export const CREATE_UI_PHONE_CONTROL = 'CREATE_UI_PHONE_CONTROL';
export const EDIT_UI_PHONE_CONTROL = 'EDIT_UI_PHONE_CONTROL';
export const DELETE_UI_PHONE_CONTROL = 'DELETE_UI_PHONE_CONTROL';

export function createUiPhoneControl(itemClass, viewController, controlChainId, controlChainPosition) {
    let out = {
        type: CREATE_UI_PHONE_CONTROL,
        uiPhoneControlType: itemClass,
        viewController,
        controlId: uniqid()
    }
    if (controlChainId !== undefined) {
        out.controlChainId = controlChainId;
        out.controlChainPosition = controlChainPosition;
    }
    return out;
}

export function editUiPhoneControl(controlId, prop, value) {
    return {
        type: EDIT_UI_PHONE_CONTROL,
        controlId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteUiPhoneControl(controlId) {
    return {
        type: DELETE_UI_PHONE_CONTROL,
        controlId
    }
}