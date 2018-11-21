import DataArchive from "../utils/DataArchive";
import { CREATE_CLOUD_OBJECT_ATTRIBUTE, DELETE_CLOUD_OBJECT_ATTRIBUTE } from "../actions/CloudObjectAttribute";
import { DELETE_CLOUD_OBJECT } from "../actions/CloudObject";
import { DISABLE_CLOUD_DATABASE } from "../actions/DataHandlers";

function createInitialState() {
    return DataArchive.Create('id', ['objectId', 'object']);
}

const InitialState = createInitialState();

export default function CloudObjectAttributeReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_CLOUD_OBJECT_ATTRIBUTE:
            return DataArchive.Insert(state, action.attribute);
        case DELETE_CLOUD_OBJECT_ATTRIBUTE:
            return DataArchive.Delete(state, action.attributeId);
        case DELETE_CLOUD_OBJECT: {
            let intermediate = DataArchive.DeleteByRel(state, 'objectId', action.objectId);
            return DataArchive.DeleteByRel(intermediate, 'object', action.objectId);
        }
        case DISABLE_CLOUD_DATABASE:
            return createInitialState();
        default:
            return state;
    }
}