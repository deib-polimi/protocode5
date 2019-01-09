import DataArchive from "../utils/DataArchive";
import { AdapterSelectorId } from "./AdapterBinding";

function recompute(state, connector) {
    if (!connector) return connector;
    if (connector.adapterId === null) return connector;
    return {
        ...connector,
        adapter: AdapterSelectorId(state, connector.adapterId)
    }
}

export function ModelConnectorSelector(state, controlId) {
    return DataArchive.Extract(state.modelConnectors, 'controlId', controlId).map(recompute.bind(null, state));
}

export function ModelConnectorSelectorAll(state) {
    return DataArchive.All(state.modelConnectors).map(recompute.bind(null, state));
}