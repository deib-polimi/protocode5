import { WATCH_BUTTON } from "../../XmlNames";
import WatchClickListenerTransform from "../WatchClickListener";

function transform() {
    this.xmlName = WATCH_BUTTON;
    this.toXml = xmlDoc => {
        var button = xmlDoc.createElement(this.xmlName);
        this.decorateXml(button);
        button.setAttribute('title', this.title);

        var watchClickListener = this.watchClickListener;

        if (watchClickListener) {
            button.appendChild(WatchClickListenerTransform(this, watchClickListener).toXml(xmlDoc));
        }

        return button;
    }
    return this;
}

export default function ButtonTransform(control) {
    return transform.call(control);
}