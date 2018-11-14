import DataArchive from '../utils/DataArchive';
import { LINK_VIEWCONTROLLER, UNLINK_VIEWCONTROLLER, DELETE_SCENE, EDIT_CONTAINER } from '../actions/Scene';
import createContainers from './uiPhoneControlModels/Container';
import { DELETE_VIEW_CONTROLLER } from '../actions/ViewController';

const InitialState = DataArchive.Create('id', ['sceneId', 'viewControllerId', 'linkId']);

export default function ContainerReducer(state = InitialState, action) {
    switch(action.type) {
        case LINK_VIEWCONTROLLER:
            return DataArchive.Insert(state, ...createContainers(state, action));
        case UNLINK_VIEWCONTROLLER:
            return DataArchive.DeleteByRel(state, 'linkId', action.linkId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        case DELETE_SCENE:
            return DataArchive.DeleteByRel(state, 'sceneId', action.sceneId);
        case EDIT_CONTAINER:
            return DataArchive.Merge(state, {
                id: action.containerId,
                ...action.edits
            });
        default:
            return state;
    }
}