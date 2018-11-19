import { SPINNER } from "../../XmlNames";

function transform() {
    this.xmlName = SPINNER;
    this.toXml = xmlDoc => {
        var spinner = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, spinner);
        return spinner;
    }
    return this;
}

export default function SpinnerTransform(control) {
    return transform.call(control);
}