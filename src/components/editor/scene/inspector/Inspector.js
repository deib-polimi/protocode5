import React from 'react';
import { UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_AUDIO_RECORDER, UI_PHONE_CONTROL_BUTTON, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER, UI_PHONE_CONTROL_SLIDER, UI_PHONE_CONTROL_SPINNER, UI_PHONE_CONTROL_SWITCH, UI_PHONE_CONTROL_TEXTEDIT, UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER, UI_PHONE_CONTROL_WEBVIEW, UI_PHONE_CONTROL_MAP, UI_PHONE_CONTROL_DATEPICKER, UI_PHONE_CONTROL_TIMEPICKER, UI_PHONE_CONTROL_CARD, UI_PHONE_ELEMENT_ALERT_DIALOG, UI_PHONE_ELEMENT_PROGRESS_DIALOG, UI_PHONE_ELEMENT_ASYNC_TASK, UI_PHONE_ELEMENT_LIST_VIEW_CELL, UI_PHONE_ELEMENT_GRID_VIEW_CELL, UI_PHONE_MEDIA_SOURCE_TYPE, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_CONTROL_LABEL, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_LIST_VIEW, CONTROL_CHAIN, UI_PHONE_CONTROL_CONTAINER, UI_PHONE_DYNAMICS_NAVIGATION, UI_PHONE_ELEMENT_MENU, UI_PHONE_ELEMENT_MENU_ITEM } from '../../../../Constants';
import AudioPlayerEditor from './AudioPlayer/Editor';
import AudioRecorderEditor from './AudioRecorder/Editor';
import ButtonEditor from './Button/Editor';
import ImageViewEditor from './ImageView/Editor';
import LabelEditor from './Label/Editor';
import PhotoCameraControllerEditor from './PhotocameraController/Editor';
import SliderEditor from './Slider/Editor';
import SpinnerEditor from './Spinner/Editor';
import SwitchControlEditor from './Switch/Editor';
import TextEditEditor from './TextEdit/Editor';
import VideoCameraControllerEditor from './VideocameraController/Editor';
import VideoViewEditor from './VideoView/Editor';
import WebviewEditor from './WebView/Editor';
import DatepickerEditor from './Datepicker/Editor';
import TimepickerEditor from './TimePicker/Editor';
import CardEditor from './Card/Editor';
import AlertEditor from './Alert/Editor';
import AsyncTaskEditor from './AsyncTask/Editor';
import ListCellEditor from './ListView/EditorCell';
import ListViewEditor from './ListView/Editor';
import GridCellEditor from './GridView/EditorCell';
import ProgressEditor from './Progress/Editor';
import GridViewEditor from './GridView/Editor';
import MapEditor from './Map/Editor';
import { Redirect } from 'react-router-dom';
import ControlChainEditor from './ControlChain/Editor';
import ContainerEditor from './Container/Editor';
import MenuEditor from './Menu/Editor';
import MenuItemEditor from './Menu/ItemEditor';

const Editors = {
    [UI_PHONE_ELEMENT_ALERT_DIALOG]: AlertEditor,
    [UI_PHONE_ELEMENT_PROGRESS_DIALOG]: ProgressEditor,
    [UI_PHONE_ELEMENT_ASYNC_TASK]: AsyncTaskEditor,
    [UI_PHONE_ELEMENT_LIST_VIEW_CELL]: ListCellEditor,
    [UI_PHONE_ELEMENT_GRID_VIEW_CELL]: GridCellEditor,
    [UI_PHONE_CONTROL_AUDIO_PLAYER]: AudioPlayerEditor,
    [UI_PHONE_CONTROL_AUDIO_RECORDER]: AudioRecorderEditor,
    [UI_PHONE_CONTROL_BUTTON]: ButtonEditor,
    [UI_PHONE_CONTROL_CARD]: CardEditor,
    [UI_PHONE_CONTROL_DATEPICKER]: DatepickerEditor,
    [UI_PHONE_CONTROL_GRID_VIEW]: GridViewEditor,
    [UI_PHONE_CONTROL_IMAGE_VIEW]: ImageViewEditor,
    [UI_PHONE_CONTROL_LABEL]: LabelEditor,
    [UI_PHONE_CONTROL_LIST_VIEW]: ListViewEditor,
    [UI_PHONE_CONTROL_MAP]: MapEditor,
    [UI_PHONE_CONTROL_PHOTOCAMERA_CONTROLLER]: PhotoCameraControllerEditor,
    [UI_PHONE_CONTROL_SLIDER]: SliderEditor,
    [UI_PHONE_CONTROL_SPINNER]: SpinnerEditor,
    [UI_PHONE_CONTROL_SWITCH]: SwitchControlEditor,
    [UI_PHONE_CONTROL_TEXTEDIT]: TextEditEditor,
    [UI_PHONE_CONTROL_TIMEPICKER]: TimepickerEditor,
    [UI_PHONE_CONTROL_VIDEO_VIEW]: VideoViewEditor,
    [UI_PHONE_CONTROL_VIDEOCAMERA_CONTROLLER]: VideoCameraControllerEditor,
    [UI_PHONE_CONTROL_WEBVIEW]: WebviewEditor,
    [CONTROL_CHAIN]: ControlChainEditor,
    [UI_PHONE_CONTROL_CONTAINER]: ContainerEditor,
    [UI_PHONE_ELEMENT_MENU]: MenuEditor,
    [UI_PHONE_ELEMENT_MENU_ITEM]: MenuItemEditor
};

const Getters = {
    [UI_PHONE_ELEMENT_ALERT_DIALOG]: (viewController, alertId) => viewController.alertDialogs.find(d => d.id === alertId) || null,
    [UI_PHONE_ELEMENT_PROGRESS_DIALOG]: (viewController, progressId) => viewController.progressDialogs.find(d => d.id === progressId),
    [UI_PHONE_ELEMENT_ASYNC_TASK]: (viewController, taskId) => viewController.asyncTasks.find(t => t.id === taskId),
    [UI_PHONE_ELEMENT_LIST_VIEW_CELL]: (viewController, cellId, { listId }) => {
        let listView = viewController.controls.find(c => c.id === listId);
        if (listView) {
            return listView.listViewCells.find(c => c.id === cellId) || null;
        } else {
            return null;
        }
    },
    [UI_PHONE_ELEMENT_GRID_VIEW_CELL]: (viewController, cellId, { gridId }) => {
        let gridView = viewController.controls.find(c => c.id === gridId);
        if (gridView) {
            return gridView.gridViewCells.find(c => c.id === cellId) || null;
        } else {
            return null;
        }
    },
    [CONTROL_CHAIN]: (viewController, chainId) => {
        return viewController.controlChains.find(c => c.id === chainId);
    },
    [UI_PHONE_ELEMENT_MENU]: (viewController, _, { menu }) => {
        return menu;
    },
    [UI_PHONE_ELEMENT_MENU_ITEM]: (viewController, itemId, { menu }) => {
        return menu.find(item => item.id === itemId);
    }
}

const Requires = {
    [UI_PHONE_CONTROL_AUDIO_PLAYER]: (viewController, controlId, onEdit) => {
        return {
            onSourceTypeEdit: (prop, value) => onEdit(UI_PHONE_MEDIA_SOURCE_TYPE, controlId, prop, value)
        };
    },
    [UI_PHONE_CONTROL_IMAGE_VIEW]: (viewController, controlId, onEdit) => {
        return {
            onSourceTypeEdit: (prop, value) => onEdit(UI_PHONE_MEDIA_SOURCE_TYPE, controlId, prop, value)
        };
    },
    [UI_PHONE_CONTROL_VIDEO_VIEW]: (viewController, controlId, onEdit) => {
        return {
            onSourceTypeEdit: (prop, value) => onEdit(UI_PHONE_MEDIA_SOURCE_TYPE, controlId, prop, value)
        };
    },
    [CONTROL_CHAIN]: (viewController, controlId, onEdit) => {
        return {
            onControlEdit: (control, weight) => onEdit(control.uiPhoneControlType, control.id, 'controlChainWeight', weight)
        }
    },
    [UI_PHONE_ELEMENT_MENU]: (viewController, controlId, onEdit, { match }) => {
        return {
            match
        };
    }
}

const Inspector = ({ scenes, scene, viewController, controlType, controlId, onCreate, onEdit, onDelete, ...others }) => {
    let Editor = Editors[controlType];
    let control = null;
    if (Getters[controlType]) {
        control = Getters[controlType](viewController, controlId, others);
    } else {
        control = viewController.controls.find(c => c.id === controlId);
    }
    let specialRequirements = {};
    if (Requires[controlType]) {
        specialRequirements = Requires[controlType](viewController, controlId, onEdit, others);
    }
    if (Editor && control) {
        return (
            <Editor
                scene={scene}
                scenes={scenes}
                viewController={viewController}
                control={control}
                onCreate={onCreate}
                onEdit={(prop, value) => onEdit(controlType, controlId, prop, value)}
                onDelete={() => onDelete(controlType, controlId)}
                onNavigationCreate={(...args) => onCreate(UI_PHONE_DYNAMICS_NAVIGATION, ...args)}
                onNavigationEdit={(...args) => onEdit(UI_PHONE_DYNAMICS_NAVIGATION, ...args)}
                onNavigationDelete={(...args) => onDelete(UI_PHONE_DYNAMICS_NAVIGATION, ...args)}
                {...specialRequirements}
                {...others}
            />
        );
    } else {
        if (scene) {
            return (
                <Redirect to={`/editor/scenes/${scene.id}/viewControllers/${viewController.id}`} />
            );
        } else {
            return (
                <Redirect to={`/editor/scenes/viewControllers/${viewController.id}`} />
            );
        }
    }
};

export default Inspector;