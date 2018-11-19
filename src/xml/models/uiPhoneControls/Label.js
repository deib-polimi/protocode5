import { LABEL } from "../../XmlNames";

function transform() {
    this.xmlName = LABEL;
    this.toXml = xmlDoc => {
        var label = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, label);
        label.setAttribute('content', this.title);
        label.setAttribute('textAlign', this.textAlign);

        label.setAttribute('textColor', this.textColor);
        label.setAttribute('textSize', this.textSize);
        label.setAttribute('textDecoration', this.textDecoration);

        return label;
    }
    return this;
}

export default function LabelTransform(control) {
    return transform.call(control);
}