import { GRID_VIEW_CELL } from "../../XmlNames";

function transform() {
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(GRID_VIEW_CELL);

        elem.setAttribute('title', this.title);

        return elem;
    }
    return this;
}

export default function GridViewCellTransform(control, raw) {
    return transform.call(raw, control);
}