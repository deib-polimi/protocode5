import { SOURCE_TYPE } from "../XmlNames";
import { SOURCE_TYPE_HARDWARE } from "../../Constants";

function transform() {
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(SOURCE_TYPE);

        elem.setAttribute('sourceType', this.type);

        if (this.type === SOURCE_TYPE_HARDWARE) {
            elem.setAttribute('fileUri', '');
        } else {
            elem.setAttribute('fileUri', this.fileUri);
        }

        return elem;
    }
    return this;
}

export default function SourceTypeTransform(uiPhoneControl, raw) {
    return transform.call(raw, uiPhoneControl);
}