import { CONTAINER } from "../../XmlNames";
import ViewControllerTransform from "../ViewController";

function transform() {
    this.xmlName = CONTAINER;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        elem.setAttribute('childViewController', ViewControllerTransform(this._viewController._application, this._viewController._scene, this.containedViewController).getRefPath(''));
        this.decorateXml(xmlDoc, elem);

        return elem;
    }
    return this;
}

export default function ContainerTransform(control) {
    return transform.call(control);
}