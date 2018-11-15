import DataArchive from "../../utils/DataArchive";
import { WATCH_SLIDER } from "../../Constants";
import createWatchControl from "./WatchControl";

export default function createSlider(state, action) {
    let name = 'Slider' + (DataArchive.CountRel(state, 'watchControlType', WATCH_SLIDER) + 1);
    return {
        ...createWatchControl(
            WATCH_SLIDER,
            action.watchControllerId,
            action.controlId,
            name,
            '',
            48,
            48
        )
    }
}