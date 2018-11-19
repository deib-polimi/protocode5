import { GRID_VIEW } from "../../XmlNames";
import NavigationTransform from "../Navigation";
import GridViewCellTransform from "./GridViewCell";

function transform() {
    this.xmlName = GRID_VIEW;
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, elem);

        elem.setAttribute('gridType', this.gridType);
		
		if (this.navigations) {
			this.navigations.forEach(nav => {
				elem.appendChild(NavigationTransform(this, nav).toXml(xmlDoc));
			});
		}

        this.gridViewCells.forEach(item => {
            elem.appendChild(GridViewCellTransform(this, item).toXml(xmlDoc));
        });

        return elem;
    }
    return this;
}

export default function GridViewTransform(control) {
    return transform.call(control);
}