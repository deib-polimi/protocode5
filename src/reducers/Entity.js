import DataArchive from "../utils/DataArchive";
import { EDIT_ENTITY, CREATE_ENTITY, DELETE_ENTITY } from "../actions/Entity";
import { DISABLE_DATABASE } from "../actions/DataHandlers";

const InitialState = DataArchive.Create('id', []);

export default function EntityReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_ENTITY:
            return DataArchive.Insert(state, action.entity);
        case EDIT_ENTITY:
            return DataArchive.Merge(state, {
                id: action.entityId,
                ...action.edits
            });
        case DELETE_ENTITY:
            return DataArchive.Delete(state, action.entityId);
        case DISABLE_DATABASE:
            return DataArchive.Create('id', []);
        default:
            return state;
        
    }
}