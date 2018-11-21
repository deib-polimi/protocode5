import DataArchive from "../utils/DataArchive";
import { DISABLE_PREFERENCES } from "../actions/DataHandlers";
import { CREATE_PREFERENCE_RECORD, DELETE_PREFERENCE_RECORD } from "../actions/PreferenceRecord";

const InitialState = DataArchive.Create('id', []);

export default function PreferenceRecordReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_PREFERENCE_RECORD:
            return DataArchive.Insert(state, action.record);
        case DELETE_PREFERENCE_RECORD:
            return DataArchive.Delete(state, action.recordId);
        case DISABLE_PREFERENCES:
            return DataArchive.Create('id', []);
        default:
            return state;
    }
}