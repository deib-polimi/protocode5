import { VIDEOCAMERA_CONTROLLER } from "../../XmlNames";

function transform() {
    this.xmlName = VIDEOCAMERA_CONTROLLER;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        elem.setAttribute('backgroundType', this.backgroundType);

        if (this.videoViewId !== null) {
            elem.setAttribute('videoViewId', this.videoViewId);
        }

        return elem;
    }
    this.getRefPath = () => {
        var updatedPath = '/@' + this.xmlName;
        updatedPath = this.viewController.getRefPath(updatedPath);
        return updatedPath;
    }
    return this;
}

export default function VideocameraControllerTransform(control) {
    return transform.call(control);
}