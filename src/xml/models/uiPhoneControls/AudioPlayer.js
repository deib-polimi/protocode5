import { AUDIO_PLAYER } from "../../XmlNames";
import SourceTypeTransform from "../SourceType";

function transform() {
    this.xmlName = AUDIO_PLAYER;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        var sourceType = this.sourceType;

        if (sourceType) {
            var sourceTypeAttrs = SourceTypeTransform(this, sourceType).toXml(xmlDoc).attributes;

            for (var i = 0; i < sourceTypeAttrs.length; i++) {
                var attr = sourceTypeAttrs[i];
                elem.setAttribute(attr.name, attr.value);
            }
        }
        return elem;
    }
    return this;
}

export default function AudioPlayerTransform(control) {
    return transform.call(control);
}