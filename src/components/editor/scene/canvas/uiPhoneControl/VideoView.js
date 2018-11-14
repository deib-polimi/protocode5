import React from 'react';

const uiPhoneControlVideoView = ({ platform }) => {
    return (
        <div className={`control-video-view expanded ${platform}`}>
            <div className="control-content"></div>
        </div>
    );
}

export default uiPhoneControlVideoView;