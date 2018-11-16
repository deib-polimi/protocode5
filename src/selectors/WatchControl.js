import DataArchive from "../utils/DataArchive";
import { WATCH_BUTTON } from "../Constants";

function recompute(state, control) {
    if (!control) return control;
    if (control.watchControlType === WATCH_BUTTON) {
        return {
            ...control,
            watchClickListener: DataArchive.Extract(state.watchClickListeners, 'controlId', control.id)[0]
        }
    } else {
        return {
            ...control
        };
    }
}

export function WatchControlSelector(state, controlId) {
    return recompute(state, DataArchive.Get(state.watchControls, controlId));
}

export function WatchControlSelectorController(state, controllerId) {
    return DataArchive.Extract(state.watchControls, 'watchControllerId', controllerId).map(recompute.bind(null, state));
}

export function WatchControlSelectorAll(state) {
    return DataArchive.All(state.watchControls).map(recompute.bind(null, state));
}