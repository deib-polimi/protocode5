import React from 'react';
import { ANDROID } from '../../../../../Constants';

const uiPhoneControlAudioRecorder = ({ platform }) => {
    let style = {};
    if (platform === ANDROID) {
        style.width = 'calc(100% - 8px)';
        style.height = 'calc(100% - 16px)';
        style.marginTop = style.marginBottom = 4;
        style.marginLeft = style.marginRight = 8;
    }
    return (
        <div className={`control-audio-recorder-view control-button expanded ${platform}`} style={style}>
            <div className="control-content">Rec</div>
        </div>
    );
}

export default uiPhoneControlAudioRecorder;