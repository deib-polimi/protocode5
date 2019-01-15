import DataArchive from "../utils/DataArchive";
import { DELETE_SCENE } from "../actions/Scene";
import { CREATE_ADAPTER_BINDING, DELETE_ADAPTER_BINDING } from "../actions/AdapterBinding";

const InitialState = DataArchive.Create('id', ['sceneId']);

export default function AdapterBindingReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_ADAPTER_BINDING:
            return DataArchive.Insert(state, {
                sceneId: action.scene,
                adapterClass: action.adapterClass,
                fileId: action.file,
                entityId: action.entity,
                preferenceId: action.preference,
                cloudObjectId: action.cloudObject,
                cloudRefPath: action.cloudRefPath,
                isList: action.isList,
                name: action.name,
                id: action.adapterId
            })
        case DELETE_ADAPTER_BINDING:
            return DataArchive.Delete(state, action.adapterId);
        case DELETE_SCENE:
            return DataArchive.DeleteByRel(state, 'sceneId', action.sceneId);
        default:
            return state;
    }
}