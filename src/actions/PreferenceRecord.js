import uniqid from 'uniqid';

export const CREATE_PREFERENCE_RECORD = 'CREATE_PREFERENCE_RECORD';
export const DELETE_PREFERENCE_RECORD = 'DELETE_PREFERENCE_RECORD';

export function createPreferenceRecord(type, key, value) {
    return {
        type: CREATE_PREFERENCE_RECORD,
        record: {
            id: uniqid(),
            type,
            key,
            value
        }
    }
}

export function deletePreferenceRecord(recordId) {
    return {
        type: DELETE_PREFERENCE_RECORD,
        recordId
    }
}