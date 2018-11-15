import createWatchControl from "./WatchControl";
import DataArchive from "../../utils/DataArchive";
import { WATCH_BUTTON } from "../../Constants";

export default function createButton(state, action) {
    let name = 'Button' + (DataArchive.CountRel(state, 'watchControlType', WATCH_BUTTON) + 1);
    return {
        ...createWatchControl(
            WATCH_BUTTON,
            action.watchControllerId,
            action.controlId,
            name,
            name,
            48,
            48
        )
    }
}