export const ENABLE_PREFERENCES = 'ENABLE_PREFERENCES';
export const ENABLE_FILE_STORAGE = 'ENABLE_FILE_STORAGE';
export const ENABLE_DATABASE = 'ENABLE_DATABASE';
export const ENABLE_CLOUD_DATABASE = 'ENABLE_CLOUD_DATABASE';
export const DISABLE_PREFERENCES = 'DISABLE_PREFERENCES';
export const DISABLE_FILE_STORAGE = 'DISABLE_FILE_STORAGE';
export const DISABLE_DATABASE = 'DISABLE_DATABASE';
export const DISABLE_CLOUD_DATABASE = 'DISABLE_CLOUD_DATABASE';

export function enablePreferences() {
    return {
        type: ENABLE_PREFERENCES
    }
}

export function enableFileStorage() {
    return {
        type: ENABLE_FILE_STORAGE
    }
}

export function enableDatabase() {
    return {
        type: ENABLE_DATABASE
    }
}

export function enableCloudDatabase() {
    return {
        type: ENABLE_CLOUD_DATABASE
    }
}

export function disablePreferences() {
    return {
        type: DISABLE_PREFERENCES
    }
}

export function disableFileStorage() {
    return {
        type: DISABLE_FILE_STORAGE
    }
}

export function disableDatabase() {
    return {
        type: DISABLE_DATABASE
    }
}

export function disableCloudDatabase() {
    return {
        type: DISABLE_CLOUD_DATABASE
    }
}