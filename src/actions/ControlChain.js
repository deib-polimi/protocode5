import uniqid from 'uniqid';

export const CREATE_CONTROL_CHAIN = 'CREATE_CONTROL_CHAIN';
export const EDIT_CONTROL_CHAIN = 'EDIT_CONTROL_CHAIN';
export const DELETE_CONTROL_CHAIN = 'DELETE_CONTROL_CHAIN';

export function createControlChain(viewControllerId) {
    return {
        type: CREATE_CONTROL_CHAIN,
        chainId: uniqid(),
        viewControllerId
    }
}

export function editControlChain(chainId, prop, value) {
    return {
        type: EDIT_CONTROL_CHAIN,
        chainId,
        edits: {
            [prop]: value
        }
    }
}

export function deleteControlChain(chainId) {
    return {
        type: DELETE_CONTROL_CHAIN,
        chainId
    }
}