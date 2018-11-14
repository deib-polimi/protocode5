import { CREATE_ASYNC_TASK, DELETE_ASYNC_TASK, EDIT_ASYNC_TASK } from "../actions/AsyncTask";
import DataArchive from "../utils/DataArchive";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";

const InitialState = DataArchive.Create('id', ['viewControllerId']);

export default function AsyncTaskReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_ASYNC_TASK:
            return DataArchive.Insert(state, {
                id: action.taskId,
                name: `${action.taskId}AsyncTask`,
                viewControllerId: action.viewControllerId
            });
        case DELETE_ASYNC_TASK:
            return DataArchive.Delete(state, action.taskId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.vcId);
        case EDIT_ASYNC_TASK:
            return DataArchive.Merge(state, {
                id: action.taskId,
                ...action.edits
            });
        default:
            return state;
    }
}