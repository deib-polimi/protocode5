import { PARENT_VIEW_CONTROLLER, VIEW_CONTROLLER } from '../XmlNames';
import AlertDialogTransform from './AlertDialog';
import ProgressDialogTransform from './ProgressDialog';
import AsyncTaskTransform from './AsyncTask';
import UiPhoneControlTransform from './UiPhoneControl';
import ControlChainTransform from './ControlChain';

function transform(application, scene) {
    this._scene = scene;
    this._application = application;
    this.toXml = xmlDoc => {
        var viewController;
        if (this.isParent) {
            viewController = xmlDoc.createElement(PARENT_VIEW_CONTROLLER);
        } else {
            viewController = xmlDoc.createElement(VIEW_CONTROLLER);
        }
        viewController.setAttribute('id', this.id);
        viewController.setAttribute('name', this.name.replace(/[^a-zA-Z0-9_ ]/g, ''));
        viewController.setAttribute('backgroundColor', this.backgroundColor);
        viewController.setAttribute('backgroundImage', this.backgroundImage);

        this.alertDialogs.forEach(alertDialog => {
            viewController.appendChild(AlertDialogTransform(this, alertDialog).toXml(xmlDoc));
        });

        this.progressDialogs.forEach(progressDialog => {
            viewController.appendChild(ProgressDialogTransform(this, progressDialog).toXml(xmlDoc));
        });

        this.asyncTasks.forEach(asyncTask => {
            viewController.appendChild(AsyncTaskTransform(this, asyncTask).toXml(xmlDoc));
        });

        this.controlChains.filter(chain => chain.valid).forEach(controlChain => {
            viewController.appendChild(ControlChainTransform(this, controlChain).toXml(xmlDoc));
        });

        this.controls.filter(control => control.valid !== false).forEach(uiPhoneControl => {
            if (uiPhoneControl.controlChain) {
                viewController.appendChild(UiPhoneControlTransform(this, ControlChainTransform(this, uiPhoneControl.controlChain), uiPhoneControl).toXml(xmlDoc));
            } else {
                viewController.appendChild(UiPhoneControlTransform(this, null, uiPhoneControl).toXml(xmlDoc));
            }
        });

        return viewController;
    }
    this.getRefPath = path => {
        if (this.isParent) {
            var updatedPath = '/@' + PARENT_VIEW_CONTROLLER + '[id=\'' + this.id + '\']' + path;
            updatedPath = this._scene.getRefPath(updatedPath);
            return updatedPath;
        } else {
            return '//@' + VIEW_CONTROLLER + '[id=\'' + this.id + '\']' + path;
        }
    }
    return this;
}

export default function ViewControllerTransform(application, scene, raw) {
    return transform.call(raw, application, scene);
}