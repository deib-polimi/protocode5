export const CREATE_APPLICATION = 'CREATE_APPLICATION';
export const DELETE_APPLICATION = 'DELETE_APPLICATION';
export const CHANGE_NAME = 'CHANGE_NAME';
export const CHANGE_COMPANY_IDENTIFIER = 'CHANGE_COMPANY_IDENTIFIER';

export function createApplication() {
    return {
        type: CREATE_APPLICATION
    }
}

export function deleteApplication() {
    return {
        type: DELETE_APPLICATION
    }
}

export function changeName(name) {
    return {
        type: CHANGE_NAME,
        name
    }
}

export function changeCompanyIdentifier(companyIdentifier) {
    return {
        type: CHANGE_COMPANY_IDENTIFIER,
        companyIdentifier
    }
}