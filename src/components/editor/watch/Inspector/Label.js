import React from 'react';
import { Tab, Nav, Form, Button, ButtonGroup, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faExpand, faFont, faBold, faItalic, faAlignLeft, faAlignCenter, faAlignRight } from '@fortawesome/free-solid-svg-icons';
import DimensionTab from './utils/DimensionTab';
import { ControlText } from './utils/FormKit';

const LabelInspector = ({ control, onEdit }) => (
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
                    <ControlText caption="Title" value={control.title} onChange={value => onEdit('title', value)} />
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Text Decoration</Form.Label>
                        <Col sm={8}>
                            <ButtonGroup>
                                <Button variant={control.textDecoration === 'none' ? 'dark' : 'light'} onClick={() => onEdit('textDecoration', 'none')}>
                                    <FontAwesomeIcon icon={faFont} />
                                </Button>
                                <Button variant={control.textDecoration === 'bold' ? 'dark' : 'light'} onClick={() => onEdit('textDecoration', 'bold')}>
                                    <FontAwesomeIcon icon={faBold} />
                                </Button>
                                <Button variant={control.textDecoration === 'italic' ? 'dark' : 'light'} onClick={() => onEdit('textDecoration', 'italic')}>
                                    <FontAwesomeIcon icon={faItalic} />
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row}>
                        <Form.Label column sm={4}>Text Align</Form.Label>
                        <Col sm={8}>
                            <ButtonGroup>
                                <Button variant={control.textAlign === 'left' ? 'dark' : 'light'} onClick={() => onEdit('textAlign', 'left')}>
                                    <FontAwesomeIcon icon={faAlignLeft} />
                                </Button>
                                <Button variant={control.textAlign === 'center' ? 'dark' : 'light'} onClick={() => onEdit('textAlign', 'center')}>
                                    <FontAwesomeIcon icon={faAlignCenter} />
                                </Button>
                                <Button variant={control.textAlign === 'right' ? 'dark' : 'light'} onClick={() => onEdit('textAlign', 'right')}>
                                    <FontAwesomeIcon icon={faAlignRight} />
                                </Button>
                            </ButtonGroup>
                        </Col>
                    </Form.Group>
                </Form>
            </Tab.Pane>
            <Tab.Pane eventKey="dimension">
                <DimensionTab control={control} onEdit={onEdit} />
            </Tab.Pane>
        </Tab.Content>
    </Tab.Container>
);

export default LabelInspector;