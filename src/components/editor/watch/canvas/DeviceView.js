import React, { Component } from 'react';
import '../../../../style/device-style.scss';
import '../../../../style/android-style.scss';
import '../../../../style/ios-style.scss';
import WatchControllerView from './WatchControllerView';

class DeviceView extends Component {
    render() {
        let { device, zoom, watchController, platform, onCreate, } = this.props;
        let cssClasses = [`smartwatch-view`, device.platform, device.name].join(' ');
        let style = {
            transform: `scale(${zoom / 100}, ${zoom / 100})`,
            margin: 0
        }
        return (
            <div className="device-align">
                <div className={cssClasses} style={style}>
                    <WatchControllerView
                        onCreate={onCreate}
                        watchController={watchController}
                        platform={platform}
                    />
                </div>
            </div>
        );
    }
}

export default DeviceView;