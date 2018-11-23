import React from 'react';

const uiPhoneControlButton = ({ platform, control }) => {
    let style = {
        borderRadius: control.borderRadius,
    };
    if (control.textColor) style.color = control.textColor;
    if (control.backgroundColor) style.backgroundColor = control.backgroundColor;
    return (
        <div className={`control-button expanded ${platform}`} style={style}>
            <div className="control-content">{control.title}</div>
        </div>
    )
};

export default uiPhoneControlButton;