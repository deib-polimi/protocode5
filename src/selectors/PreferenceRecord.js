import DataArchive from "../utils/DataArchive";

export function PreferenceRecordsSelector(state) {
    return DataArchive.All(state.preferenceRecords);
}

export function PreferenceRecordSelector(state, recordId) {
    return DataArchive.Get(state.preferenceRecords, recordId);
}