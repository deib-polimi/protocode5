import DataArchive from '../utils/DataArchive';
import { CREATE_UI_PHONE_CONTROL, DELETE_UI_PHONE_CONTROL } from '../actions/UiPhoneControl';
import { UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_AUDIO_PLAYER, SOURCE_TYPE_HARDWARE } from '../Constants';
import { EDIT_SOURCE_TYPE } from '../actions/SourceType';
import { DELETE_VIEW_CONTROLLER } from '../actions/ViewController';

const InitialState = DataArchive.Create('id', ['viewControllerId']);

export default function SourceTypeReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_UI_PHONE_CONTROL:
            switch(action.uiPhoneControlType) {
                case UI_PHONE_CONTROL_IMAGE_VIEW:
                case UI_PHONE_CONTROL_VIDEO_VIEW:
                case UI_PHONE_CONTROL_AUDIO_PLAYER:
                    return DataArchive.Insert(state, {
                        id: action.controlId,
                        viewControllerId: action.viewControllerId,
                        type: SOURCE_TYPE_HARDWARE,
                        fileUri: ''
                    });
                default: 
                    return state;
            }
        case EDIT_SOURCE_TYPE:
            return DataArchive.Merge(state, {
                id: action.controlId,
                ...action.edits
            });
        case DELETE_UI_PHONE_CONTROL:
            return DataArchive.Delete(state, action.controlId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        default:
            return state;
    }
}