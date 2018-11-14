import { CREATE_PROGRESS_DIALOG, DELETE_PROGRESS_DIALOG, EDIT_PROGRESS_DIALOG } from "../actions/ProgressDialog";
import DataArchive from "../utils/DataArchive";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";

const InitialState = DataArchive.Create('id', ['viewControllerId']);

export default function ProgressDialogReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_PROGRESS_DIALOG:
            return DataArchive.Insert(state, {
                id: action.dialogId,
                viewControllerId: action.viewControllerId,
                name: `${action.dialogId}ProgressDialog`,
                title: '',
                message: '',
                spinner: false
            });
        case DELETE_PROGRESS_DIALOG:
            return DataArchive.Delete(state, action.dialogId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.vcId);
        case EDIT_PROGRESS_DIALOG:
            return DataArchive.Merge(state, {
                id: action.dialogId,
                ...action.edits
            });
        default:
            return state;
    }
}