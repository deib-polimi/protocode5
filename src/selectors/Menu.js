import DataArchive from "../utils/DataArchive";
import NavigationSelector from "./Navigation";

function resolveNav(state, menuItem) {
    return {
        ...menuItem,
        navigation: NavigationSelector(state, menuItem.id)[0]
    }
}

export function MenuItemSelector(state, menuItemId) {
    return resolveNav(state, DataArchive.Get(state.menu, menuItemId));
}

export function MenuItemAll(state) {
    return DataArchive.All(state.menu).map(resolveNav.bind(null, state));
}