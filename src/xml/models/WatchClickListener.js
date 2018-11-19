import { WATCH_CLICK_LISTENER, WATCH_NAVIGATION } from "../XmlNames";

function transform() {
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(WATCH_CLICK_LISTENER);
        let inner = xmlDoc.createElement(WATCH_NAVIGATION);
        if (this.destinationId) inner.setAttribute('destination', this.destinationId);
        elem.appendChild(inner);
        return elem;
    }
}

export default function WatchClickListenerTransform(control, raw) {
    return transform.call(raw, control);
}