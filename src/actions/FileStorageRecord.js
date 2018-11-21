import uniqid from 'uniqid';

export const CREATE_FILE_STORAGE_RECORD = 'CREATE_FILE_STORAGE_RECORD';
export const DELETE_FILE_STORAGE_RECORD = 'DELETE_FILE_STORAGE_RECORD';

export function createFileStorageRecord(name, extension, isTemp) {
    return {
        type: CREATE_FILE_STORAGE_RECORD,
        record: {
            id: uniqid(),
            name,
            extension,
            isTemp
        }
    }
}

export function deleteFileStorageRecord(recordId) {
    return {
        type: DELETE_FILE_STORAGE_RECORD,
        recordId
    }
}