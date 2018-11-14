import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_WEBVIEW } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createWebView(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_WEBVIEW,
            action.viewController,
            action.controlId,
            'WebView' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_WEBVIEW),
            '',
            0,
            0,
            240,
            128
        ),
        htmlFileName: ''
    }
}