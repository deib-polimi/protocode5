import React from 'react';
import { ControlSelect } from '../utils/FormKit';
import { Form, Col, Button, Row } from 'react-bootstrap';

const NavigationEditor = ({ navigation, scenes, viewControllers, onCreate, onEdit, onDelete }) => {
    if (navigation) {
        let v = 'xxx';
        if (navigation.toViewControllerId) {
            v = 'vc:' + navigation.toViewControllerId;
        }
        else if (navigation.toSceneId) {
            v = 'scene:' + navigation.toSceneId;
        }
        let processChange = (valStr) => {
            let [type, id] = valStr.split(':');
            if (type === 'scene') {
                onEdit(id, null);
            } 
            else if (type === 'vc') {
                onEdit(null, id);
            }
            else if (type === 'none' ) {
                onDelete();
            }
        }
        return (
            <ControlSelect caption="Navigation" value={v} onChange={processChange}>
                <option value="xxx" disabled>Select target</option>
                {scenes && scenes.map(scene => (
                    <option key={scene.id} value={`scene:${scene.id}`}>{scene.name}</option>
                ))}
                {viewControllers && viewControllers.map(vc => (
                    <option key={vc.id} value={`vc:${vc.id}`}>{vc.name}</option>
                ))}
                <option value="none:">No navigation</option>
            </ControlSelect>
        );
    } else {
        return (
            <Form.Group as={Row}>
                <Form.Label column sm={4}>Navigation</Form.Label>
                <Col sm={8}>
                    <Button variant="light" size="sm" onClick={onCreate}>Add navigation</Button>
                </Col>
            </Form.Group>
        )
    }
}

export default NavigationEditor;