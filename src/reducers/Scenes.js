import { CREATE_SCENE, EDIT_SCENE, DELETE_SCENE } from "../actions/Scene";
import DataArchive from "../utils/DataArchive";

const InitialState = DataArchive.Create('id', ['launcher']);

function ScenesReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_SCENE:
            return DataArchive.Insert(state, {
                id: action.sceneId,
                name: 'Scene' + (DataArchive.Count(state) + 1),
                launcher: false
            });
        case EDIT_SCENE: {
            let intermediate = state;
            if (action.edits.launcher) {
                let currentLauncher = DataArchive.Extract(state, 'launcher', true);
                intermediate = DataArchive.Merge(state, {
                    id: currentLauncher.id,
                    launcher: false
                });
            }
            return DataArchive.Merge(intermediate, {
                id: action.sceneId,
                ...action.edits
            });
        }
        case DELETE_SCENE:
            return DataArchive.Delete(state, action.sceneId);
        default:
            return state;
    }
}

export default ScenesReducer;