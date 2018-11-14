import React from 'react';
import { withConstraints } from '../ConstraintLayout';
import uiPhoneControlLabel from './Label';
import { Route } from 'react-router';
import { SIDE_TOP, SIDE_CENTER_X, SIDE_CENTER_Y, SIDE_START, SIDE_END, SIDE_BOTTOM, CONSTRAINT_VALID, UI_PHONE_CONTROL_BUTTON, UI_PHONE_CONTROL_LABEL, UI_PHONE_CONTROL_TEXTEDIT, UI_PHONE_CONTROL_SPINNER, UI_PHONE_CONTROL_SWITCH, UI_PHONE_CONTROL_SLIDER, UI_PHONE_CONTROL_WEBVIEW, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, UI_PHONE_CONTROL_AUDIO_RECORDER, UI_PHONE_CONTROL_DATEPICKER, UI_PHONE_CONTROL_TIMEPICKER, UI_PHONE_CONTROL_LIST_VIEW, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_CONTROL_MAP, UI_PHONE_CONTROL_CARD, CONTROL_CHAIN_TYPE_WEIGHTED, CONTROL_CHAIN_TYPE_PACKED, UI_PHONE_CONTROL_CONTAINER, SCENE_MULTI_VC } from '../../../../../Constants';
import uiPhoneControlButton from './Button';
import uiPhoneControlTextEdit from './TextEdit';
import uiPhoneControlSpinner from './Spinner';
import uiPhoneControlSwitch from './Switch';
import uiPhoneControlSlider from './Slider';
import uiPhoneControlWebview from './WebView';
import uiPhoneControlImageView from './ImageView';
import uiPhoneControlVideoView from './VideoView';
import uiPhoneControlAudioPlayer from './AudioPlayer';
import uiPhoneControlPhotocameraController from './PhotocameraController';
import uiPhoneControlVideocameraController from './VideocameraController';
import uiPhoneControlMap from './Map';
import uiPhoneControlDatepicker from './Datepicker';
import uiPhoneControlTimepicker from './Timepicker';
import uiPhoneControlCard from './Card';
import uiPhoneControlListView from './ListView';
import uiPhoneControlGridView from './GridView';
import uiPhoneControlAudioRecorder from './AudioRecorder';
import uiPhoneControlContainer from './Container';

const InnerControls = {
    [UI_PHONE_CONTROL_LABEL]: uiPhoneControlLabel,
    [UI_PHONE_CONTROL_BUTTON]: uiPhoneControlButton,
    [UI_PHONE_CONTROL_TEXTEDIT]: uiPhoneControlTextEdit,
    [UI_PHONE_CONTROL_SPINNER]: uiPhoneControlSpinner,
    [UI_PHONE_CONTROL_SWITCH]: uiPhoneControlSwitch,
    [UI_PHONE_CONTROL_SLIDER]: uiPhoneControlSlider,
    [UI_PHONE_CONTROL_WEBVIEW]: uiPhoneControlWebview,
    [UI_PHONE_CONTROL_IMAGE_VIEW]: uiPhoneControlImageView,
    [UI_PHONE_CONTROL_VIDEO_VIEW]: uiPhoneControlVideoView,
    [UI_PHONE_CONTROL_AUDIO_PLAYER]: uiPhoneControlAudioPlayer,
    [UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER]: uiPhoneControlPhotocameraController,
    [UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER]: uiPhoneControlVideocameraController,
    [UI_PHONE_CONTROL_AUDIO_RECORDER]: uiPhoneControlAudioRecorder,
    [UI_PHONE_CONTROL_MAP]: uiPhoneControlMap,
    [UI_PHONE_CONTROL_DATEPICKER]: uiPhoneControlDatepicker,
    [UI_PHONE_CONTROL_TIMEPICKER]: uiPhoneControlTimepicker,
    [UI_PHONE_CONTROL_CARD]: uiPhoneControlCard,
    [UI_PHONE_CONTROL_LIST_VIEW]: uiPhoneControlListView,
    [UI_PHONE_CONTROL_GRID_VIEW]: uiPhoneControlGridView,
    [UI_PHONE_CONTROL_CONTAINER]: uiPhoneControlContainer,
}

const _UiPhoneControl = ({ scene, viewController, control, style, platform, onCreate, ...others }) => {
    let mystyle = {
        ...style,
        paddingTop: control.paddingTop,
        paddingBottom: control.paddingBottom,
        paddingLeft: control.paddingLeft,
        paddingRight: control.paddingRight,
    };
    if (others.zIndex) mystyle.zIndex = others.zIndex;
    let Content = InnerControls[control.uiPhoneControlType];
    let linkUrl = '';
    if (scene) {
        linkUrl = `/editor/scenes/${scene.id}/viewControllers/${viewController.id}/${control.uiPhoneControlType}/${control.id}`;
    } else {
        linkUrl = `/editor/scenes/viewControllers/${viewController.id}/${control.uiPhoneControlType}/${control.id}`;
    }
    let clickHandler = (history, e) => {
        e.stopPropagation();
        history.push(linkUrl);
    }
    return (
        <Route render={({ history }) => {
            return (
                <div className="ui-phone-control" style={mystyle} onClick={e => clickHandler(history, e)}>
                    <Content scene={scene} viewController={viewController} control={control} platform={platform} onCreate={onCreate} />
                </div>
            );
        }} />
    );
}

function createFullscreenContainerElement(platform, scene, viewController, control, onCreate) {
    let props = {
        platform,
        control,
        scene,
        viewController,
        onCreate,
        posX: 0,
        posY: 0,
        marginTop: 0,
        marginBottom: 0,
        marginStart: 0,
        marginEnd: 0,
        zIndex: 25 - viewController.containers.findIndex(c => c.id === control.id)
    };
    // Position constraints (are enought to grant 100% width and 100% height too, no need to impose dimension constraints)
    props.constraintTop = { ref: null, side: SIDE_TOP };
    props.constraintBottom = { ref: null, side: SIDE_BOTTOM };
    props.constraintStart = { ref: null, side: SIDE_START };
    props.constraintEnd = { ref: null, side: SIDE_END };
    return <UiPhoneControl {...props} id={control.id} key={control.id} />
}

export default function createUiPhoneControlElement(platform, scene, viewController, control, onCreate) {
    if (control.uiPhoneControlType === UI_PHONE_CONTROL_CONTAINER && viewController.isParent && viewController.type !== SCENE_MULTI_VC) {
        // Override constraints, positions, margins, ecc to have a fullscreen presentation of the contained viewController
        return createFullscreenContainerElement(platform, scene, viewController, control, onCreate);
    }
    let props = {
        onCreate,
        platform,
        control,
        scene,
        viewController,
        posX: control.posX,
        posY: control.posY,
        defaultWidth: control.defaultWidth,
        defaultHeight: control.defaultHeight,
        marginTop: control.marginTop,
        marginBottom: control.marginBottom,
        marginStart: control.marginLeft,
        marginEnd: control.marginRight
    };
    if (control.constraints) {
        // Position constraints
        control.constraints.filter(c => c.valid === CONSTRAINT_VALID).forEach(constraint => {
            let constraintItem = {
                ref: constraint.refId,
                side: constraint.refId === null ? constraint.side : constraint.refSide
            };
            switch (constraint.side) {
                case SIDE_TOP:
                    props.constraintTop = constraintItem;
                    break;
                case SIDE_BOTTOM:
                    props.constraintBottom = constraintItem;
                    break;
                case SIDE_CENTER_Y:
                    props.constraintCenterY = constraintItem;
                    break;
                case SIDE_START:
                    props.constraintStart = constraintItem;
                    break;
                case SIDE_END:
                    props.constraintEnd = constraintItem;
                    break;
                case SIDE_CENTER_X:
                    props.constraintCenterX = constraintItem;
                    break;
                default:
                    break;
            }
        })
    }
    // Dimension constraints
    if (control.widthMode === 'exact') {
        props.constraintWidth = control.width;
    }
    else if (control.widthMode === 'percent') {
        props.constraintWidthPercent = control.width / 100;
    }
    if (control.heightMode === 'exact') {
        props.constraintHeight = control.height;
    }
    else if (control.heightMode === 'percent') {
        props.constraintHeightPercent = control.height / 100;
    }
    if (control.ratioMode === 'exact') {
        props.constraintRatio = control.ratioWidth / control.ratioHeight;
    }
    // Control chain constraints
    if (control.controlChain) {
        let elements = viewController.controls.filter(c => c.controlChain && c.controlChain.id === control.controlChain.id);
        elements.sort((a, b) => a.controlChainPosition - b.controlChainPosition);
        let idx = elements.findIndex(item => item.id === control.id);
        if (idx === 0) {
            props.constraintChain = control.controlChain.type;
            props.constraintChainAxis = control.controlChain.axis;
            if (control.controlChain.type === CONTROL_CHAIN_TYPE_PACKED) {
                props.constraintChainBias = control.controlChain.bias;
            }
            if (control.controlChain.type === CONTROL_CHAIN_TYPE_PACKED || control.controlChain.type === CONTROL_CHAIN_TYPE_WEIGHTED) {
                props.constraintSpacing = control.controlChain.spacing;
            }
        } else {
            props.constraintChainPrev = elements[idx - 1].id;
        }
        if (control.controlChain.type === CONTROL_CHAIN_TYPE_WEIGHTED) {
            props.constraintWeight = control.controlChainWeight;
        }
    }
    return <UiPhoneControl {...props} id={control.id} key={control.id} />
}

export const UiPhoneControl = withConstraints(_UiPhoneControl);