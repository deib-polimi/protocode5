import createUiPhoneControl from "./UiPhoneControl";
import { UI_PHONE_CONTROL_CONTAINER, SMARTPHONE, TABLET } from "../../Constants";

export default function createContainers(state, action) {
    return [{
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_CONTAINER,
            action.sceneId + SMARTPHONE,
            action.linkId + SMARTPHONE,
            'Container for ' + action.viewControllerId,
            '',
            0,
            0,
            300,
            400
        ),
        sceneId: action.sceneId,
        containedViewControllerId: action.viewControllerId,
        linkId: action.linkId,
        type: SMARTPHONE
    },
    {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_CONTAINER,
            action.sceneId + TABLET,
            action.linkId + TABLET,
            'Container for ' + action.viewControllerId,
            '',
            0,
            0,
            300,
            400
        ),
        sceneId: action.sceneId,
        containedViewControllerId: action.viewControllerId,
        linkId: action.linkId,
        type: TABLET
    }]
}