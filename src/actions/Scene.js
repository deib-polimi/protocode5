import uniqid from 'uniqid';

export const CREATE_SCENE = 'CREATE_SCENE';
export const EDIT_SCENE = 'EDIT_SCENE';
export const DELETE_SCENE = 'DELETE_SCENE';

export const LINK_VIEWCONTROLLER = 'LINK_VIEWCONTROLLER';
export const UNLINK_VIEWCONTROLLER = 'UNLINK_VIEWCONTROLLER';
export const EDIT_CONTAINER = 'EDIT_CONTAINER';

export function createScene() {
    return {
        type: CREATE_SCENE,
        sceneId: uniqid(),
    }
}

export function linkViewController(sceneId, viewControllerId) {
    return {
        type: LINK_VIEWCONTROLLER,
        linkId: uniqid(),
        sceneId,
        viewControllerId
    }
}

export function editContainer(containerId, prop, value) {
    return {
        type: EDIT_CONTAINER,
        containerId,
        edits: {
            [prop]: value
        }
    }
}

export function editScene(sceneId, prop, value) {
    return {
        type: EDIT_SCENE,
        sceneId,
        edits: {
            [prop]: value
        }
    }
}

export function unlinkViewController(linkId) {
    return {
        type: UNLINK_VIEWCONTROLLER,
        linkId
    }
}

export function deleteScene(sceneId) {
    return {
        type: DELETE_SCENE,
        sceneId
    }
}