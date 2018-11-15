import DataArchive from "../utils/DataArchive";
import { EDIT_WATCH_CONTROL, DELETE_WATCH_CONTROL, CREATE_WATCH_CONTROL } from "../actions/WatchControl";
import { DELETE_WATCH_CONTROLLER } from "../actions/WatchController";
import { WATCH_BUTTON, WATCH_LABEL, WATCH_SLIDER, WATCH_SWITCH, WATCH_VOICE } from "../Constants";
import createButton from "./watchControlModels/Button";
import createLabel from "./watchControlModels/Label";
import createSlider from "./watchControlModels/Slider";
import createSwitch from "./watchControlModels/Switch";
import { createVoice } from "./watchControlModels/Voice";

const InitialState = DataArchive.Create('id', ['watchControllerId', 'watchControlType']);

function createAndInsertWatchController(state, action) {
    let control = null;
    switch(action.controlType) {
        case WATCH_BUTTON: control = createButton(state, action); break;
        case WATCH_LABEL: control = createLabel(state, action); break;
        case WATCH_SLIDER: control = createSlider(state, action); break;
        case WATCH_SWITCH: control = createSwitch(state, action); break;
        case WATCH_VOICE: control = createVoice(state, action); break;
        default: control = null; break;
    }
    if (control) {
        return DataArchive.Insert(state, control);
    } else {
        return state;
    }
}

export default function WatchControlReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_WATCH_CONTROL:
            return createAndInsertWatchController(state, action);
        case EDIT_WATCH_CONTROL:
            return DataArchive.Merge(state, {
                id: action.controlId,
                ...action.edits
            })
        case DELETE_WATCH_CONTROL:
            return DataArchive.Delete(state, action.controlId);
        case DELETE_WATCH_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'watchControllerId', action.watchControllerId);
        default:
            return state;
    }
}