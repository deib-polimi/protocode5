import React from 'react';

const uiPhoneControlMap = ({ platform }) => {
    return (
        <div className={`control-map expanded ${platform}`}>
            <div class="control-content"></div>
        </div>
    );
}

export default uiPhoneControlMap;