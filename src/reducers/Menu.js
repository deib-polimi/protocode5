import DataArchive from "../utils/DataArchive";
import { CREATE_MENU_ITEM, EDIT_MENU_ITEM, DELETE_MENU_ITEM } from "../actions/MenuItem";

const InitialState = DataArchive.Create('id', []);

export default function MenuReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_MENU_ITEM:
            return DataArchive.Insert(state, {
                id: action.menuItemId,
                name: action.title,
                title: action.title
            });
        case EDIT_MENU_ITEM:
            return DataArchive.Merge(state, {
                id: action.menuItemId,
                ...action.edits
            });
        case DELETE_MENU_ITEM:
            return DataArchive.Delete(state, action.menuItemId);
        default:
            return state;
    }
}