import { MAP } from "../../XmlNames";

function transform() {
    this.xmlName = MAP;
    this.toXml = xmlDoc => {
        var map = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, map);

        map.setAttribute('lat', this.latitude);
        map.setAttribute('lon', this.longitude);

        return map;
    }
    this.getRefPath = () => {
        var updatedPath = '/@' + this.xmlName;
        updatedPath = this.viewController.getRefPath(updatedPath);
        return updatedPath;
    }
    return this;
}

export default function MapTransform(control) {
    return transform.call(control);
}