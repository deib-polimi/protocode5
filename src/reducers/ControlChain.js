import DataArchive from '../utils/DataArchive';
import { CREATE_CONTROL_CHAIN, EDIT_CONTROL_CHAIN, DELETE_CONTROL_CHAIN } from '../actions/ControlChain';
import { CONTROL_CHAIN_TYPE_SPREAD, CONTROL_CHAIN_AXIS_HORIZONTAL } from '../Constants';
import { DELETE_VIEW_CONTROLLER } from '../actions/ViewController';
import { CREATE_UI_PHONE_CONTROL, DELETE_UI_PHONE_CONTROL } from '../actions/UiPhoneControl';

const InitialState = DataArchive.Create('id', ['viewControllerId']);

export default function ControlChainReducer(state = InitialState, action) {
    switch(action.type) {
        case CREATE_CONTROL_CHAIN:
            return DataArchive.Insert(state, {
                id: action.chainId,
                viewControllerId: action.viewControllerId,
                type: CONTROL_CHAIN_TYPE_SPREAD,
                axis: CONTROL_CHAIN_AXIS_HORIZONTAL,
                spacing: 0,
                bias: 0.5,
                members: {}
            }); 
        case CREATE_UI_PHONE_CONTROL:
            if (action.controlChainId) {
                return DataArchive.Merge(state, {
                    id: action.controlChainId,
                    members: {
                        ...DataArchive.Get(state, action.controlChainId).members,
                        [action.controlId]: true
                    }
                })
            } else {
                return state;
            }
        case DELETE_UI_PHONE_CONTROL:
            let chains = DataArchive.All(state);
            return chains.reduce((state, chain) => {
                if (chain.members[action.controlId]) {
                    let newMembers = {...chain.members};
                    delete newMembers[action.controlId];
                    return DataArchive.Merge(state, {
                        id: chain.id,
                        members: newMembers
                    });
                } else {
                    return state;
                }
            }, state);
        case EDIT_CONTROL_CHAIN:
            return DataArchive.Merge(state, {
                id: action.chainId,
                ...action.edits
            });
        case DELETE_CONTROL_CHAIN:
            return DataArchive.Delete(state, action.chainId);
        case DELETE_VIEW_CONTROLLER:
            return DataArchive.DeleteByRel(state, 'viewControllerId', action.viewControllerId);
        default:
            return state;
    }
}