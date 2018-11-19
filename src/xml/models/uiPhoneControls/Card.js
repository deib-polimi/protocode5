import { CARD } from "../../XmlNames";

function transform() {
    this.xmlName = CARD;
    this.toXml = xmlDoc => {
        var card = xmlDoc.createElement(this.xmlName);
        this.decorateXml(xmlDoc, card);
        card.setAttribute('title', this.title);
        card.setAttribute('subtitle', this.subtitle);
        card.setAttribute('numActions', this.numActions);
        return card;
    }
    return this;
}

export default function CardTransform(control) {
    return transform.call(control);
}