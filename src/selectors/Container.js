import DataArchive from '../utils/DataArchive';
import ViewControllerSelector from './ViewController';
import ConstraintSelector from './Constraint';

function resolve(state, containersList) {
    return containersList.map(container => {
        return {
            ...container,
            containedViewController: ViewControllerSelector(state, container.containedViewControllerId),
            constraints: ConstraintSelector(state, container.id)
        }
    })
}

export function ContainerSelectorVC(state, viewControllerId) {
    return resolve(state, DataArchive.Extract(state.containers, 'viewControllerId', viewControllerId));
}

export function ContainerSelectorScene(state, sceneId) {
    return resolve(DataArchive.Extract(state.containers, 'sceneId', sceneId));
}

export function ContainerSelectorLink(state, linkId) {
    return resolve(DataArchive.Extract(state.containers, 'linkId', linkId));
}