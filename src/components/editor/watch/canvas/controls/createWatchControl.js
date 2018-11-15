import React from 'react';
import { WATCH_BUTTON, WATCH_LABEL, WATCH_SLIDER, WATCH_SWITCH, WATCH_VOICE } from '../../../../../Constants';
import Button from './Button';
import Label from './Label';
import Slider from './Slider';
import Switch from './Switch';
import { Route } from 'react-router-dom';

const Controls = {
    [WATCH_BUTTON]: Button,
    [WATCH_LABEL]: Label,
    [WATCH_SLIDER]: Slider,
    [WATCH_SWITCH]: Switch,
    [WATCH_VOICE]: Button
}

export default function createWatchControlElement(watchController, control, platform) {
    let Template = Controls[control.watchControlType];
    let style = {
        width: '100%',
        height: control.height
    }
    return (
        <Route key={control.id} render={({history}) => (
            <div className={`ui-watch-control`} style={style} onClick={() => history.push(`/editor/watch/${watchController.id}/${control.watchControlType}/${control.id}`)}>
                <Template control={control} platform={platform} />
            </div>
        )}
        />
    );
}