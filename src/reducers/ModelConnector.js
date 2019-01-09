import DataArchive from "../utils/DataArchive";
import { DELETE_UI_PHONE_CONTROL } from "../actions/UiPhoneControl";
import { DELETE_MODEL_CONNECTOR, CREATE_MODEL_CONNECTOR } from "../actions/ModelConnector";
import { DELETE_VIEW_CONTROLLER } from "../actions/ViewController";
import { DELETE_SCENE } from "../actions/Scene";
import { DELETE_ADAPTER_BINDING } from "../actions/AdapterBinding";

const InitialState = DataArchive.Create('id', ['sceneId', 'viewControllerId', 'controlId', 'adapterId']);

export default function ModelConnectorReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_MODEL_CONNECTOR:
            return DataArchive.Insert(state, action.connector);
        case DELETE_MODEL_CONNECTOR:
            return DataArchive.Delete(state, action.connectorId);
        case DELETE_UI_PHONE_CONTROL:
            return DataArchive.DeleteByRel(state, 'controlId', action.controlId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        case DELETE_SCENE:
            return DataArchive.DeleteByRel(state, 'sceneId', action.sceneId);
        case DELETE_ADAPTER_BINDING:
            return DataArchive.DeleteByRel(state, 'adapterId', action.adapterId);
        default:
            return state;
    }
}