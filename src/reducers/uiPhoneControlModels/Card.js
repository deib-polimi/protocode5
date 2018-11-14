import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_CARD } from "../../Constants";
import DataArchive from "../../utils/DataArchive";

export default function createCard(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_CARD,
            action.viewController,
            action.controlId,
            'Card' + DataArchive.CountRel(state, 'uiPhoneControlType', UI_PHONE_CONTROL_CARD),
            'Title goes here',
            320,
            320,
            320,
            320
        ),
        subtitle: 'Subtitle goes here',
        numActions: 2,
        marginTop: 8,
        marginBottom: 8,
        marginLeft: 8,
        marginRight: 8
    }
}