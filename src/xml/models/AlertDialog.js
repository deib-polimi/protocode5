import { ALERT_DIALOG } from "../XmlNames";

function transform(viewController) {
    this._viewController = viewController;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(ALERT_DIALOG);

        elem.setAttribute('id', this.name);
        elem.setAttribute('title', this.title);
        elem.setAttribute('message', this.message);

        return elem;
    }
    return this;
}

export default function AlertDialogTransform(viewController, raw) {
    return transform.call(raw, viewController);
}