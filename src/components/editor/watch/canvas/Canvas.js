import React from 'react';
import { SmartWatches } from '../../../../devices/Devices';
import DeviceSelector from '../../common/DeviceSelector';
import Palette from '../../common/Palette';
import Controls from '../palette/Controls';
import Preview from './Preview';

const Canvas = ({ app, watchController, onCreate, device, platform, onDeviceChange, onPlatformChange }) => (
    <>
        <DeviceSelector
            devices={[
                ...SmartWatches
            ]}
            className="mb-2"
            platform={platform}
            device={device}
            onPlatformChange={onPlatformChange}
            onDeviceChange={onDeviceChange}
        />
        <Palette
            className="mb-2"
            title="UiWatchControls (Drag 'n' Drop)"
            platform={platform}
            controls={Controls}
        />
        <Preview app={app} watchController={watchController} onCreate={onCreate} platform={platform} device={device} />
    </>
);

export default Canvas;