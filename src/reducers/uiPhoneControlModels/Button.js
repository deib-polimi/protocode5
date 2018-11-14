import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_BUTTON } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createButton(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_BUTTON,
            action.viewController,
            action.controlId,
            'Button' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_BUTTON),
            'Click me!',
            64,
            40,
            88,
            40
        ),
        textColor: '',
        backgroundColor: '',
        clickColor: '',
        borderRadius: 2
    }
}