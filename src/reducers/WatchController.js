import DataArchive from "../utils/DataArchive";
import { EDIT_WATCH_CONTROLLER, CREATE_WATCH_CONTROLLER, DELETE_WATCH_CONTROLLER } from "../actions/WatchController";

const InitialState = DataArchive.Create('id', []);

export default function WatchControllerReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_WATCH_CONTROLLER:
            return DataArchive.Insert(state, {
                id: action.watchControllerId,
                name: 'WatchController' + (DataArchive.Count(state) + 1),
                launcher: false,
            })
        case EDIT_WATCH_CONTROLLER: {
            let intermediate = state;
            if (action.edits.launcher) {
                let currentLauncher = DataArchive.All(state).find(s => s.launcher);
                if (currentLauncher) {
                    intermediate = DataArchive.Merge(state, {
                        id: currentLauncher.id,
                        launcher: false
                    });
                }
            }
            return DataArchive.Merge(intermediate, {
                id: action.watchControllerId,
                ...action.edits
            });
        }
        case DELETE_WATCH_CONTROLLER:
            return DataArchive.Delete(state, action.watchControllerId);
        default:
            return state;
    }
}