import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, VIDEOCAMERA_BACKGROUND_NORMAL } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createVideocameraController(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER,
            action.viewController,
            action.controlId,
            'VideocameraController' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER),
            '',
            64,
            40,
            120,
            40
        ),
        backgroundType: VIDEOCAMERA_BACKGROUND_NORMAL,
        $ref: 'videoViewId',
        videoViewId: null
    }
}