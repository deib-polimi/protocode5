import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_MAP } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createMap(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_MAP,
            action.viewController,
            action.controlId,
            'Map' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_MAP),
            '',
            0,
            0,
            200,
            330
        ),
        latitude: 45.478,
        longitude: 9.227
    }
}