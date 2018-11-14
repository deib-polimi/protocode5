import React from 'react';
import { PHOTOCAMERA_BACKGROUND_NORMAL, PHOTOCAMERA_BACKGROUND_ICON, ANDROID } from '../../../../../Constants';

const uiPhoneControlPhotocameraController = ({ platform, control }) => {
    let style = {};
    if (platform === ANDROID) {
        style.width = 'calc(100% - 16px)';
        style.height = 'calc(100% - 8px)';
        style.marginTop = style.marginBottom = 4;
        style.marginLeft = style.marginRight = 8;
    }
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