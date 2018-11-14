import uniqid from 'uniqid';

export const CREATE_NAVIGATION = 'CREATE_NAVIGATION';
export const EDIT_NAVIGATION = 'EDIT_NAVIGATION';
export const DELETE_NAVIGATION = 'DELETE_NAVIGATION';

export function createNavigation(fromSceneId, fromViewControllerId, fromControlId, toSceneId, toViewControllerId) {
    return {
        type: CREATE_NAVIGATION,
        navigationId: uniqid(),
        fromSceneId,
        fromViewControllerId,
        fromControlId,
        toSceneId,
        toViewControllerId
    }
}

export function editNavigation(navigationId, toSceneId, toViewControllerId) {
    return {
        type: EDIT_NAVIGATION,
        navigationId,
        edits: {
            toSceneId,
            toViewControllerId
        }
    }
}

export function deleteNavigation(navigationId) {
    return {
        type: DELETE_NAVIGATION,
        navigationId
    }
}