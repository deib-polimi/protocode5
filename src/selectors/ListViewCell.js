import DataArchive from "../utils/DataArchive";
import { ModelConnectorSelector } from "./ModelConnector";

export default function ListViewCellSelector(state, listViewId) {
    return DataArchive.Extract(state.listViewCells, 'listViewId', listViewId).map(cell => {
        return {
            ...cell,
            modelConnectors: ModelConnectorSelector(state, cell.id)
        }
    });
}