import React from 'react';

const uiPhoneControlTextEdit = ({ control, platform }) => {
    let style = {
        fontSize: control.textSize
    };
    if (control.textColor !== '') {
        style.color = control.textColor;
    }
    return (
        <div className={`control-edit-text expanded ${platform}`} style={style}>
            <div className="control-content">
                {control.title !== '' &&
                    <span className="title">{control.title}</span>
                }
                {control.title === '' &&
                    <span className="placeholder">{control.placeholder}</span>
                }
            </div>
        </div>
    );
}

export default uiPhoneControlTextEdit;