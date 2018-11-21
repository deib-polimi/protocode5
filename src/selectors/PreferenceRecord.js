import DataArchive from "../utils/DataArchive";

export function PreferenceRecordsSelector(state) {
    return DataArchive.All(state.preferenceRecords);
}