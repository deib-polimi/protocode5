import { AUDIO_RECORDER } from "../../XmlNames";

function transform() {
    this.xmlName = AUDIO_RECORDER;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        if (this.audioPlayerId !== null) {
            elem.setAttribute('audioPlayerId', this.audioPlayerId);
        }

        return elem;
    }
    this.getRefPath = () => {
        var updatedPath = '/@' + this.xmlName;
        updatedPath = this._viewController.getRefPath(updatedPath);
        return updatedPath;
    }
    return this;
}

export default function AudioRecorderTransform(control) {
    return transform.call(control);
}