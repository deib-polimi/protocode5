import React from 'react';

const Switch = ({ control, platform }) => {
    let style = {};
    return (
        <div className={`control-watch-switch ${platform}`} style={style}>
            <div className="control-content">
                <div className="watch-switch-title">{control.title}</div>
                <div className="watch-switch-image"></div>
            </div>
        </div>
    );
}

export default Switch;