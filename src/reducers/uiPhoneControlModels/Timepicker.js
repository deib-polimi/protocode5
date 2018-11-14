import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_TIMEPICKER } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createTimepicker(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_TIMEPICKER,
            action.viewController,
            action.controlId,
            'TimePicker' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_TIMEPICKER),
            '',
            346,
            346,
            346,
            346
        ),
        
    }
}