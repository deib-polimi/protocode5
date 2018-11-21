import { DATA_HANDLER } from "../XmlNames";
import DefaultPreferencesTransform from "./DefaultPreferences";
import FileStorageTransform from "./FileStorage";
import CloudDatabaseTransform from "./CloudDatabase";
import SqlDatabaseTransform from "./SqlDatabase";

function transform(preferenceRecords, fileStorageRecords, entities, cloudObjects) {
    this.toXml = xmlDoc => {
        let dataHandler = xmlDoc.createElement(DATA_HANDLER);

        if (this.preferences) {
            dataHandler.appendChild(DefaultPreferencesTransform(preferenceRecords).toXml(xmlDoc));
        }

        if (this.database) {
            dataHandler.appendChild(SqlDatabaseTransform(entities).toXml(xmlDoc));
        }

        if (this.cloud) {
            dataHandler.appendChild(CloudDatabaseTransform(cloudObjects).toXml(xmlDoc));
        }

        if (this.files) {
            dataHandler.appendChild(FileStorageTransform(fileStorageRecords).toXml(xmlDoc));
        }

        return dataHandler;
    }
    return this;
}

export default function TransformDataHandler(dataHandlers, preferenceRecords, fileStorageRecords, entities, cloudObjects) {
    return transform.call(dataHandlers, preferenceRecords, fileStorageRecords, entities, cloudObjects);
}