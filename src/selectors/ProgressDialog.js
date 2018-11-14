import DataArchive from '../utils/DataArchive';

function findProgressDialogs(state, viewControllerId) {
    return DataArchive.Extract(state.progressDialogs, 'viewControllerId', viewControllerId);
}

export default function ProgressDialogsSelector(state, viewControllerId) {
    return findProgressDialogs(state, viewControllerId);
}