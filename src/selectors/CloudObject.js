import DataArchive from "../utils/DataArchive";

function recompute(state, object) {
    if (!object) return object;
    return {
        ...object,
        attributes: DataArchive.Extract(state.cloudObjectAttributes, 'objectId', object.id)
    };
}

export function CloudObjectSelector(state, objectId) {
    return recompute(state, DataArchive.Get(state.cloudObjects, objectId));
}

export function CloudObjectSelectorAll(state) {
    return DataArchive.All(state.cloudObjects).map(recompute.bind(null, state));
}