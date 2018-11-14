import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_IMAGE_VIEW } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createImageView(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_IMAGE_VIEW,
            action.viewController,
            action.controlId,
            'ImageView' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_IMAGE_VIEW),
            '',
            0,
            0,
            240,
            128
        )
    }
}