import { CREATE_ALERT_DIALOG, DELETE_ALERT_DIALOG, EDIT_ALERT_DIALOG } from "../actions/AlertDialog";
import DataArchive from "../utils/DataArchive";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";

const InitialState = DataArchive.Create('id', ['viewControllerId']);

export default function AlertDialogReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_ALERT_DIALOG:
            return DataArchive.Insert(state, {
                id: action.dialogId,
                name: `${action.dialogId}AlertDialog`,
                title: '',
                message: '',
                viewControllerId: action.viewControllerId
            });
        case DELETE_ALERT_DIALOG:
            return DataArchive.Delete(state, action.dialogId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.vcId);
        case EDIT_ALERT_DIALOG:
            return DataArchive.Merge(state, {
                id: action.dialogId,
                ...action.edits
            });
        default:
            return state;
    }
}