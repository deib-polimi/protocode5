import { WATCH_SWITCH } from "../../XmlNames";

function transform() {
    this.xmlName = WATCH_SWITCH;
    this.toXml = xmlDoc => {
        var _switch = xmlDoc.createElement(this.xmlName);
        this.decorateXml(_switch);
        _switch.setAttribute('title', this.title);
        return _switch;
    }
    return this;
}

export default function SwitchTransform(control) {
    return transform.call(control);
}