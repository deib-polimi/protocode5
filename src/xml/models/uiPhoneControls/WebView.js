import { WEBVIEW } from "../../XmlNames";

function transform() {
    this.xmlName = WEBVIEW;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        elem.setAttribute('HTMLFileName', this.htmlFileName);

        return elem;
    }
    return this;
}

export default function WebViewTransform(control) {
    return transform.call(control);
}