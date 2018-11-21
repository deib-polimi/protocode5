import { PREFERENCE_RECORD, PREFERENCE_HANDLER } from "../XmlNames";

function itemTransform() {
    this.toXml = xmlDoc => {
        let record = xmlDoc.createElement(PREFERENCE_RECORD);

        record.setAttribute('key', this.key);
        record.setAttribute('value', this.value);
        record.setAttribute('type', this.type);

        return record;
    }
    return this;
}

function transform() {
    this.toXml = xmlDoc => {
        let elem = xmlDoc.createElement(PREFERENCE_HANDLER);

        this.entries.forEach(entry => {
            elem.appendChild(itemTransform.call(entry).toXml(xmlDoc));
        });

        return elem;
    }
    return this;
}

export default function DefaultPreferencesTransform(defaultPreferences) {
    return transform.call({ entries: defaultPreferences});
}