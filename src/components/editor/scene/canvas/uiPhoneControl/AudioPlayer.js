import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faPause, faStop } from '@fortawesome/free-solid-svg-icons';

const uiPhoneControlAudioPlayer = ({ platform }) => {
    return (
        <div className={`control-audio-player-view expanded ${platform}`}>
            <div class="control-content">
                <div id="play-button" className="control-button">
                    <div className="control-content">
                        <span>
                            <FontAwesomeIcon icon={faPlay} />
                        </span>
                    </div>
                </div>
                <div id="pause-button" className="control-button">
                    <div class="control-content">
                        <span>
                            <FontAwesomeIcon icon={faPause} />
                        </span>
                    </div>
                </div>
                <div id="stop-button" className="control-button">
                    <div class="control-content">
                        <span>
                            <FontAwesomeIcon icon={faStop} />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default uiPhoneControlAudioPlayer;