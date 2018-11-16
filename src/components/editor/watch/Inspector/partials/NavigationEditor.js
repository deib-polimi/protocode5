import React from 'react';
import { ControlSelect } from '../utils/FormKit';
import { Form, Col, Button, Row } from 'react-bootstrap';

const NavigationEditor = ({ navigation, watchControllers, onCreate, onEdit, onDelete }) => {
    console.log(navigation);
    if (navigation) {
        let v = 'xxx';
        if (navigation.destinationId) {
            v = 'vc:' + navigation.toViewControllerId;
        }
        let processChange = (valStr) => {
            let [type, id] = valStr.split(':');
            if (type === 'vc') {
                onEdit(id);
            }
            else if (type === 'none' ) {
                onDelete();
            }
        }
        return (
            <ControlSelect caption="Navigation" value={v} onChange={processChange}>
                <option value="xxx" disabled>Select target</option>
                {watchControllers && watchControllers.map(wc => (
                    <option key={wc.id} value={`vc:${wc.id}`}>{wc.name}</option>
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