import DataArchive from "../utils/DataArchive";
import { DISABLE_FILE_STORAGE } from "../actions/DataHandlers";
import { CREATE_FILE_STORAGE_RECORD, DELETE_FILE_STORAGE_RECORD } from "../actions/FileStorageRecord";

const InitialState = DataArchive.Create('id', []);

export default function FileStorageRecordReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_FILE_STORAGE_RECORD:
            return DataArchive.Insert(state, action.record);
        case DELETE_FILE_STORAGE_RECORD:
            return DataArchive.Delete(state, action.recordId);
        case DISABLE_FILE_STORAGE:
            return DataArchive.Create('id', []);
        default:
            return state;
    }
}