import { MODEL_CONNECTOR } from "../XmlNames";
import AdapterBindingTransform from "./AdapterBinding";

function transform(control) {
    this._uiPhoneControl = control;
    this.toXml = xmldoc => {
        let elem = xmldoc.createElement(MODEL_CONNECTOR);

        elem.setAttribute('id', this.id);
        if (this.adapter) {
            elem.setAttribute('adapter', AdapterBindingTransform(this.scene, this.adapter).getRefPath());
        }
        let kp = this.keypath;
        if (kp.startsWith('.')) kp = kp.substr(1);
        elem.setAttribute('keypath', kp);
        elem.setAttribute('property', this.property);

        return elem;
    }
    return this;
}

export default function ModelConnectorTransform(uiPhoneControl, rawConnector) {
    return transform.call(rawConnector, uiPhoneControl);
}