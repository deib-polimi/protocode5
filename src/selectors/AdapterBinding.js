import DataArchive from "../utils/DataArchive";
import { FileStorageRecordSelector } from "./FileStorageRecord";
import { EntitySelector } from "./Entity";
import { CloudObjectSelector } from "./CloudObject";
import { PreferenceRecordSelector } from "./PreferenceRecord";

function recompute(state, adapterBinding) {
    if (!adapterBinding) return adapterBinding;
    let out = { ...adapterBinding };
    if (adapterBinding.fileId) {
        out.file = FileStorageRecordSelector(state, adapterBinding.fileId);
    }
    if (adapterBinding.entityId) {
        out.entity = EntitySelector(state, adapterBinding.entityId);
    }
    if (adapterBinding.cloudObjectId) {
        out.cloudObject = CloudObjectSelector(state, adapterBinding.cloudObjectId);
    }
    if (adapterBinding.preferenceId) {
        out.preference = PreferenceRecordSelector(state, adapterBinding.preferenceId);
    }
    return out;
}

export function AdapterSelectorId(state, adapterId) {
    return recompute(state, DataArchive.Get(state.adapterBindings, adapterId));
}

export function AdapterSelector(state, sceneId) {
    return DataArchive.Extract(state.adapterBindings, 'sceneId', sceneId).map(recompute.bind(null, state));
}

export function AdapterSelectorAll(state) {
    return DataArchive.All(state.adapterBindings).map(recompute.bind(null, state));
}