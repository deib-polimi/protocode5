import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_VIDEO_VIEW } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createVideoView(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_VIDEO_VIEW,
            action.viewController,
            action.controlId,
            'VideoView' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_VIDEO_VIEW),
            '',
            0,
            0,
            240,
            128
        )
    }
}