import uniqid from 'uniqid';

export const CREATE_GRID_VIEW_CELL = 'CREATE_GRID_VIEW_CELL';
export const EDIT_GRID_VIEW_CELL = 'EDIT_GRID_VIEW_CELL';
export const DELETE_GRID_VIEW_CELL = 'DELETE_GRID_VIEW_CELL';

export function createGridViewCell(viewControllerId, gridViewId, gridCellName) {
    return {
        type: CREATE_GRID_VIEW_CELL,
        cellId: uniqid(),
        viewControllerId,
        gridViewId,
        name: gridCellName || ''
    }
} 

export function editGridViewCell(cellId, prop, value) {
    return {
        type: EDIT_GRID_VIEW_CELL,
        cellId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteGridViewCell(cellId) {
    return {
        type: DELETE_GRID_VIEW_CELL,
        cellId
    }
}