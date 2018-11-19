import { SWITCH } from "../../XmlNames";

function transform() {
    this.xmlName = SWITCH;
    this.toXml = xmlDoc => {
        var _switch = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, _switch);
        return _switch;
    }
    return this;
}

export default function SwitchTransform(control) {
    return transform.call(control);
}