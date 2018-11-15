import React from 'react';
import { ANDROIDWEAR } from '../../../../../Constants';

const Button = ({ control, platform }) => {
    let style = {};
    if (platform === ANDROIDWEAR) {
        style = {
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 8px)',
            marginTop: '4px',
            marginBottom: '4px',
            marginLeft: '8px',
            marginRight: '8px'
        }
    }
    return (
        <div className={`control-watch-button ${platform}`} style={style}>
            <div className="control-content">{control.title}</div>
        </div>
    );
}

export default Button;