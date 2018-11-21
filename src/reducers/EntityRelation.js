import DataArchive from "../utils/DataArchive";
import { DELETE_ENTITY } from "../actions/Entity";
import { DISABLE_DATABASE } from "../actions/DataHandlers";
import { CREATE_ENTITY_RELATION, DELETE_ENTITY_RELATION } from "../actions/Entity_Relation";

function createInitialState() {
    return DataArchive.Create('id', ['fromEntityId', 'toEntityId']);
}

const InitialState = createInitialState();

export default function EntityRelationReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_ENTITY_RELATION:
            return DataArchive.Insert(state, action.relation);
        case DELETE_ENTITY_RELATION:
            return DataArchive.Delete(state, action.relationId);
        case DELETE_ENTITY:
            return DataArchive.DeleteByRel(
                DataArchive.DeleteByRel(state, 'fromEntityId', action.entityId),
                'toEntityId',
                action.entityId
            );
        case DISABLE_DATABASE:
            return createInitialState();
        default:
            return state;
    }
}