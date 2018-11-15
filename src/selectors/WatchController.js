import DataArchive from "../utils/DataArchive";
import { WatchControlSelectorController } from "./WatchControl";

function recomputeProps(state, watchController) {
    if (!watchController) return watchController;
    return {
        ...watchController,
        controls: WatchControlSelectorController(state, watchController.id)
    }
}

export function WatchControllerSelector(state, watchControllerId) {
    return recomputeProps(state, DataArchive.Get(state.watchControllers, watchControllerId)) || null;
}

export function WatchControllerSelectorAll(state) {
    return DataArchive.All(state.watchControllers).map(recomputeProps.bind(null, state));
}