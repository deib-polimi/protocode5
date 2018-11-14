import DataArchive from "../utils/DataArchive";
import { ViewControllerScene } from "./ViewController";
import { SMARTPHONE } from "../Constants";

export default function SceneSelector(state, sceneId) {
    let scene = DataArchive.Get(state.scenes, sceneId);
    if (scene) {
        let layout = ViewControllerScene(state, sceneId);
        return {
            ...scene,
            layout,
            valid: layout[SMARTPHONE].containers.length > 0
        }
    } else {
        return null;
    }
}

export function SceneAll(state) {
    return DataArchive.All(state.scenes);
}