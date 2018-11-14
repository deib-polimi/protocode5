import React from 'react';
import { Form, Col, InputGroup, ButtonGroup, Button } from 'react-bootstrap';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';

const DimensionTab = ({ uiPhoneControl, onEdit }) => {
    let {widthMode, heightMode, ratioMode } = uiPhoneControl;
    let enableWidthMode = ratioMode === 'auto' || heightMode === 'auto';
    let enableHeightMode = ratioMode === 'auto' || widthMode === 'auto';
    let enableRatioMode = widthMode === 'auto' || heightMode === 'auto';
    return (
    <Form>
        <Form.Group as={Form.Row}>
            <Form.Label column sm={3}>Width</Form.Label>
            <Col sm={5}>
                {uiPhoneControl.widthMode === 'exact' &&
                    <InputGroup size="sm">
                        <SmartFormControl
                            type="number"
                            min={0}
                            max={10000}
                            value={uiPhoneControl.width.toString()}
                            onChange={val => onEdit('width', parseInt(val))}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>pt</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                }
                {uiPhoneControl.widthMode === 'percent' &&
                    <InputGroup size="sm">
                        <SmartFormControl
                            type="number"
                            min={0}
                            max={100}
                            value={uiPhoneControl.width.toString()}
                            onChange={val => onEdit('width', parseInt(val))}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                }
                {uiPhoneControl.widthMode === 'auto' &&
                    <span>Automatic</span>
                }
            </Col>
            <Col sm={4}>
                <ButtonGroup size="sm">
                    <Button 
                        variant={uiPhoneControl.widthMode === 'exact' ? 'dark' : 'light'}
                        onClick={() => enableWidthMode && onEdit('widthMode', 'exact')}
                    >pt</Button>
                    <Button 
                        variant={uiPhoneControl.widthMode === 'percent' ? 'dark' : 'light'}
                        onClick={() => enableWidthMode && onEdit('widthMode', 'percent')}
                    >%</Button>
                    <Button 
                        variant={uiPhoneControl.widthMode === 'auto' ? 'dark' : 'light'}
                        onClick={() => enableWidthMode && onEdit('widthMode', 'auto')}
                    >auto</Button>
                </ButtonGroup>
            </Col>
        </Form.Group>
        <Form.Group as={Form.Row}>
            <Form.Label column sm={3}>Height</Form.Label>
            <Col sm={5}>
                {uiPhoneControl.heightMode === 'exact' &&
                    <InputGroup size="sm">
                        <SmartFormControl
                            type="number"
                            min={0}
                            max={10000}
                            value={uiPhoneControl.height.toString()}
                            onChange={val => onEdit('height', parseInt(val))}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>pt</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                }
                {uiPhoneControl.heightMode === 'percent' &&
                    <InputGroup size="sm">
                        <SmartFormControl
                            type="number"
                            min={0}
                            max={100}
                            value={uiPhoneControl.height.toString()}
                            onChange={val => onEdit('height', parseInt(val))}
                        />
                        <InputGroup.Append>
                            <InputGroup.Text>%</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                }
                {uiPhoneControl.heightMode === 'auto' &&
                    <span>Automatic</span>
                }
            </Col>
            <Col sm={4}>
                <ButtonGroup size="sm">
                    <Button 
                        variant={uiPhoneControl.heightMode === 'exact' ? 'dark' : 'light'}
                        onClick={() => enableHeightMode && onEdit('heightMode', 'exact')}
                    >pt</Button>
                    <Button 
                        variant={uiPhoneControl.heightMode === 'percent' ? 'dark' : 'light'}
                        onClick={() => enableHeightMode && onEdit('heightMode', 'percent')}
                    >%</Button>
                    <Button 
                        variant={uiPhoneControl.heightMode === 'auto' ? 'dark' : 'light'}
                        onClick={() => enableHeightMode && onEdit('heightMode', 'auto')}
                    >auto</Button>
                </ButtonGroup>
            </Col>
        </Form.Group>
        <Form.Group as={Form.Row}>
            <Form.Label column sm={3}>Aspect ratio</Form.Label>
            <Col sm={5}>
                {uiPhoneControl.ratioMode === 'exact' &&
                    <InputGroup size="sm">
                        <SmartFormControl
                            type="number"
                            min={0}
                            max={10000}
                            value={uiPhoneControl.ratioWidth.toString()}
                            onChange={val => onEdit('ratioWidth', parseInt(val))}
                        />
                        <InputGroup.Text>:</InputGroup.Text>
                        <SmartFormControl
                            type="number"
                            min={0}
                            max={10000}
                            value={uiPhoneControl.ratioHeight.toString()}
                            onChange={val => onEdit('ratioHeight', parseInt(val))}
                        />
                    </InputGroup>
                }
                {uiPhoneControl.ratioMode === 'auto' &&
                    <span>Automatic</span>
                }
            </Col>
            <Col sm={4}>
                <ButtonGroup size="sm">
                    <Button 
                        variant={uiPhoneControl.ratioMode === 'exact' ? 'dark' : 'light'}
                        onClick={() => enableRatioMode && onEdit('ratioMode', 'exact')}
                    >fixed</Button>
                    <Button 
                        variant={uiPhoneControl.ratioMode === 'auto' ? 'dark' : 'light'}
                        onClick={() => enableRatioMode && onEdit('ratioMode', 'auto')}
                    >auto</Button>
                </ButtonGroup>
            </Col>
        </Form.Group>
    </Form>
)};

export default DimensionTab;