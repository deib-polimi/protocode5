import { WATCH_VOICE } from "../../XmlNames";

function transform() {
    this.xmlName = WATCH_VOICE;
    this.toXml = xmlDoc => {
        var vmessage = xmlDoc.createElement(this.xmlName);
        this.decorateXml(vmessage);
        vmessage.setAttribute('title', this.title);
        return vmessage;
    }
    this.getRefPath = () => {
        var updatedPath = '/@' + this.xmlName;
        updatedPath = this._watchController.getRefPath(updatedPath);
        return updatedPath;
    }
    return this;
}

export default function VoiceTransform(control) {
    return transform.call(control);
}