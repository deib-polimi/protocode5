import { PROGRESS_DIALOG } from "../XmlNames";

function transform(viewController) {
    this._viewController = viewController;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(PROGRESS_DIALOG);

        elem.setAttribute('id', this.name);
        elem.setAttribute('title', this.title);
        elem.setAttribute('message', this.message);
        elem.setAttribute('spinner', this.spinner);

        return elem;
    }
    return this;
}

export default function ProgressDialogTransform(viewController, raw) {
    return transform.call(raw, viewController);
}