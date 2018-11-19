import { TIMEPICKER } from "../../XmlNames";

function transform() {
    this.xmlName = TIMEPICKER;
    this.toXml = xmlDoc => {
        var timepicker = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, timepicker);
        return timepicker;
    }
    return this;
}

export default function TimePickerTransform(control) {
    return transform.call(control);
}