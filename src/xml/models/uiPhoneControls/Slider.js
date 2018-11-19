import { SLIDER } from "../../XmlNames";

function transform() {
    this.xmlName = SLIDER;
    this.toXml = xmlDoc => {
        var slider = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, slider);
        return slider;
    }
    return this;
}

export default function SliderTransform(control) {
    return transform.call(control);
}