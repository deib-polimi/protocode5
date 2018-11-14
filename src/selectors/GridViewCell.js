import DataArchive from "../utils/DataArchive";

export default function GridViewCellSelector(state, gridViewId) {
    return DataArchive.Extract(state.gridViewCells, 'gridViewId', gridViewId);
}