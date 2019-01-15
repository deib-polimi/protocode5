import { CLOUD_HANDLER, CLOUD_OBJECT, CLOUD_ATTRIBUTE, DATA_HANDLER } from "../XmlNames";
import { TYPE_REF, TYPE_REF_LIST } from "../../Constants";

function attributeTransform(cloudHandler) {
    this.toXml = xmlDoc => {
        let objAttribute = xmlDoc.createElement(CLOUD_ATTRIBUTE);

        objAttribute.setAttribute('name', this.name);
        objAttribute.setAttribute('type', this.type);

        if (this.type === TYPE_REF || this.type === TYPE_REF_LIST) {
            objAttribute.setAttribute('object', cloudHandler.objects.find(o => o.id === this.object).name);
        }

        return objAttribute;
    }
    return this;
}

function objectTransform(cloudHandler) {
    this.toXml = xmlDoc => {
        let cloudObject = xmlDoc.createElement(CLOUD_OBJECT);

        cloudObject.setAttribute('name', this.name);

        this.attributes.forEach(attr => {
            cloudObject.appendChild(attributeTransform.call(attr, cloudHandler).toXml(xmlDoc));
        });

        return cloudObject;
    }
    this.getRefPath = () => {
        return `//@${DATA_HANDLER}/@${CLOUD_HANDLER}/@${CLOUD_OBJECT}[name='${this.name}']`;
    }
    return this;
}

function transform() {
    this.toXml = xmlDoc => {
        let cloudHandler = xmlDoc.createElement(CLOUD_HANDLER);

        this.objects.forEach(obj => {
            cloudHandler.appendChild(objectTransform.call(obj, this).toXml(xmlDoc));
        });

        return cloudHandler;
    }
    return this;
}

export function CloudObjectTransform(object) {
    return objectTransform.call(object);
}

export default function CloudDatabaseTransform(objects) {
    return transform.call({ objects });
}