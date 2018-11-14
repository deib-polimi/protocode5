export const EDIT_SOURCE_TYPE = 'EDIT_SOURCE_TYPE';

export function editSourceType(controlId, prop, value) {
    return {
        type: EDIT_SOURCE_TYPE,
        controlId,
        edits: {
            [prop]: value
        }
    }
}