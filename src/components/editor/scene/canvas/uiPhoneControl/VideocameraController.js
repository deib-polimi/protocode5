import React from 'react';
import { VIDEOCAMERA_BACKGROUND_ICON, VIDEOCAMERA_BACKGROUND_NORMAL } from '../../../../../Constants';

const uiPhoneControlVideocameraController = ({ control, platform }) => {
    let style = {};
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