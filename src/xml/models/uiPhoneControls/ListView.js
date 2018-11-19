import { LIST_VIEW } from "../../XmlNames";
import NavigationTransform from "../Navigation";
import ListViewCellTransform from "./ListViewCell";

function transform() {
    this.xmlName = LIST_VIEW;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        elem.setAttribute('backgroundColor', this.backgroundColor);
        elem.setAttribute('listType', this.listType);

        var navigations = this.navigations;
        navigations.forEach(nav => {
            elem.appendChild(NavigationTransform(this, nav).toXml(xmlDoc));
        });

        this.listViewCells.forEach(item => {
            elem.appendChild(ListViewCellTransform(this, item).toXml(xmlDoc));
        });

        return elem;
    }
    return this;
}

export default function ListViewTransform(control) {
    return transform.call(control);
}