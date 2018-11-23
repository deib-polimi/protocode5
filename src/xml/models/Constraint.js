import { CONSTRAINT } from "../XmlNames";
import UiPhoneControlTransform from "./UiPhoneControl";

function transform(control) {    
    this._control = control;
    this.toXml = xmlDoc => {
        let refElement = this._control._viewController.controls.find(c => c.id === this.refId) || null;
        var constraint = xmlDoc.createElement(CONSTRAINT);
        constraint.setAttribute('id', this.id);
        constraint.setAttribute('uiPhoneControl', this._control.getRefPath(''));
        constraint.setAttribute('layoutEdge', this.side);
        constraint.setAttribute('withParent', this.refId === null);
        if(this.refId !== null) {
            constraint.setAttribute('referenceElement', UiPhoneControlTransform(control._viewController, control._controlChain, refElement).getRefPath(''));
        }
        constraint.setAttribute('referenceLayoutEdge', this.refId !== null ? this.refSide : this.side);

        return constraint;
    }
    return this;
}

export default function ConstraintTransform(uiPhoneControl, raw) {
    return transform.call(raw, uiPhoneControl);
}