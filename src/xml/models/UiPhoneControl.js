import { CONSTRAINT_VALID, CONTROL_CHAIN_TYPE_WEIGHTED, MEASURE_MODE_AUTO, MEASURE_MODE_EXACT, MEASURE_MODE_PERCENT, UI_PHONE_CONTROL_LABEL, UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_AUDIO_RECORDER, UI_PHONE_CONTROL_BUTTON, UI_PHONE_CONTROL_CARD, UI_PHONE_CONTROL_CONTAINER, UI_PHONE_CONTROL_DATEPICKER, UI_PHONE_CONTROL_TEXTEDIT, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_CONTROL_LIST_VIEW, UI_PHONE_CONTROL_MAP, UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, UI_PHONE_CONTROL_SLIDER, UI_PHONE_CONTROL_SPINNER, UI_PHONE_CONTROL_SWITCH, UI_PHONE_CONTROL_TIMEPICKER, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_WEBVIEW } from "../../Constants";
import ConstraintTransform from "./Constraint";
import LabelTransform from "./uiPhoneControls/Label";
import AudioPlayerTransform from "./uiPhoneControls/AudioPlayer";
import AudioRecorderTransform from "./uiPhoneControls/AudioRecorder";
import ButtonTransform from "./uiPhoneControls/Button";
import CardTransform from "./uiPhoneControls/Card";
import ContainerTransform from "./uiPhoneControls/Container";
import DatepickerTransform from "./uiPhoneControls/DatePicker";
import EditTextTransform from "./uiPhoneControls/EditText";
import GridViewTransform from "./uiPhoneControls/GridView";
import ListViewTransform from "./uiPhoneControls/ListView";
import MapTransform from "./uiPhoneControls/Map";
import PhotocameraControllerTransform from "./uiPhoneControls/PhotocameraController";
import SliderTransform from "./uiPhoneControls/Slider";
import SpinnerTransform from "./uiPhoneControls/Spinner";
import SwitchTransform from "./uiPhoneControls/Switch";
import TimePickerTransform from "./uiPhoneControls/TimePicker";
import VideoViewTransform from "./uiPhoneControls/VideoView";
import VideocameraControllerTransform from "./uiPhoneControls/VideocameraController";
import ImageViewTransform from "./uiPhoneControls/ImageView";
import WebViewTransform from "./uiPhoneControls/WebView";

function transform(viewController, controlChain) {
    this._viewController = viewController;
    this._controlChain = controlChain;
    this.decorateXml = (xmlDoc, xmlElem) => {
        xmlElem.setAttribute('id', this.id);

        if (this._viewController) {
            xmlElem.setAttribute('viewController', this._viewController.getRefPath(''));
        }

        xmlElem.setAttribute('defaultWidth', this.defaultWidth || 0);
        xmlElem.setAttribute('defaultHeight', this.defaultHeight || 0);

        xmlElem.setAttribute('posX', this.posX);
        xmlElem.setAttribute('posY', this.posY);

        if (this._controlChain) {
            var controlChain = this._controlChain;
            xmlElem.setAttribute('controlChain', controlChain.getRefPath(''));
            xmlElem.setAttribute('indexInChain', controlChain.getIndex(this));
            let prev = controlChain.getPrecedentControl(this);
            let next = controlChain.getFollowingControl(this);
            if (prev) {
                xmlElem.setAttribute('precedentInChain', prev.getRefPath(''));
            }
            if (next) {
                xmlElem.setAttribute('followingInChain', next.getRefPath(''));
            }
            if (controlChain.type === CONTROL_CHAIN_TYPE_WEIGHTED) {
                xmlElem.setAttribute('weight', this.controlChainWeight);
            }
        }

        xmlElem.setAttribute('paddingTop', this.paddingTop);
        xmlElem.setAttribute('paddingBottom', this.paddingBottom);
        xmlElem.setAttribute('paddingStart', this.paddingLeft);
        xmlElem.setAttribute('paddingEnd', this.paddingRight);

        xmlElem.setAttribute('marginTop', this.marginTop);
        xmlElem.setAttribute('marginBottom', this.marginBottom);
        xmlElem.setAttribute('marginStart', this.marginLeft);
        xmlElem.setAttribute('marginEnd', this.marginRight);

        var constraints = this.constraints.filter(c => c.valid === CONSTRAINT_VALID);
        if (constraints.length > 0 || this.widthMode !== MEASURE_MODE_AUTO || this.heightMode !== MEASURE_MODE_AUTO || this.ratioMode !== MEASURE_MODE_AUTO) {
            var dimensionConstraints = xmlDoc.createElement('dimensionConstraint');
            var mustExportDimensionConstraints = false;

            dimensionConstraints.setAttribute('uiPhoneControl', this.getRefPath(''));

            if (this.widthMode === MEASURE_MODE_EXACT) {
                dimensionConstraints.setAttribute('fixedWidth', this.width);
                mustExportDimensionConstraints = true;
            }
            if (this.heightMode === MEASURE_MODE_EXACT) {
                dimensionConstraints.setAttribute('fixedHeight', this.height);
                mustExportDimensionConstraints = true;
            }
            if (this.ratioMode === MEASURE_MODE_EXACT) {
                dimensionConstraints.setAttribute('fixedRatio', this.ratioWidth + ':' + this.ratioHeight);
                mustExportDimensionConstraints = true;
            }
            if (this.widthMode === MEASURE_MODE_PERCENT) {
                dimensionConstraints.setAttribute('widthPercent', this.width);
                mustExportDimensionConstraints = true;
            }
            if (this.heightMode === MEASURE_MODE_PERCENT) {
                dimensionConstraints.setAttribute('heightPercent', this.height);
                mustExportDimensionConstraints = true;
            }
            if (mustExportDimensionConstraints) {
                xmlElem.appendChild(dimensionConstraints);
            }

            constraints.forEach(constraint => {
                xmlElem.appendChild(ConstraintTransform(this, constraint).toXml(xmlDoc));
            });
        }

        return xmlElem;
    }
    this.getRefPath = path => {
        if (!this.xmlName) throw new Error(`XML name not defined for ${this.uiPhoneControlType}`)
        var updatedPath = '/@' + this.xmlName + '[id=\'' + this.id + '\']' + path;
        updatedPath = this._viewController.getRefPath(updatedPath);
        return updatedPath;
    }
    // ABSTRACT - the error is just a cross-check to ensure to implement abstract methods
    this.toXml = () => {
        throw new Error(`toXml not implemented for ${this.uiPhoneControlType}`);
    }
    return this;
}

export default function UiPhoneControlTransform(viewController, controlChain, raw) {
    let control = transform.call(raw, viewController, controlChain);
    console.log(UI_PHONE_CONTROL_BUTTON);
    switch (control.uiPhoneControlType) {
        case UI_PHONE_CONTROL_AUDIO_PLAYER: return AudioPlayerTransform(control);
        case UI_PHONE_CONTROL_AUDIO_RECORDER: return AudioRecorderTransform(control);
        case UI_PHONE_CONTROL_BUTTON: return ButtonTransform(control);
        case UI_PHONE_CONTROL_CARD: return CardTransform(control);
        case UI_PHONE_CONTROL_CONTAINER: return ContainerTransform(control);
        case UI_PHONE_CONTROL_DATEPICKER: return DatepickerTransform(control);
        case UI_PHONE_CONTROL_TEXTEDIT: return EditTextTransform(control);
        case UI_PHONE_CONTROL_GRID_VIEW: return GridViewTransform(control);
        case UI_PHONE_CONTROL_IMAGE_VIEW: return ImageViewTransform(control);
        case UI_PHONE_CONTROL_LABEL: return LabelTransform(control);
        case UI_PHONE_CONTROL_LIST_VIEW: return ListViewTransform(control);
        case UI_PHONE_CONTROL_MAP: return MapTransform(control);
        case UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER: return PhotocameraControllerTransform(control);
        case UI_PHONE_CONTROL_SLIDER: return SliderTransform(control);
        case UI_PHONE_CONTROL_SPINNER: return SpinnerTransform(control);
        case UI_PHONE_CONTROL_SWITCH: return SwitchTransform(control);
        case UI_PHONE_CONTROL_TIMEPICKER: return TimePickerTransform(control);
        case UI_PHONE_CONTROL_VIDEO_VIEW: return VideoViewTransform(control);
        case UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER: return VideocameraControllerTransform(control);
        case UI_PHONE_CONTROL_WEBVIEW: return WebViewTransform(control);
        default: return control;
    }
}