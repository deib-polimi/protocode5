import DataArchive from '../utils/DataArchive';

function findAlertDialogs(state, viewControllerId) {
    return DataArchive.Extract(state.alertDialogs, 'viewControllerId', viewControllerId);
}

export default function AlertDialogsSelector(state, viewControllerId) {
    return findAlertDialogs(state, viewControllerId);
}