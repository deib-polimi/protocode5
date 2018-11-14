import { CREATE_LIST_VIEW_CELL, EDIT_LIST_VIEW_CELL, DELETE_LIST_VIEW_CELL } from "../actions/ListViewCell";
import DataArchive from "../utils/DataArchive";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";
import { DELETE_UI_PHONE_CONTROL } from "../actions/UiPhoneControl";

const InitialState = DataArchive.Create('id', ['listViewId', 'viewControllerId']);

export default function ListViewCellReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_LIST_VIEW_CELL:
            return DataArchive.Insert(state, {
                id: action.cellId,
                viewControllerId: action.viewControllerId,
                listViewId: action.listViewId,
                name: action.name || 'Cell' + (DataArchive.CountRel(state, 'listViewId', action.listViewId) + 1),
                title: action.name || 'Title here...',
                subtitle: 'Subtitle here...'
            });
        case EDIT_LIST_VIEW_CELL:
            return DataArchive.Merge(state, {
                id: action.cellId,
                ...action.edits
            });
        case DELETE_LIST_VIEW_CELL:
            return DataArchive.Delete(state, action.cellId);
        case DELETE_UI_PHONE_CONTROL:
            return DataArchive.DeleteByRel(state, 'listViewId', action.controlId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        default:
            return state;
    }
}