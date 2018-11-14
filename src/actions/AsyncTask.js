import uniqid from 'uniqid';

export const CREATE_ASYNC_TASK = 'CREATE_ASYNC_TASK';
export const DELETE_ASYNC_TASK = 'DELETE_ASYNC_TASK';
export const EDIT_ASYNC_TASK = 'EDIT_ASYNC_TASK';

export function createAsyncTask(viewControllerId) {
    return {
        type: CREATE_ASYNC_TASK,
        viewControllerId,
        taskId: uniqid()
    }
}

export function deleteAsyncTask(taskId) {
    return {
        type: DELETE_ASYNC_TASK,
        taskId
    }
}

export function editAsyncTask(taskId, prop, value) {
    return {
        type: EDIT_ASYNC_TASK,
        taskId,
        edits: {
            [prop]: value
        }
    }
}