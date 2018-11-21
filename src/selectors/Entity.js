import DataArchive from "../utils/DataArchive";

function recompute(state, entity) {
    if (!entity) return entity;
    return {
        ...entity,
        attributes: DataArchive.Extract(state.entityAttributes, 'entityId', entity.id),
        relations: DataArchive.Extract(state.entityRelations, 'fromEntityId', entity.id)
    }
}

export function EntitySelector(state, entityId) {
    return recompute(state, DataArchive.Get(state.entities, entityId));
}
export function EntitySelectorAll(state) {
    return DataArchive.All(state.entities).map(recompute.bind(null, state));
}