import { LIST_VIEW_CELL } from "../../XmlNames";

function transform() {
    this.toXml = xmlDoc => {
        var elem = xmlDoc.createElement(LIST_VIEW_CELL);

        elem.setAttribute('title', this.title);
        elem.setAttribute('subtitle', this.subtitle);

        return elem;
    }
    return this;
}

export default function ListViewCellTransform(listView, raw) {
    return transform.call(raw, listView);
}