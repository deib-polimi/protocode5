import React from 'react';
import { ANDROID, VIDEOCAMERA_BACKGROUND_NORMAL, VIDEOCAMERA_BACKGROUND_ICON } from '../../../../../Constants';

const uiPhoneControlVideocameraController = ({ control, platform }) => {
    let style = {};
    if (platform === ANDROID) {
        style.width = 'calc(100% - 16px)';
        style.height = 'calc(100% - 8px)';
        style.marginTop = style.marginBottom = 4;
        style.marginLeft = style.marginRight = 8;
    }
    return (
        <div className={`control-videocamera-controller-view control-button expanded ${platform}`} style={style}>
            <div class="control-content">
                {control.backgroundType === VIDEOCAMERA_BACKGROUND_NORMAL && 'Videocamera'}
                {control.backgroundType === VIDEOCAMERA_BACKGROUND_ICON &&
                    <div class="videocamera_icon"></div>
                }
            </div>
        </div>
    );
}

export default uiPhoneControlVideocameraController;