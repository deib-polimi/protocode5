import DataArchive from "../../utils/DataArchive";
import { WATCH_LABEL } from "../../Constants";
import createWatchControl from "./WatchControl";

export default function createLabel(state, action) {
    let name = 'Label' + (DataArchive.CountRel(state, 'watchControlType', WATCH_LABEL) + 1);
    return {
        ...createWatchControl(
            WATCH_LABEL,
            action.watchControllerId,
            action.controlId,
            name,
            name,
            36,
            48
        ),
        textAlign: 'center',
        textDecoration: 'none'
    }
}