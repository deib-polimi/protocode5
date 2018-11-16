import DataArchive from '../utils/DataArchive';
import { EDIT_WATCH_CLICK_LISTENER, CREATE_WATCH_CLICK_LISTENER, DELETE_WATCH_CLICK_LISTENER } from '../actions/WatchClickListener';
import { DELETE_WATCH_CONTROL } from '../actions/WatchControl';
import { DELETE_WATCH_CONTROLLER } from '../actions/WatchController';

const InitialState = DataArchive.Create('id', ['controlId', 'watchControllerId']);

export default function WatchClickListenerReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_WATCH_CLICK_LISTENER:
            return DataArchive.Insert(state, {
                id: action.listenerId,
                controlId: action.controlId,
                watchControllerId: action.watchControllerId,
                destinationId: null
            })
        case EDIT_WATCH_CLICK_LISTENER:
            return DataArchive.Merge(state, {
                id: action.listenerId,
                ...action.edits
            });
        case DELETE_WATCH_CLICK_LISTENER:
            return DataArchive.Delete(state, action.listenerId);
        case DELETE_WATCH_CONTROL:
            return DataArchive.DeleteByRel(state, 'controlId', action.controlId);
        case DELETE_WATCH_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'watchControllerId', action.watchControllerId);
        default: 
            return state;
    }
}