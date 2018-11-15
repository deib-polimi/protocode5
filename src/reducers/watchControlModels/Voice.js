import DataArchive from "../../utils/DataArchive";
import { WATCH_VOICE } from "../../Constants";
import createWatchControl from "./WatchControl";

export function createVoice(state, action) {
    let name = 'Voice' + (DataArchive.CountRel(state, 'watchControlType', WATCH_VOICE) + 1);
    return createWatchControl(
        WATCH_VOICE,
        action.watchControllerId,
        action.controlId,
        name,
        'REC',
        48,
        48
    )
}