import { SCENE, CHILD_VIEW_CONTROLLER } from "../XmlNames";
import { TABLET, SMARTPHONE, SCENE_MULTI_VC } from "../../Constants";
import ViewControllerTransform from "./ViewController";

function transform(application) {
    this.xmlName = SCENE;
    this._application = application;
    this.toXml = xmlDoc => {
        var scene = xmlDoc.createElement(this.xmlName);
        scene.setAttribute('id', this.id);
        scene.setAttribute('name', this.name);
        scene.setAttribute('launcher', this.launcher);
        scene.setAttribute('typeSmartphone', this.layout[SMARTPHONE].type);
        scene.setAttribute('typeTablet', this.layout[TABLET].type);
        // if there will be 2 parent view controllers, the first is the smartphone parent vc, the second is the tablet one
        if (this.layout[SMARTPHONE].type === SCENE_MULTI_VC) {
            scene.appendChild(ViewControllerTransform(this._application, this, this.layout[SMARTPHONE]).toXml(xmlDoc));
        }
        if (this.layout[TABLET] === SCENE_MULTI_VC) {
            scene.appendChild(ViewControllerTransform(this._application, this, this.layout[TABLET]).toXml(xmlDoc));
        }
        // SMARTPHONE or TABLET here does not matter, they refer to the same children
        this.layout[SMARTPHONE]
            .containers
            .map(container => ViewControllerTransform(this._application, null, container.containedViewController))
            .forEach(vc => {
                var vcInfo = xmlDoc.createElement(CHILD_VIEW_CONTROLLER);
                vcInfo.setAttribute('viewController', vc.getRefPath(''));
                scene.appendChild(vcInfo);
            });

        return scene;
    }
    this.getRefPath = path => {
        return '//@' + this.xmlName + '[id=\'' + this.id + '\']' + path;
    }
    return this;
}

export default function SceneTransform(application, raw) {
    return transform.call(raw, application);
}