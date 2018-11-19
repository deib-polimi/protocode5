import { CONTROL_CHAIN } from "../XmlNames";
import { CONTROL_CHAIN_TYPE_PACKED, CONTROL_CHAIN_TYPE_WEIGHTED } from "../../Constants";

function transform(viewController) {
    this.xmlName = CONTROL_CHAIN;
    this._viewController = viewController;
    this._members = viewController.controls.filter(c => c.controlChainId === this.id);
    this._members.sort((a, b) => a.controlChainPosition - b.controlChainPosition);

    this.toXml = xmlDoc => {
        var chain = xmlDoc.createElement(this.xmlName);
        chain.setAttribute('id', this.id);
        chain.setAttribute('viewController', this._viewController.getRefPath(''));
        chain.setAttribute('axis', this.axis);
        chain.setAttribute('type', this.type);
        chain.setAttribute('nControls', this._members.length);
        if(this.type === CONTROL_CHAIN_TYPE_PACKED) {
            chain.setAttribute('bias', this.bias);
        }
        if(this.type === CONTROL_CHAIN_TYPE_PACKED || this.type === CONTROL_CHAIN_TYPE_WEIGHTED) {
            chain.setAttribute('spacing', this.spacing);
        }
        return chain;
    }
    this.getRefPath = path => {
        var updatedPath = '/@' + this.xmlName + '[id=\'' + this.id + '\']' + path;
        updatedPath = this._viewController.getRefPath(updatedPath);
        return updatedPath;
    }
    this.getIndex = member => {
        return this._members.findIndex(control => control.id === member.id) || -1;
    }
    this.getPrecedentControl = member => {
        let idx = this.getIndex(member);
        if (idx > 0) {
            return this._members[idx - 1];
        } else {
            return null;
        }
    }
    this.getFollowingControl = member => {
        let idx = this.getIndex(member);
        if (idx < this._members.length - 1) {
            return this._members[idx + 1];
        } else {
            return null;
        }
    }
}

export default function ControlChainTransform(viewController, raw) {
    return transform.call(raw, viewController);
}