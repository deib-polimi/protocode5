import { MENU, MENU_ITEM } from "../XmlNames";
import NavigationTransform from "./Navigation";

function itemTransform(application) {
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(MENU_ITEM);

        elem.setAttribute('title', this.title);
        elem.setAttribute('id', this.id);

        var navigation = this.navigation;

        if (navigation) {
            elem.appendChild(NavigationTransform(null, application, navigation).toXml(xmlDoc));
        }

        return elem;
    }
    return this;
}

function transform(application, items) {
    this._application = application;
    this._items = items;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(MENU);

        this._items.forEach(item => {

            elem.appendChild(itemTransform.call(item, this._application).toXml(xmlDoc));
        });

        return elem;
    }
    return this;
}

export default function MenuTransform(application, menu) {
    return transform.call({}, application, menu);
}