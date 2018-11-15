import DataArchive from "../../utils/DataArchive";
import { WATCH_SWITCH } from "../../Constants";
import createWatchControl from "./WatchControl";

export default function createSwitch(state, action) {
    let name = 'Switch' + (DataArchive.CountRel(state, 'watchControlType', WATCH_SWITCH) + 1);
    return createWatchControl(
        WATCH_SWITCH,
        action.watchControllerId,
        action.controlId,
        name,
        'Switch label',
        48,
        48
    )
}