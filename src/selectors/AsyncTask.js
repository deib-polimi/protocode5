import DataArchive from '../utils/DataArchive';

function findAsyncTasks(state, viewControllerId) {
    return DataArchive.Extract(state.asyncTasks, 'viewControllerId', viewControllerId);
}

export default function AsyncTasksSelector(state, viewControllerId) {
    return findAsyncTasks(state, viewControllerId);
}