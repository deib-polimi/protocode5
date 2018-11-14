import { CREATE_VIEW_CONTROLLER, EDIT_VIEW_CONTROLLER, DELETE_VIEW_CONTROLLER } from '../actions/ViewController';
import DataArchive from '../utils/DataArchive';
import { CREATE_SCENE, DELETE_SCENE } from '../actions/Scene';
import { SMARTPHONE, TABLET, SCENE_SINGLE_VC } from '../Constants';

const InitialState = DataArchive.Create('id', ['scene']);

function ViewControllerReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_VIEW_CONTROLLER:
            return DataArchive.Insert(state, {
                id: action.vcId,
                name: 'ViewController' + (DataArchive.Count(state) + 1),
                backgroundColor: '#ffffff',
                backgroundImage: '',
                // The following are only used to manage parentViewControllers (i.e. those used by scenes)
                scene: null,
                type: SCENE_SINGLE_VC
            });
        case CREATE_SCENE: {
            return DataArchive.Insert(state,
                {
                    id: action.sceneId + SMARTPHONE,
                    name: 'Parent ViewController (smartphone)',
                    scene: action.sceneId,
                    type: SCENE_SINGLE_VC,
                    backgroundColor: '#ffffff',
                    backgroundImage: ''
                }, {
                    id: action.sceneId + TABLET,
                    name: 'Parent ViewController (tablet)',
                    scene: action.sceneId,
                    type: SCENE_SINGLE_VC,
                    backgroundColor: '#ffffff',
                    backgroundImage: ''
                }
            )
        }
        case EDIT_VIEW_CONTROLLER:
            return DataArchive.Merge(state, {
                id: action.vcId,
                ...action.edits
            });
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.Delete(state, action.vcId);
        case DELETE_SCENE:
            return DataArchive.DeleteByRel(state, 'scene', action.sceneId);
        default:
            return state;
    }
}

export default ViewControllerReducer;