import uniqid from 'uniqid';

export const CREATE_LIST_VIEW_CELL = 'CREATE_LIST_VIEW_CELL';
export const EDIT_LIST_VIEW_CELL = 'EDIT_LIST_VIEW_CELL';
export const DELETE_LIST_VIEW_CELL = 'DELETE_LIST_VIEW_CELL';

export function createListViewCell(viewControllerId, listViewId, listCellName) {
    return {
        type: CREATE_LIST_VIEW_CELL,
        cellId: uniqid(),
        viewControllerId,
        listViewId,
        name: listCellName || ''
    }
} 

export function editListViewCell(cellId, prop, value) {
    return {
        type: EDIT_LIST_VIEW_CELL,
        cellId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteListViewCell(cellId) {
    return {
        type: DELETE_LIST_VIEW_CELL,
        cellId
    }
}