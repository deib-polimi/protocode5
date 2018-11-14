import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, PHOTOCAMERA_BACKGROUND_NORMAL } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createPhotocameraController(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER,
            action.viewController,
            action.controlId,
            'PhotocameraController' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER),
            '',
            64,
            40,
            120,
            40
        ),
        $ref: 'imageViewId',
        imageViewId: null,
        backgroundType: PHOTOCAMERA_BACKGROUND_NORMAL
    }
}