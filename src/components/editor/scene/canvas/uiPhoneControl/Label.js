import React from 'react';

export default function uiPhoneControlLabel({ control }) {
    let title = control.title;
    let style = {};
    style.color = control.textColor;
    style.fontSize = control.textSize;
    if (control.textDecoration === 'bold') style.fontWeight = 'bold';
    if (control.textDecoration === 'italic') style.fontStyle = 'italic';
    style.textAlign = control.textAlign;
    switch (control.textAlign) {
        case 'right':
            style.justifyContent = 'flex-end';
            break;
        case 'center':
            style.justifyContent = 'center';
            break;
        case 'left':
        default:
            style.justifyContent = 'flex-start';
    }
    return (
        <div className="w-100 h-100 d-flex align-items-center" style={style}>
            {title}
        </div>
    );
}