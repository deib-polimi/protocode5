import { CREATE_APPLICATION, DELETE_APPLICATION, CHANGE_NAME, CHANGE_COMPANY_IDENTIFIER } from '../actions/Application';

export default function applicationReducer(state = null, action) {
    switch (action.type) {
        case CREATE_APPLICATION:
            return {
                name: 'newApp',
                companyIdentifier: 'it.polimi',
            }
        case DELETE_APPLICATION:
            return null;
        case CHANGE_NAME: 
            return {
                ...state,
                name: action.name
            }
        case CHANGE_COMPANY_IDENTIFIER:
            return {
                ...state,
                companyIdentifier: action.companyIdentifier
            }
        default:
            return state;
    }
}