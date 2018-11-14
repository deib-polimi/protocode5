import DataArchive from "../utils/DataArchive";
import { CREATE_NAVIGATION, EDIT_NAVIGATION, DELETE_NAVIGATION } from "../actions/Navigation";
import { DELETE_SCENE } from "../actions/Scene";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";
import { DELETE_UI_PHONE_CONTROL } from "../actions/UiPhoneControl";

const InitialState = DataArchive.Create('id', ['fromSceneId', 'fromViewControllerId', 'fromControlId']);

export default function NavigationReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_NAVIGATION:
            return DataArchive.Insert(state, {
                id: action.navigationId,
                fromSceneId: action.fromSceneId,
                fromViewControllerId: action.fromViewControllerId,
                fromControlId: action.fromControlId,
                toSceneId: action.toSceneId,
                toViewControllerId: action.toViewControllerId
            })
        case EDIT_NAVIGATION:
            return DataArchive.Merge(state, {
                id: action.navigationId,
                ...action.edits
            })
        case DELETE_NAVIGATION:
            return DataArchive.Delete(state, action.navigationId);
        case DELETE_SCENE:
            return DataArchive.DeleteByFilter(state, nav => nav.fromSceneId === action.sceneId || nav.toSceneId === action.sceneId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByFilter(state, nav => nav.fromViewControllerId === action.viewControllerId || nav.toViewControllerId === action.viewControllerId);
        case DELETE_UI_PHONE_CONTROL:
            return DataArchive.DeleteByRel(state, 'fromControlId', action.controlId);
        default:
            return state;
    }
}