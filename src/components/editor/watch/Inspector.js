import React from 'react';
import { WATCH_LABEL, WATCH_BUTTON, WATCH_SLIDER, WATCH_SWITCH, WATCH_VOICE, WATCH_CLICK_LISTENER } from '../../../Constants';
import LabelInspector from './Inspector/Label';
import ButtonInspector from './Inspector/Button';
import SwitchInspector from './Inspector/Switch';
import VoiceInspector from './Inspector/Voice';
import SliderInspector from './Inspector/Slider';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { faLevelUpAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';

const Contents = {
    [WATCH_LABEL]: LabelInspector,
    [WATCH_BUTTON]: ButtonInspector,
    [WATCH_SLIDER]: SliderInspector,
    [WATCH_SWITCH]: SwitchInspector,
    [WATCH_VOICE]: VoiceInspector
}

const Inspector = ({ watchController, controlId, onEdit, onDelete, onCreate, watchControllers }) => {
    let control = watchController.controls.find(control => control.id === controlId);
    if (control) {
        let Content = Contents[control.watchControlType];
        if (Content) {

            return (<Card className="w-100">
                <Card.Header>
                    <LinkContainer to={`/editor/watch/${watchController.id}`}>
                        <Button variant="light" className="mr-2">
                            <FontAwesomeIcon icon={faLevelUpAlt} />
                        </Button>
                    </LinkContainer>
                    {control.name}
                </Card.Header>
                <Card.Body>
                    <Content
                        watchController={watchController}
                        watchControllers={watchControllers}
                        control={control}
                        onEdit={(prop, value) => onEdit(control.watchControlType, control.id, prop, value)}
                        onNavigationCreate={(...args) => onCreate(WATCH_CLICK_LISTENER, ...args)}
                        onNavigationEdit={(...args) => onEdit(WATCH_CLICK_LISTENER, ...args)}
                        onNavigationDelete={(...args) => onDelete(WATCH_CLICK_LISTENER, ...args)}
                    />
                </Card.Body>
                <Card.Footer>
                    <Button variant="light" onClick={() => onDelete(control.watchControlType, control.id)}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </Card.Footer>
            </Card>);
        } else {
            return <></>
        }
    } else {
        return <Redirect to={`/editor/watch/${watchController.id}`} />
    }
}

export default Inspector;