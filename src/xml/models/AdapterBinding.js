import { FILESTORAGE, ENTITY, CLOUD_OBJECT, PREFERENCE } from "../../Constants";
import { ADAPTER_BINDING, SCENE } from "../XmlNames";
import { FileStorageRecordTransform } from "./FileStorage";
import { DefaultPreferenceRecordTransform } from "./DefaultPreferences";
import { CloudObjectTransform } from "./CloudDatabase";
import { EntityTransform } from "./SqlDatabase";

function transform(scene) {
    this._scene = scene;
    this.toXml = xmldoc => {
        let elem = xmldoc.createElement(ADAPTER_BINDING);

        elem.setAttribute('scene', this._scene.getRefPath())
        elem.setAttribute('type', this.adapterClass);
        switch(this.adapterClass) {
            case FILESTORAGE:
                elem.setAttribute('file', FileStorageRecordTransform(this.file).getRefPath()); break;
            case ENTITY:
                elem.setAttribute('entity', EntityTransform(this.entity).getRefPath()); break;
            case PREFERENCE:
                elem.setAttribute('preference', DefaultPreferenceRecordTransform(this.preference).getRefPath()); break;
            case CLOUD_OBJECT:
                elem.setAttribute('object', CloudObjectTransform(this.cloudObject).getRefPath()); break;
            default: 
                break;
        }
        elem.setAttribute('isList', this.isList);
        elem.setAttribute('id', this.id);
        elem.setAttribute('name', this.name);

        return elem;
    }
    this.getRefPath = () => {
        return `//@${SCENE}[id='${this.sceneId}']/@${ADAPTER_BINDING}[id='${this.id}']`;
    }
    return this;
}

export default function AdapterBindingTransform(scene, rawAdapterBinding) {
    return transform.call(rawAdapterBinding, scene);
}