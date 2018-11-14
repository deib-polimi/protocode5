import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_TEXTEDIT } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createEditText(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_TEXTEDIT,
            action.viewController,
            action.controlId,
            'TextEdit' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_TEXTEDIT),
            'Enter some text...',
            88,
            36,
            88,
            36
        ),
        textColor: '',
        placeholder: '',
        textSize: 16
    }
}