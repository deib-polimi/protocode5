import React from 'react';

const uiPhoneControlTimepicker = ({ platform }) => {
    return (
        <div className={`control-timepicker expanded ${platform}`}>
            <div className="control-content">
                <div className="timepicker-image"></div>
            </div>
        </div>
    );
}

export default uiPhoneControlTimepicker;