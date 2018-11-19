import { WATCH_SLIDER } from "../../XmlNames";

function transform() {
    this.xmlName = WATCH_SLIDER;
    this.toXml = xmlDoc => {
        var slider = xmlDoc.createElement(this.xmlName);
        this.decorateXml(slider);
        return slider;
    }
    return this;
}

export default function SliderTransform(control) {
    return transform.call(control);
}