import { faListUl, faPencilAlt, faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Alert, Button, Card, Col, Form, ListGroup, Row, Tab } from 'react-bootstrap';
import { CONTROL_CHAIN_AXIS_HORIZONTAL, CONTROL_CHAIN_AXIS_VERTICAL, CONTROL_CHAIN_POSSIBLE_MEMBERS, CONTROL_CHAIN_TYPE_PACKED, CONTROL_CHAIN_TYPE_SPREAD, CONTROL_CHAIN_TYPE_SPREAD_INSIDE, CONTROL_CHAIN_TYPE_WEIGHTED } from '../../../../../Constants';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import { CommonNav } from '../partials/CommonNav';
import { BackLink, ControlNumber } from '../utils/FormKit';

const MemberGroup = ({ members, onControlEdit }) => {
    if (members.length > 0) {
        return (
            <ListGroup variant="flush">
                {members.map(member => (
                    <ListGroup.Item key={member.id}>
                        <Form.Group as={Row}>
                            <Form.Label column sm={8}>
                                {member.name}
                            </Form.Label>
                            <Col sm={4}>
                                <SmartFormControl
                                    value={member.controlChainWeight}
                                    onChange={val => onControlEdit(member, parseInt(val))}
                                    type="number"
                                    min={1}
                                />
                            </Col>
                        </Form.Group>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        )
    }
    else {
        return <></>;
    }
}

export default class ControlChainEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: CONTROL_CHAIN_POSSIBLE_MEMBERS[0]
        }
        this.changeSelection = this.changeSelection.bind(this);
        this.createSelected = this.createSelected.bind(this);
    }
    changeSelection(value) {
        this.setState({
            selected: value
        });
    }
    createSelected() {
        this.props.onCreate(this.state.selected, this.props.viewController.id, this.props.control.id);
    }
    render() {
        const { control, viewController, onEdit, onControlEdit, onDelete } = this.props;
        let chain = control;
        let members = viewController.controls.filter(c => c.controlChain && c.controlChain.id === chain.id);
        let isSomeMemberConstrained = members.some(member => member.constraints.length > 0);
        members.sort((a, b) => a.controlChainPosition - b.controlChainPosition);
        return (
            <Card className="w-100">
                <Card.Header>
                    <BackLink scene={this.props.scene} viewController={this.props.viewController} />
                    Control chain {chain.id}
                </Card.Header>
                <Card.Body>
                    {!chain.valid &&
                        <Alert variant="danger">
                            <p>Control chain is invalid</p>
                            <hr />
                            <p>Please add 2 or more controls</p>
                        </Alert>
                    }
                    <Tab.Container id="chain-props-editor" defaultActiveKey="main">
                        <CommonNav items={[
                            { eventKey: 'main', icon: faPencilAlt }, 
                            { eventKey: 'members', icon: faListUl }
                        ]} />
                        <Tab.Content>
                            <Tab.Pane eventKey="main">
                                {isSomeMemberConstrained &&
                                    <Alert variant="warning">
                                        <p>Some members have constraints on them, you won't be able to change the axis of the chain unless you remove those constraints</p>
                                    </Alert>
                                }
                                <Form>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={4}>Axis</Form.Label>
                                        <Col sm={8}>
                                            <SmartFormControl as="select" value={chain.axis} onChange={value => onEdit('axis', value)} disabled={isSomeMemberConstrained}>
                                                <option value={CONTROL_CHAIN_AXIS_HORIZONTAL}>Horizontal (X)</option>
                                                <option value={CONTROL_CHAIN_AXIS_VERTICAL}>Vertical (Y)</option>
                                            </SmartFormControl>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group as={Row}>
                                        <Form.Label column sm={4}>Type</Form.Label>
                                        <Col sm={8}>
                                            <SmartFormControl as="select" value={chain.type} onChange={value => onEdit('type', value)}>
                                                <option value={CONTROL_CHAIN_TYPE_SPREAD}>Spread</option>
                                                <option value={CONTROL_CHAIN_TYPE_SPREAD_INSIDE}>Spread inside</option>
                                                <option value={CONTROL_CHAIN_TYPE_PACKED}>Packed</option>
                                                <option value={CONTROL_CHAIN_TYPE_WEIGHTED}>Weighted</option>
                                            </SmartFormControl>
                                        </Col>
                                    </Form.Group>
                                    <ControlNumber
                                        caption="Spacing"
                                        min={0}
                                        value={chain.spacing}
                                        onChange={value => onEdit('spacing', value)}
                                        disabled={chain.type !== CONTROL_CHAIN_TYPE_PACKED && chain.type !== CONTROL_CHAIN_TYPE_WEIGHTED}
                                    />
                                    <ControlNumber
                                        caption="Bias"
                                        step={0.05}
                                        min={0}
                                        max={1}
                                        value={chain.bias}
                                        parser={parseFloat}
                                        onChange={value => onEdit('bias', value)}
                                        disabled={chain.type !== CONTROL_CHAIN_TYPE_PACKED}
                                    />
                                </Form>
                            </Tab.Pane>
                            <Tab.Pane eventKey="members">
                                <p><b>Ui Phone Controls</b></p>
                                <Form>
                                    <MemberGroup members={members} onControlEdit={onControlEdit} />
                                    <Form.Group as={Row}>
                                        <Col sm={8}>
                                            <SmartFormControl
                                                as="select"
                                                value={this.state.selected}
                                                onChange={this.changeSelection}
                                            >
                                                {CONTROL_CHAIN_POSSIBLE_MEMBERS.map(uiPhoneControlType => (
                                                    <option key={uiPhoneControlType} value={uiPhoneControlType}>{uiPhoneControlType}</option>
                                                ))}
                                            </SmartFormControl>
                                        </Col>
                                        <Col sm={4}>
                                            <Button variant="success" onClick={this.createSelected}>
                                                <FontAwesomeIcon icon={faPlus} />
                                            </Button>
                                        </Col>
                                    </Form.Group>
                                </Form>
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </Card.Body>
                <Card.Footer>
                    <Button variant="light" onClick={onDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}