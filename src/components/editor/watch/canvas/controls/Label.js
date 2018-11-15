import React from 'react';

const Label = ({ control, platform }) => (
    <div className={`control-watch-label ${platform} ${control.textAlign}`}>
        <div className="control-content">
            {control.textDecoration === 'bold' && <b>{control.title}</b>}
            {control.textDecoration === 'italic' && <i>{control.title}</i>}
            {control.textDecoration === 'none' && control.title}
        </div>
    </div>
)

export default Label;