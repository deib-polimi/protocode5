import { STORAGE_RECORD, STORAGE_HANDLER, DATA_HANDLER } from "../XmlNames";

function itemTransform() {
    this.toXml = xmlDoc => {
        let record = xmlDoc.createElement(STORAGE_RECORD);

        record.setAttribute('name', this.name);
        record.setAttribute('extension', this.extension);
        record.setAttribute('tempFile', this.isTemp);

        return record;
    }
    this.getRefPath = () => {
        return `//@${DATA_HANDLER}/@${STORAGE_HANDLER}/@${STORAGE_RECORD}[name='${this.name}']`;
    }
    return this;
}

function transform() {
    this.toXml = xmlDoc => {
        let storageHandler = xmlDoc.createElement(STORAGE_HANDLER);

        this.files.forEach(file => {
            storageHandler.appendChild(itemTransform.call(file).toXml(xmlDoc));
        });

        return storageHandler;
    }
    return this;
}

export function FileStorageRecordTransform(file) {
    return itemTransform.call(file);
}

export default function FileStorageTransform(files) {
    return transform.call({ files });
}
