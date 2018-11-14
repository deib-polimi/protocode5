import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_SPINNER } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createSpinner(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_SPINNER,
            action.viewController,
            action.controlId,
            'Spinner' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_SPINNER),
            '',
            150,
            48,
            180,
            48
        )
    }
}