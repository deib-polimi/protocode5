import { DELETE_CONTROL_CHAIN } from '../actions/ControlChain';
import { CREATE_UI_PHONE_CONTROL, DELETE_UI_PHONE_CONTROL, EDIT_UI_PHONE_CONTROL } from '../actions/UiPhoneControl';
import { DELETE_VIEW_CONTROLLER } from '../actions/ViewController';
import { CONTROL_CHAIN_POSSIBLE_MEMBERS, UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_AUDIO_RECORDER, UI_PHONE_CONTROL_BUTTON, UI_PHONE_CONTROL_CARD, UI_PHONE_CONTROL_DATEPICKER, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_LABEL, UI_PHONE_CONTROL_LIST_VIEW, UI_PHONE_CONTROL_MAP, UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, UI_PHONE_CONTROL_SLIDER, UI_PHONE_CONTROL_SPINNER, UI_PHONE_CONTROL_SWITCH, UI_PHONE_CONTROL_TEXTEDIT, UI_PHONE_CONTROL_TIMEPICKER, UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_WEBVIEW } from '../Constants';
import DataArchive from '../utils/DataArchive';
import createAudioPlayer from './uiPhoneControlModels/AudioPlayer';
import createAudioRecorder from './uiPhoneControlModels/AudioRecorder';
import createButton from './uiPhoneControlModels/Button';
import createCard from './uiPhoneControlModels/Card';
import createDatepicker from './uiPhoneControlModels/Datepicker';
import createEditText from './uiPhoneControlModels/EditText';
import createGridView from './uiPhoneControlModels/GridView';
import createImageView from './uiPhoneControlModels/ImageView';
import createLabel from './uiPhoneControlModels/Label';
import createListView from './uiPhoneControlModels/ListView';
import createMap from './uiPhoneControlModels/Map';
import createPhotocameraController from './uiPhoneControlModels/PhotocameraController';
import createSlider from './uiPhoneControlModels/Slider';
import createSpinner from './uiPhoneControlModels/Spinner';
import createSwitch from './uiPhoneControlModels/Switch';
import createTimepicker from './uiPhoneControlModels/Timepicker';
import createVideocameraController from './uiPhoneControlModels/VideocameraController';
import createVideoView from './uiPhoneControlModels/VideoView';
import createWebView from './uiPhoneControlModels/WebView';

/**
 * ABOUT $ref
 * 
 * $ref is used to track if a uiPhoneControl is linked to another control in some of its attributes
 * An example can be PhotocameraController and ImageView, the former is linked to the latter
 * In this case, $ref is a string containing the name of the tracker attribute (in the example, imageViewId)
 * Currently, only one ref is supported, but extension should be pretty straightforward, if needed
 * The single ref tracking was chosen to avoid writing loops that only have one iteration
 * 
 * If no reference is used, $ref MUST point to NULL
 */
const InitialState = DataArchive.Create('id', ['viewControllerId', 'uiPhoneControlType', 'controlChainId', '$ref']);

function controlTypeSwitch(state, action) {
    switch (action.uiPhoneControlType) {
        case UI_PHONE_CONTROL_BUTTON: return createButton(state, action);
        case UI_PHONE_CONTROL_LABEL: return createLabel(state, action);
        case UI_PHONE_CONTROL_TEXTEDIT: return createEditText(state, action);
        case UI_PHONE_CONTROL_SLIDER: return createSlider(state, action);
        case UI_PHONE_CONTROL_SPINNER: return createSpinner(state, action);
        case UI_PHONE_CONTROL_SWITCH: return createSwitch(state, action);
        case UI_PHONE_CONTROL_WEBVIEW: return createWebView(state, action);
        case UI_PHONE_CONTROL_IMAGE_VIEW: return createImageView(state, action);
        case UI_PHONE_CONTROL_VIDEO_VIEW: return createVideoView(state, action);
        case UI_PHONE_CONTROL_AUDIO_PLAYER: return createAudioPlayer(state, action);
        case UI_PHONE_CONTROL_LIST_VIEW: return createListView(state, action);
        case UI_PHONE_CONTROL_GRID_VIEW: return createGridView(state, action);
        case UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER: return createPhotocameraController(state, action);
        case UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER: return createVideocameraController(state, action);
        case UI_PHONE_CONTROL_AUDIO_RECORDER: return createAudioRecorder(state, action);
        case UI_PHONE_CONTROL_MAP: return createMap(state, action);
        case UI_PHONE_CONTROL_DATEPICKER: return createDatepicker(state, action);
        case UI_PHONE_CONTROL_TIMEPICKER: return createTimepicker(state, action);
        case UI_PHONE_CONTROL_CARD: return createCard(state, action);
        default: return undefined;
    }
}

function createControlForAction(state, action) {
    let control = controlTypeSwitch(state, action);
    if (action.controlChainId && CONTROL_CHAIN_POSSIBLE_MEMBERS.indexOf(control.uiPhoneControlType) >= 0) {
        control.controlChainId = action.controlChainId;
        control.controlChainPosition = action.controlChainPosition;
    }
    if (control) {
        return DataArchive.Insert(state, control);
    } else {
        return state;
    }
}

export default function UiPhoneControlReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_UI_PHONE_CONTROL:
            return createControlForAction(state, action);
        case DELETE_UI_PHONE_CONTROL: {
            let relsCheck = DataArchive.ExtractNot(state, '$ref', null);
            let safeRels = relsCheck.reduce((state, item) => {
                if (item[item['$ref']] === action.controlId) {
                    return DataArchive.Merge(state, {
                        id: item.id,
                        [item['$ref']]: null
                    });
                } else {
                    return state;
                }
            }, state);
            return DataArchive.Delete(safeRels, action.controlId);
        }
        case DELETE_VIEW_CONTROLLER: {
            let relsCheck = DataArchive.ExtractNot(state, '$ref', null);
            let toDelete = DataArchive.Extract(state, 'viewControllerId', action.viewControllerId);
            let toDeleteHash = {};
            toDelete.forEach(item => toDeleteHash[item.id] = true);
            let safeRels = relsCheck.reduce((state, item) => {
                if (toDeleteHash[item[item['$ref']]] === true) {
                    return DataArchive.Merge(state, {
                        id: item.id,
                        [item['$ref']]: null
                    });
                } else {
                    return state;
                }
            }, state);
            return DataArchive.DeleteByRel(safeRels, 'viewControllerId', action.viewControllerId);
        }
        case DELETE_CONTROL_CHAIN: {
            let relsCheck = DataArchive.ExtractNot(state, '$ref', null);
            let toDelete = DataArchive.Extract(state, 'controlChainId', action.chainId);
            let toDeleteHash = {};
            toDelete.forEach(item => toDeleteHash[item.id] = true);
            let safeRels = relsCheck.reduce((state, item) => {
                if (toDeleteHash[item[item['$ref']]] === true) {
                    return DataArchive.Merge(state, {
                        id: item.id,
                        [item['$ref']]: null
                    });
                } else {
                    return state;
                }
            }, state);
            return DataArchive.DeleteByRel(safeRels, 'controlChainId', action.chainId);
        }
        case EDIT_UI_PHONE_CONTROL:
            return DataArchive.Merge(state, {
                id: action.controlId,
                ...action.edits
            });
        default:
            return state;
    }
}