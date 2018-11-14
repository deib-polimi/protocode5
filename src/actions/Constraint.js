import uniqid from 'uniqid';

export const CREATE_CONSTRAINT = 'CREATE_CONSTRAINT';
export const EDIT_CONSTRAINT = 'EDIT_CONSTRAINT';
export const DELETE_CONSTRAINT = 'DELETE_CONSTRAINT';

export function createConstraint(targetElement, contextViewController) {
    return {
        type: CREATE_CONSTRAINT,
        targetId: targetElement,
        viewControllerId: contextViewController,
        constraintId: uniqid()
    }
}

export function editConstraint(constraintId, prop, value) {
    return {
        type: EDIT_CONSTRAINT,
        constraintId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteConstraint(constraintId) {
    return {
        type: DELETE_CONSTRAINT,
        constraintId
    }
}