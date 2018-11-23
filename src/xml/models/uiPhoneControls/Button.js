import { BUTTON } from "../../XmlNames";
import NavigationTransform from "../Navigation";

function transform() {
    this.xmlName = BUTTON;
    this.toXml = xmlDoc => {
        var button = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, button);
        button.setAttribute('title', this.title);

        button.setAttribute('textColor', this.textColor);
        button.setAttribute('backgroundColor', this.backgroundColor);
        button.setAttribute('borderRadius', this.borderRadius);
        button.setAttribute('clickColor', this.clickColor);

        var navigations = this.navigations;
        navigations.forEach(nav => {
            button.appendChild(NavigationTransform(this, this._viewController._application, nav).toXml(xmlDoc));
        });

        return button;
    }
    return this;
}

export default function ButtonTransform(control) {
    return transform.call(control);
}