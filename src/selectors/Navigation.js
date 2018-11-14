import DataArchive from "../utils/DataArchive";

export default function NavigationSelector(state, controlId) {
    return DataArchive.Extract(state.navigations, 'fromControlId', controlId);
}