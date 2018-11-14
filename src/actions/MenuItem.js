import uniqid from 'uniqid';

export const CREATE_MENU_ITEM = 'CREATE_MENU_ITEM';
export const EDIT_MENU_ITEM = 'EDIT_MENU_ITEM';
export const DELETE_MENU_ITEM = 'DELETE_MENU_ITEM';

export function createMenuItem(title) {
    return {
        type: CREATE_MENU_ITEM,
        menuItemId: uniqid(),
        title
    }
}

export function editMenuItem(menuItemId, prop, value) {
    return {
        type: EDIT_MENU_ITEM,
        menuItemId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteMenuItem(menuItemId) {
    return {
        type: DELETE_MENU_ITEM,
        menuItemId
    }
}