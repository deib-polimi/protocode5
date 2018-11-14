import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_SWITCH } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createSwitch(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_SWITCH,
            action.viewController,
            action.controlId,
            'Switch' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_SWITCH),
            '',
            51,
            36,
            51,
            36
        )
    }
}