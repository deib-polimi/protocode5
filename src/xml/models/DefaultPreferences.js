import { PREFERENCE_RECORD, PREFERENCE_HANDLER, DATA_HANDLER } from "../XmlNames";

function itemTransform() {
    this.toXml = xmlDoc => {
        let record = xmlDoc.createElement(PREFERENCE_RECORD);

        record.setAttribute('key', this.key);
        record.setAttribute('value', this.value);
        record.setAttribute('type', this.type);

        return record;
    }
    this.getRefPath = () => {
        return `//@${DATA_HANDLER}/@${PREFERENCE_HANDLER}/@${PREFERENCE_RECORD}[key='${this.key}']`;
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

export function DefaultPreferenceRecordTransform(prefRecord) {
    return itemTransform.call(prefRecord);
}

export default function DefaultPreferencesTransform(defaultPreferences) {
    return transform.call({ entries: defaultPreferences});
}