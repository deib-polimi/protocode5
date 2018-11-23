import React from 'react';
import { PHOTOCAMERA_BACKGROUND_ICON, PHOTOCAMERA_BACKGROUND_NORMAL } from '../../../../../Constants';

const uiPhoneControlPhotocameraController = ({ platform, control }) => {
    let style = {};
    return (
        <div className={`control-photocamera-controller-view control-button expanded ${platform}`} style={style}>
            <div class="control-content">
                {control.backgroundType === PHOTOCAMERA_BACKGROUND_NORMAL && 'Photocamera'}
                {control.backgroundType === PHOTOCAMERA_BACKGROUND_ICON &&
                    <div class="photocamera_icon"></div>
                }
            </div>
        </div>
    );
}

export default uiPhoneControlPhotocameraController;