import { WATCH_LABEL, WATCH_SLIDER, WATCH_SWITCH, WATCH_VOICE, WATCH_BUTTON } from "../../Constants";
import LabelTransform from "./uiWatchControls/Label";
import VoiceTransform from "./uiWatchControls/Voice";
import ButtonTransform from "./uiWatchControls/Button";
import SliderTransform from "./uiWatchControls/Slider";
import SwitchTransform from "./uiWatchControls/Switch";

function transform(watchController) {
    this._watchController = watchController;
    this.idx = this._watchController.controls.findIndex(c => c.id === this.id);
    this.decorateXml = xmlElem => {
        xmlElem.setAttribute('id', this.name);

        xmlElem.setAttribute('order', this.idx);

        xmlElem.setAttribute('posX', 0);
        xmlElem.setAttribute('posY', 0);

        xmlElem.setAttribute('width', 125);
        xmlElem.setAttribute('height', this.height);

        xmlElem.setAttribute('paddingTop', 0);
        xmlElem.setAttribute('paddingBottom', 0);
        xmlElem.setAttribute('paddingStart', 0);
        xmlElem.setAttribute('paddingEnd', 0);

        xmlElem.setAttribute('marginTop', 0);
        xmlElem.setAttribute('marginBottom', 0);
        xmlElem.setAttribute('marginStart', 0);
        xmlElem.setAttribute('marginEnd', 0);

        xmlElem.setAttribute('alignParentTop', false);
        xmlElem.setAttribute('alignParentBottom', false);
        xmlElem.setAttribute('alignParentStart', true);
        xmlElem.setAttribute('alignParentEnd', true);

        xmlElem.setAttribute('watchController', this._watchController.getRefPath(''));

        return xmlElem;
    }
    this.getRefPath = path => {
        var updatedPath = '/@' + this.xmlName + '[id=\'' + this.id + '\']';
        updatedPath = this._watchController.getRefPath(updatedPath);
        return updatedPath;
    }
    // ABSTRACT - the error is just a cross-check to ensure to implement abstract methods
    this.toXml = () => {
        throw new Error(`toXml not implemented for ${this.watchControlType}`);
    }
    return this;
}

export default function UiWatchControlTransform(watchController, raw) {
    let control = transform.call(raw, watchController);
    switch (control.watchControlType) {
        case WATCH_LABEL: return LabelTransform(control);
        case WATCH_SLIDER: return SliderTransform(control);
        case WATCH_SWITCH: return SwitchTransform(control);
        case WATCH_VOICE: return VoiceTransform(control);
        case WATCH_BUTTON: return ButtonTransform(control);
        default: return control;
    }
}