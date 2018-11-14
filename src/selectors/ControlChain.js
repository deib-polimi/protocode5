import DataArchive from '../utils/DataArchive';

function recomputeProps(chain) {
    let { members, ...publicProps } = chain;
    publicProps.valid = Object.keys(members).length >= 2;
    return publicProps;
}

export function ControlChainSelector(state, chainId) {
    return recomputeProps(DataArchive.Get(state.controlChains, chainId));
}

export function ControlChainsSelector(state, viewControllerId) {
    return DataArchive.Extract(state.controlChains, 'viewControllerId', viewControllerId).map(recomputeProps);
}