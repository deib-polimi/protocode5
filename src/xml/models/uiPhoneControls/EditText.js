import { EDIT_TEXT } from "../../XmlNames";

function transform() {
    this.xmlName = EDIT_TEXT;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        elem.setAttribute('initialContent', this.title);
        elem.setAttribute('placeholder', this.placeholder);

        elem.setAttribute('textColor', this.textColor);
        elem.setAttribute('textSize', this.textSize);

        return elem;
    }
    return this;
}

export default function EditTextTransform(control) {
    return transform.call(control);
}