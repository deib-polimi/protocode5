import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_GRID_VIEW, MEASURE_MODE_PERCENT, GRID_VIEW_SIMPLE } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createGridView(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_GRID_VIEW,
            action.viewController,
            action.controlId,
            'GridView' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_GRID_VIEW),
            '',
            100,
            408,
            100,
            408
        ),
        widthMode: MEASURE_MODE_PERCENT,
        gridType: GRID_VIEW_SIMPLE
    }
}