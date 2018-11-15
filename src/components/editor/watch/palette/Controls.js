import { WATCH_BUTTON, WATCH_SWITCH, WATCH_VOICE, WATCH_SLIDER, WATCH_LABEL } from "../../../../Constants";
import AndroidButton from '../../../../img/ui_watch_controls/androidwear/watch_button.png';
import AndroidLabel from '../../../../img/ui_watch_controls/androidwear/watch_label.png';
import AndroidSlider from '../../../../img/ui_watch_controls/androidwear/watch_slider.png';
import AndroidSwitch from '../../../../img/ui_watch_controls/androidwear/watch_switch.png';
import AndroidVoice from '../../../../img/ui_watch_controls/androidwear/watch_voice_message.png';
import WatchOSButton from '../../../../img/ui_watch_controls/watchos/watch_button.png';
import WatchOSLabel from '../../../../img/ui_watch_controls/watchos/watch_label.png';
import WatchOSSlider from '../../../../img/ui_watch_controls/watchos/watch_slider.png';
import WatchOSSwitch from '../../../../img/ui_watch_controls/watchos/watch_switch.png';
import WatchOSVoice from '../../../../img/ui_watch_controls/watchos/watch_voice_message.png';

export default [
    { type: WATCH_BUTTON, label: 'Button', androidwear: AndroidButton, watchos: WatchOSButton},
    { type: WATCH_LABEL, label: 'Button', androidwear: AndroidLabel, watchos: WatchOSLabel},
    { type: WATCH_SLIDER, label: 'Button', androidwear: AndroidSlider, watchos: WatchOSSlider},
    { type: WATCH_SWITCH, label: 'Button', androidwear: AndroidSwitch, watchos: WatchOSSwitch},
    { type: WATCH_VOICE, label: 'Button', androidwear: AndroidVoice, watchos: WatchOSVoice},
]