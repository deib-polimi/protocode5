import DataArchive from "../utils/DataArchive";
import { ViewControllerScene } from "./ViewController";
import { SMARTPHONE } from "../Constants";
import { NavigationSelectorAll } from "./Navigation";

function recompute(state, scene) {
    if (scene) {
        let layout = ViewControllerScene(state, scene.id);
        return {
            ...scene,
            layout,
            valid: layout[SMARTPHONE].containers.length > 0,
            reachable: scene.launcher || NavigationSelectorAll(state).map(nav => nav.toSceneId === scene.id).reduce((prev, curr) => prev || curr, false)
        }
    } else {
        return null;
    }
}

export default function SceneSelector(state, sceneId) {
    let scene = DataArchive.Get(state.scenes, sceneId);
    return recompute(state, scene);
}

export function SceneAll(state) {
    return DataArchive.All(state.scenes).map(recompute.bind(null, state));
}