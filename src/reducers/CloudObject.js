import DataArchive from "../utils/DataArchive";
import { DISABLE_CLOUD_DATABASE } from "../actions/DataHandlers";
import { CREATE_CLOUD_OBJECT, EDIT_CLOUD_OBJECT, DELETE_CLOUD_OBJECT } from "../actions/CloudObject";

function createInitialState() {
    return DataArchive.Create('id', []);
}

const InitialState = createInitialState();

export default function CloudObjectReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_CLOUD_OBJECT:  
            return DataArchive.Insert(state, action.object);
        case EDIT_CLOUD_OBJECT:
            return DataArchive.Merge(state, {
                id: action.objectId,
                ...action.edits
            });
        case DELETE_CLOUD_OBJECT:
            return DataArchive.Delete(state, action.objectId);
        case DISABLE_CLOUD_DATABASE:
            return createInitialState();
        default:
            return state;
    }
}