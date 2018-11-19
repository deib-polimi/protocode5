import { WATCH_LABEL } from "../../XmlNames";

function transform() {
    this.xmlName = WATCH_LABEL;
    this.toXml = xmlDoc => {
        var label = xmlDoc.createElement(this.xmlName);
        this.decorateXml(label);
        label.setAttribute('content', this.title);
        label.setAttribute('textAlign', this.textAlign);
        label.setAttribute('textDecoration', this.textDecoration);

        return label;
    }
    return this;
}

export default function LabelTransform(control) {
    return transform.call(control);
}