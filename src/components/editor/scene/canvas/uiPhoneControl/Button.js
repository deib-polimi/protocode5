import React from 'react';
import { ANDROID } from '../../../../../Constants';

const uiPhoneControlButton = ({ platform, control }) => {
    let style = {
        borderRadius: control.borderRadius,
    };
    if (control.textColor) style.color = control.textColor;
    if (control.backgroundColor) style.backgroundColor = control.backgroundColor;
    if (platform === ANDROID) {
        style.width = 'calc(100% - 16px)';
        style.height = 'calc(100% - 8px)';
        style.marginTop = style.marginBottom = 4;
        style.marginLeft = style.marginRight = 8;
    }
    return (
        <div className={`control-button expanded ${platform}`} style={style}>
            <div className="control-content">{control.title}</div>
        </div>
    )
};

export default uiPhoneControlButton;