import DataArchive from "../utils/DataArchive";

function recompute(state, recomputingEntities /* used for circular references */, entity) {
    if (!entity) return entity;
    let out = {
        ...entity,
        attributes: DataArchive.Extract(state.entityAttributes, 'entityId', entity.id),
    }
    recomputingEntities[entity.id] = out;
    out.relations = DataArchive.Extract(state.entityRelations, 'fromEntityId', entity.id).map(rel => {
        return {
            ...rel,
            targetEntity: InnerEntitySelector(state, recomputingEntities, rel.toEntityId)
        }
    });
    return out;
}

function InnerEntitySelector(state, resolvingEntities /* used for circular references */, entityId) {
    if (resolvingEntities[entityId]) return resolvingEntities[entityId];
    let entity = DataArchive.Get(state.entities, entityId);
    return recompute(state, resolvingEntities, entity);
}

export function EntitySelector(state, entityId) {
    return recompute(state, {}, DataArchive.Get(state.entities, entityId));
}

export function EntitySelectorAll(state) {
    return DataArchive.All(state.entities).map(recompute.bind(null, state, {}));
}