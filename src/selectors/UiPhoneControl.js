import DataArchive from '../utils/DataArchive';
import ConstraintSelector from './Constraint';
import { UI_PHONE_CONTROL_LIST_VIEW, UI_PHONE_CONTROL_GRID_VIEW, UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_VIDEO_VIEW, UI_PHONE_CONTROL_BUTTON } from '../Constants';
import ListViewCellSelector from './ListViewCell';
import GridViewCellSelector from './GridViewCell';
import SourceTypeSelector from './SourceType';
import { ControlChainSelector } from './ControlChain';
import NavigationSelector from './Navigation';

function findControls(state, viewControllerId) {
    return DataArchive.Extract(state.uiPhoneControls, 'viewControllerId', viewControllerId);
}

function addContraints(state, controls) {
    return controls
        .map(control => {
            return {
                ...control,
                constraints: ConstraintSelector(state, control.id)
            }
        })
        .map(control => {
            if (control.controlChainId !== null) {
                control.controlChain = ControlChainSelector(state, control.controlChainId);
            } 
            return control;
        })
        .map(control => {
            if (control.uiPhoneControlType === UI_PHONE_CONTROL_LIST_VIEW) {
                return {
                    ...control,
                    listViewCells: ListViewCellSelector(state, control.id),
                    navigations: NavigationSelector(state, control.id)
                }
            }
            else if (control.uiPhoneControlType === UI_PHONE_CONTROL_GRID_VIEW) {
                return {
                    ...control,
                    gridViewCells: GridViewCellSelector(state, control.id),
                    navigations: NavigationSelector(state, control.id)
                }
            } 
            else if ([UI_PHONE_CONTROL_AUDIO_PLAYER, UI_PHONE_CONTROL_IMAGE_VIEW, UI_PHONE_CONTROL_VIDEO_VIEW].indexOf(control.uiPhoneControlType) >= 0) {
                return {
                    ...control,
                    sourceType: SourceTypeSelector(state, control.id)
                }
            }
            else if (control.uiPhoneControlType === UI_PHONE_CONTROL_BUTTON) {
                return {
                    ...control,
                    navigations: NavigationSelector(state, control.id)
                }
            }
            else {
                return control;
            }
        });
}

function UiPhoneControlSelector(state, viewControllerId) {
    return addContraints(state, findControls(state, viewControllerId));
}

export default UiPhoneControlSelector;