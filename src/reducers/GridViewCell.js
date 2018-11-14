import DataArchive from "../utils/DataArchive";
import { CREATE_GRID_VIEW_CELL, EDIT_GRID_VIEW_CELL, DELETE_GRID_VIEW_CELL } from "../actions/GridViewCell";
import { DELETE_UI_PHONE_CONTROL } from "../actions/UiPhoneControl";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";

const InitialState = DataArchive.Create('id', ['gridViewId', 'viewControllerId']);

export default function GridViewCellReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_GRID_VIEW_CELL:
            return DataArchive.Insert(state, {
                id: action.cellId,
                gridViewId: action.gridViewId,
                viewControllerId: action.viewControllerId,
                name: action.name || (DataArchive.CountRel(state, 'gridViewId', action.gridViewId) + 1),
                title: action.name || 'Title here...'
            });
        case EDIT_GRID_VIEW_CELL:
            return DataArchive.Merge(state, {
                id: action.cellId,
                ...action.edits
            });
        case DELETE_GRID_VIEW_CELL:
            return DataArchive.Delete(state, action.cellId);
        case DELETE_UI_PHONE_CONTROL:
            return DataArchive.DeleteByRel(state, 'gridViewId', action.controlId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        default:
            return state;
    }
}