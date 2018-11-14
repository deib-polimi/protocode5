import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_SLIDER } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createSlider(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_SLIDER,
            action.viewController,
            action.controlId,
            'Slider' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_SLIDER),
            '',
            150,
            50,
            150,
            50
        )
    }
}