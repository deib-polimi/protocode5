import DataArchive from "../utils/DataArchive";

export function FileStorageRecordSelector(state) {
    return DataArchive.All(state.fileStorageRecords);
}