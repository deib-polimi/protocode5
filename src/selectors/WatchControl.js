import DataArchive from "../utils/DataArchive";

export function WatchControlSelector(state, controlId) {
    return DataArchive.Get(state.watchControls, controlId);
}

export function WatchControlSelectorController(state, controllerId) {
    return DataArchive.Extract(state.watchControls, 'watchControllerId', controllerId);
}

export function WatchControlSelectorAll(state) {
    return DataArchive.All(state.watchControls);
}