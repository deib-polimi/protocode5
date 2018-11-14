import React from 'react';

const uiPhoneControlWebview = ({ platform }) => {
    return (
        <div className={`control-web-view expanded ${platform}`}>
            <div className="control-content"></div>
        </div>
    );
}

export default uiPhoneControlWebview;