import { DATEPICKER } from "../../XmlNames";

function transform() {
    this.xmlName = DATEPICKER;
    this.toXml = xmlDoc => {
        var datepicker = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, datepicker);
        return datepicker;
    }
    return this;
}

export default function DatepickerTransform(control) {
    return transform.call(control);
}