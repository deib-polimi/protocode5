import React from 'react';
import { Form } from 'react-bootstrap';
import { ControlNumber } from './FormKit';

const DimensionTab = ({ control, onEdit }) => {
    return (
        <Form>
            <ControlNumber
                min={control.minHeight}
                value={control.height}
                caption="Height"
                onChange={value => onEdit('height', value)}
            />
        </Form>
    );
}

export default DimensionTab;