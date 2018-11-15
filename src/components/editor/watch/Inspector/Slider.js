import React from 'react';
import { Tab, Nav, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faExpand } from '@fortawesome/free-solid-svg-icons';
import DimensionTab from './utils/DimensionTab';
import { ControlText } from './utils/FormKit';

const SliderInspector = ({ control, onEdit }) => (
    <Tab.Container id="props-editor" defaultActiveKey="main">
        <Nav variant="tabs" className="border-bottom mb-3">
            <Nav.Item>
                <Nav.Link eventKey="main">
                    <FontAwesomeIcon icon={faPencilAlt} />
                </Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link eventKey="dimension">
                    <FontAwesomeIcon icon={faExpand} />
                </Nav.Link>
            </Nav.Item>
        </Nav>
        <Tab.Content>
            <Tab.Pane eventKey="main">
                <Form>
                    <ControlText caption="Name" value={control.name} onChange={value => onEdit('name', value)} />
                </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="dimension">
                <DimensionTab control={control} onEdit={onEdit} />
            </Tab.Pane>
        </Tab.Content>
    </Tab.Container>
);

export default SliderInspector;