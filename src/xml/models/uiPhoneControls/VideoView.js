import { VIDEOVIEW } from "../../XmlNames";
import SourceTypeTransform from "../SourceType";

function transform() {
    this.xmlName = VIDEOVIEW;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        if (this.sourceType) {
            var sourceTypeAttrs = SourceTypeTransform(this, this.sourceType).toXml(xmlDoc).attributes;

            for (var i = 0; i < sourceTypeAttrs.length; i++) {
                var attr = sourceTypeAttrs[i];
                elem.setAttribute(attr.name, attr.value);
            }
        }

        return elem;
    }
    return this;
}

export default function VideoViewTransform(control) {
    return transform.call(control);
}