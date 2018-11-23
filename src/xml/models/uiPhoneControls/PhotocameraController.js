import { PHOTOCAMERA_CONTROLLER } from "../../XmlNames";

function transform() {
    this.xmlName = PHOTOCAMERA_CONTROLLER;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        elem.setAttribute('backgroundType', this.backgroundType);

        if (this.imageViewId !== null) {
            elem.setAttribute('imageViewId', this.imageViewId);
        }

        return elem;
    }
    this.getRefPath = () => {
        var updatedPath = '/@' + this.xmlName;
        updatedPath = this._viewController.getRefPath(updatedPath);
        return updatedPath;
    }
    return this;
}

export default function PhotocameraControllerTransform(control) {
    return transform.call(control);
}