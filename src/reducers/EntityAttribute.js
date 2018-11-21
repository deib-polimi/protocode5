import DataArchive from "../utils/DataArchive";
import { DELETE_ENTITY_ATTRIBUTE, CREATE_ENTITY_ATTRIBUTE } from "../actions/Entity_Attribute";
import { DELETE_ENTITY } from "../actions/Entity";
import { DISABLE_DATABASE } from "../actions/DataHandlers";

function createInitialState() {
    return DataArchive.Create('id', ['entityId']);
}

const InitialState = createInitialState();

export default function EntityAttributeReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_ENTITY_ATTRIBUTE:
            return DataArchive.Insert(state, action.attribute)
        case DELETE_ENTITY_ATTRIBUTE:
            return DataArchive.Delete(state, action.attributeId);
        case DELETE_ENTITY:
            return DataArchive.DeleteByRel(state, 'entityId', action.entityId);
        case DISABLE_DATABASE:
            return createInitialState();
        default: 
            return state;
    }
}