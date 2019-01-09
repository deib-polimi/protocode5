import DataArchive from "../utils/DataArchive";

export function FileStorageRecordSelectorAll(state) {
    return DataArchive.All(state.fileStorageRecords);
}

export function FileStorageRecordSelector(state, recordId) {
    if (recordId === undefined) debugger;
    return DataArchive.Get(state.fileStorageRecords, recordId);
}