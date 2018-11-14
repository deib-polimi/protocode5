import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

const uiPhoneControlImageView = ({ platform }) => {
    return (
        <div className={`control-image-view expanded ${platform}`}>
            <div className="control-content">
                <FontAwesomeIcon icon={faImage} size="2x"/>
            </div>
        </div>
    );
}

export default uiPhoneControlImageView;