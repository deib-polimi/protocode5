import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_DATEPICKER } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createDatepicker(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_DATEPICKER,
            action.viewController,
            action.controlId,
            'DatePicker' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_DATEPICKER),
            '',
            348,
            365,
            348,
            365
        )
    }
}