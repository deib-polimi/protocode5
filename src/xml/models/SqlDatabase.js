import { DATABASE_HANDLER, DATABASE_ENTITY, DATABASE_ATTRIBUTE, DATABASE_RELATION } from "../XmlNames";

function attributeTransform() {
    this.toXml = xmlDoc => {
        let entityAttribute = xmlDoc.createElement(DATABASE_ATTRIBUTE);

        entityAttribute.setAttribute('name', this.name);
        entityAttribute.setAttribute('type', this.type);

        return entityAttribute;
    }
    return this;
}

function relationTransform() {
    this.toXml = xmlDoc => {
        let entityRelation = xmlDoc.createElement(DATABASE_RELATION);

        entityRelation.setAttribute('name', this.name);
        entityRelation.setAttribute('destination', this.toEntityId);
        entityRelation.setAttribute('type', this.cardinality);

        return entityRelation;
    }
    return this;
}

function entityTransform() {
    this.toXml = xmlDoc => {
        let entity = xmlDoc.createElement(DATABASE_ENTITY);

        entity.setAttribute('name', this.name);

        entity.setAttribute('primaryKey', this.primaryKey);

        this.attributes.forEach(attr => {
            entity.appendChild(attributeTransform.call(attr).toXml(xmlDoc));
        });

        this.relations.forEach(rel => {
            entity.appendChild(relationTransform.call(rel).toXml(xmlDoc));
        });

        return entity;
    }
    return this;
}

function transform() {
    this.toXml = xmlDoc => {
        let dbHandler = xmlDoc.createElement(DATABASE_HANDLER);

        this.entities.forEach(entity => {
            dbHandler.appendChild(entityTransform.call(entity).toXml(xmlDoc));
        });

        return dbHandler;
    }
    return this;
}

export default function SqlDatabaseTransform(entities) {
    return transform.call({ entities });
}