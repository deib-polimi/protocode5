import React from 'react';

const uiPhoneControlSwitch = ({ platform }) => {
    return (
        <div className={`control-switch expanded ${platform}`}>
            <div className="control-content">
                <div className="switch-image"></div>
            </div>
        </div>
    );
}

export default uiPhoneControlSwitch;