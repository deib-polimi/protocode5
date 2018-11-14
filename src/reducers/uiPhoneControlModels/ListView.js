import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_LIST_VIEW, LIST_VIEW_SIMPLE } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createListView(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_LIST_VIEW,
            action.viewController,
            action.controlId,
            'ListView' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_LIST_VIEW),
            '',
            270,
            60,
            270,
            270
        ),
        backgroundColor: '',
        listType: LIST_VIEW_SIMPLE
    }
}