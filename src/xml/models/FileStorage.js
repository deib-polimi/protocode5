import { STORAGE_RECORD, STORAGE_HANDLER } from "../XmlNames";

function itemTransform() {
    this.toXml = xmlDoc => {
        let record = xmlDoc.createElement(STORAGE_RECORD);

        record.setAttribute('name', this.name);
        record.setAttribute('extension', this.extension);
        record.setAttribute('tempFile', this.isTemp);

        return record;
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

export default function FileStorageTransform(files) {
    return transform.call({ files });
}
