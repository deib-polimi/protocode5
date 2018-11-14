import DataArchive from '../utils/DataArchive';
import AlertDialogsSelector from './AlertDialog';
import ProgressDialogsSelector from './ProgressDialog';
import AsyncTasksSelector from './AsyncTask';
import UiPhoneControlSelector from './UiPhoneControl';
import { ControlChainsSelector } from './ControlChain';
import { SMARTPHONE, TABLET } from '../Constants';
import { ContainerSelectorVC } from './Container';

export default function ViewControllerSelector(state, viewControllerId) {
    let viewController = DataArchive.Get(state.viewControllers, viewControllerId) || null;
    if (viewController) {
        let containers = ContainerSelectorVC(state, viewControllerId);
        return {
            ...viewController,
            isParent: viewController.scene !== null,
            alertDialogs: AlertDialogsSelector(state, viewControllerId),
            progressDialogs: ProgressDialogsSelector(state, viewControllerId),
            asyncTasks: AsyncTasksSelector(state, viewControllerId),
            controls: [
                ...UiPhoneControlSelector(state, viewControllerId),
                ...containers
            ],
            controlChains: ControlChainsSelector(state, viewControllerId),
            containers
        }
    } else {
        return null;
    }
}

export function ViewControllerAll(state) {
    return DataArchive.All(state.viewControllers).filter(vc => vc.scene === null);
}

export function ViewControllerScene(state, sceneId) {
    return {
        [SMARTPHONE]: ViewControllerSelector(state, sceneId + SMARTPHONE),
        [TABLET]: ViewControllerSelector(state, sceneId + TABLET)
    };
}