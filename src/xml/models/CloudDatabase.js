import { CLOUD_HANDLER, CLOUD_OBJECT, CLOUD_ATTRIBUTE } from "../XmlNames";
import { TYPE_REF, TYPE_REF_LIST } from "../../Constants";

function attributeTransform() {
    this.toXml = xmlDoc => {
        let objAttribute = xmlDoc.createElement(CLOUD_ATTRIBUTE);

        objAttribute.setAttribute('name', this.name);
        objAttribute.setAttribute('type', this.type);

        if (this.type === TYPE_REF || this.type === TYPE_REF_LIST) {
            objAttribute.setAttribute('object', this.object);
        }

        return objAttribute;
    }
    return this;
}

function objectTransform() {
    this.toXml = xmlDoc => {
        let cloudObject = xmlDoc.createElement(CLOUD_OBJECT);

        cloudObject.setAttribute('name', this.name);

        this.attributes.forEach(attr => {
            cloudObject.appendChild(attributeTransform.call(attr).toXml(xmlDoc));
        });

        return cloudObject;
    }
    return this;
}

function transform() {
    this.toXml = xmlDoc => {
        let cloudHandler = xmlDoc.createElement(CLOUD_HANDLER);

        this.objects.forEach(obj => {
            cloudHandler.appendChild(objectTransform.call(obj).toXml(xmlDoc));
        });

        return cloudHandler;
    }
    return this;
}

export default function CloudDatabaseTransform(objects) {
    return transform.call({ objects });
}