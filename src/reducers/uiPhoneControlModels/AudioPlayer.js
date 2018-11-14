import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_AUDIO_PLAYER } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createAudioPlayer(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_AUDIO_PLAYER,
            action.viewController,
            action.controlId,
            'AudioPlayer' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_AUDIO_PLAYER),
            '',
            250,
            75,
            250,
            75
        )
    }
}