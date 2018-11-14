import DataArchive from '../../utils/DataArchive';
import createUiPhoneControl from './UiPhoneControl';
import { UI_PHONE_CONTROL_LABEL } from '../../Constants';

export default function createLabel(state, action) {
    return {
        ...createUiPhoneControl(
            UI_PHONE_CONTROL_LABEL,
            action.viewController,
            action.controlId,
            'Label' + DataArchive.Count(state),
            'Some text',
            88,
            24,
            88,
            36
        ),
        textAlign: 'left',
        textColor: '#000000',
        textSize: 16,
        textDecoration: 'none',
    }
}