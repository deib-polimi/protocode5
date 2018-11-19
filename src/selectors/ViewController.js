import DataArchive from '../utils/DataArchive';
import AlertDialogsSelector from './AlertDialog';
import ProgressDialogsSelector from './ProgressDialog';
import AsyncTasksSelector from './AsyncTask';
import UiPhoneControlSelector from './UiPhoneControl';
import { ControlChainsSelector } from './ControlChain';
import { SMARTPHONE, TABLET } from '../Constants';
import { ContainerSelectorVC } from './Container';

function recompute(state, viewController) {
    if (viewController) {
        let containers = ContainerSelectorVC(state, viewController.id);
        return {
            ...viewController,
            isParent: viewController.scene !== null,
            alertDialogs: AlertDialogsSelector(state, viewController.id),
            progressDialogs: ProgressDialogsSelector(state, viewController.id),
            asyncTasks: AsyncTasksSelector(state, viewController.id),
            controls: [
                ...UiPhoneControlSelector(state, viewController.id),
                ...containers
            ],
            controlChains: ControlChainsSelector(state, viewController.id),
            containers
        }
    } else {
        return null;
    }
}

export default function ViewControllerSelector(state, viewControllerId) {
    let viewController = DataArchive.Get(state.viewControllers, viewControllerId) || null;
    return recompute(state, viewController);
}

export function ViewControllerAll(state) {
    return DataArchive.All(state.viewControllers).filter(vc => vc.scene === null).map(recompute.bind(null, state));
}

export function ViewControllerScene(state, sceneId) {
    return {
        [SMARTPHONE]: ViewControllerSelector(state, sceneId + SMARTPHONE),
        [TABLET]: ViewControllerSelector(state, sceneId + TABLET)
    };
}