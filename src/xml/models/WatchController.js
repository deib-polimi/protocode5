import { WATCH_CONTROLLER } from "../XmlNames";
import UiWatchControlTransform from "./UiWatchControl";

function transform(application) {
    this._application = application;
    this.xmlName = WATCH_CONTROLLER;
    this.toXml = xmlDoc => {
        var watchController = xmlDoc.createElement(this.xmlName);
        watchController.setAttribute('name', this.name);
        watchController.setAttribute('launcher', this.launcher);

        this.controls.forEach(c => {
            watchController.appendChild(UiWatchControlTransform(this, c).toXml(xmlDoc));
        });

        return watchController;
    }
    this.getRefPath = path => {
        return '//@' + this.xmlName + '[name=\'' + this.name + '\']' + path;
    }
    return this;
}

export default function WatchControllerTransform(application, raw) {
    return transform.call(raw, application);
}