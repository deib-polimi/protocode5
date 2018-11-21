import { ENABLE_PREFERENCES, ENABLE_FILE_STORAGE, ENABLE_DATABASE, ENABLE_CLOUD_DATABASE, DISABLE_PREFERENCES, DISABLE_FILE_STORAGE, DISABLE_DATABASE, DISABLE_CLOUD_DATABASE } from "../actions/DataHandlers";

const InitialState = {
    preferences: false,
    files: false,
    database: false,
    cloud: false
};

export default function DataHandlersReducer(state = InitialState, action) {
    switch (action.type) {
        case ENABLE_PREFERENCES:
            return {
                ...state,
                preferences: true
            }
        case ENABLE_FILE_STORAGE:
            return {
                ...state,
                files: true
            }
        case ENABLE_DATABASE:
            return {
                ...state,
                database: true
            }
        case ENABLE_CLOUD_DATABASE:
            return {
                ...state,
                cloud: true
            }
        case DISABLE_PREFERENCES:
            return {
                ...state,
                preferences: false
            }
        case DISABLE_FILE_STORAGE:
            return {
                ...state,
                files: false
            }
        case DISABLE_DATABASE:
            return {
                ...state,
                database: false
            }
        case DISABLE_CLOUD_DATABASE:
            return {
                ...state,
                cloud: false
            }
        default:
            return state;
    }
}