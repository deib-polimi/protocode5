import React from 'react';
import { Form } from 'react-bootstrap';
import { ControlNumber } from '../utils/FormKit';

const SpacingTab = ({ uiPhoneControl, onEdit, enableMargin, enablePadding }) => (
    <Form>
        <ControlNumber
            caption="Margin Top"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.marginTop}
            disabled={!enableMargin}
            onChange={value => onEdit('marginTop', value)}
        />
        <ControlNumber
            caption="Margin Bottom"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.marginBottom}
            disabled={!enableMargin}
            onChange={value => onEdit('marginBottom', value)}
        />
        <ControlNumber
            caption="Margin Left"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.marginLeft}
            disabled={!enableMargin}
            onChange={value => onEdit('marginLeft', value)}
        />
        <ControlNumber
            caption="Margin Right"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.marginRight}
            disabled={!enableMargin}
            onChange={value => onEdit('marginRight', value)}
        />
        <br />
        <ControlNumber
            caption="Padding Top"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.paddingTop}
            disabled={!enablePadding}
            onChange={value => onEdit('paddingTop', value)}
        />
        <ControlNumber
            caption="Padding Bottom"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.paddingBottom}
            disabled={!enablePadding}
            onChange={value => onEdit('paddingBottom', value)}
        />
        <ControlNumber
            caption="Padding Left"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.paddingLeft}
            disabled={!enablePadding}
            onChange={value => onEdit('paddingLeft', value)}
        />
        <ControlNumber
            caption="Padding Right"
            min={0}
            max={1000}
            size="sm"
            value={uiPhoneControl.paddingRight}
            disabled={!enablePadding}
            onChange={value => onEdit('paddingRight', value)}
        />
    </Form>
);

export default SpacingTab;