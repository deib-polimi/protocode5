import { ASYNC_TASK } from '../XmlNames';

function transform(viewController) {
    this._viewController = viewController;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(ASYNC_TASK);

        elem.setAttribute('name', this.name);

        return elem;
    }
    return this;
}

export default function AsyncTaskTransform(viewController, raw) {
    return transform.call(raw, viewController);
}