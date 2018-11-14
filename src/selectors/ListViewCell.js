import DataArchive from "../utils/DataArchive";

export default function ListViewCellSelector(state, listViewId) {
    return DataArchive.Extract(state.listViewCells, 'listViewId', listViewId);
}