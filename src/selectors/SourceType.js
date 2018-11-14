import DataArchive from "../utils/DataArchive";

export default function SourceTypeSelector(state, controlId) {
    return DataArchive.Get(state.sourceTypes, controlId);
}