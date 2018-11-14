import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_AUDIO_RECORDER } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createAudioRecorder(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_AUDIO_RECORDER,
            action.viewController,
            action.controlId,
            'AudioRecorder' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_AUDIO_RECORDER),
            '',
            64,
            40,
            88,
            40
        ),
        $ref: 'audioPlayerId',
        audioPlayerId: null
    }
}