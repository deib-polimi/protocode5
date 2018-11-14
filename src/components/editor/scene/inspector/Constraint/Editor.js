import React from 'react';
import { Alert, Form, ButtonGroup, Button, Collapse, Card, Col } from 'react-bootstrap';
import { CONSTRAINT_INVALID_INCOMPLETE, CONSTRAINT_INVALID_LOOP, SIDE_TOP, SIDE_BOTTOM, SIDE_START, SIDE_END, SIDE_CENTER_X, SIDE_CENTER_Y, CONTROL_CHAIN_AXIS_HORIZONTAL } from '../../../../../Constants';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Redirect } from 'react-router-dom';
import { BackLink } from '../utils/FormKit';

// Which sides of the ref element can I choose, given a side of the target element?
// Target is the element to which constraint is applied, ref is the element to which
// the element is aligned to.
const SideCompatibility = {
    [SIDE_TOP]: [SIDE_TOP, SIDE_BOTTOM],
    [SIDE_BOTTOM]: [SIDE_TOP, SIDE_BOTTOM],
    [SIDE_CENTER_Y]: [SIDE_CENTER_Y],
    [SIDE_START]: [SIDE_START, SIDE_END],
    [SIDE_END]: [SIDE_START, SIDE_END],
    [SIDE_CENTER_X]: [SIDE_CENTER_X],
    "": []
};

const ConstraintEditor = ({ scene, viewController, uiPhoneControlId, constraintId, onEdit, onDelete }) => {
    let uiPhoneControl = viewController.controls.find(c => c.id === uiPhoneControlId);
    let constraint = uiPhoneControl.constraints.find(c => c.id === constraintId) || null;
    if (constraint === null) {
        if (scene) {
            return (
                <Redirect to={`/editor/scenes/${scene.id}/viewControllers/${viewController.id}`} />
            );
        } else {
            return (
                <Redirect to={`/editor/scenes/viewControllers/${viewController.id}`} />
            );
        }
    }
    // Which sides of target element are still unconstrained?
    let sides = {
        [SIDE_TOP]: true,
        [SIDE_BOTTOM]: true,
        [SIDE_START]: true,
        [SIDE_END]: true,
        [SIDE_CENTER_X]: true,
        [SIDE_CENTER_Y]: true
    };
    // Some are already constrained...
    uiPhoneControl.constraints.forEach(c => {
        if (c.id !== constraintId) {
            switch (c.side) {
                case SIDE_TOP:
                case SIDE_BOTTOM:
                    delete sides[SIDE_CENTER_Y];
                    break;
                case SIDE_CENTER_Y:
                    delete sides[SIDE_TOP];
                    delete sides[SIDE_BOTTOM];
                    break;
                case SIDE_START:
                case SIDE_END:
                    delete sides[SIDE_CENTER_X];
                    break;
                case SIDE_CENTER_X:
                    delete sides[SIDE_START];
                    delete sides[SIDE_END];
                    break;
                default:
                    break;
            }
            delete sides[c.side];
        }
    })
    // ...and some others are implicitely constrained by control chains!
    if (uiPhoneControl.controlChain) {
        if (uiPhoneControl.controlChain.axis === CONTROL_CHAIN_AXIS_HORIZONTAL) {
            delete sides[SIDE_START];
            delete sides[SIDE_END];
            delete sides[SIDE_CENTER_X];
        } else {
            delete sides[SIDE_TOP];
            delete sides[SIDE_BOTTOM];
            delete sides[SIDE_CENTER_Y];
        }
    }
    return (
        <Card className="w-100">
            <Card.Header>
                <BackLink scene={scene} viewController={viewController} controlType={uiPhoneControl.uiPhoneControlType} controlId={uiPhoneControl.id} />
                {constraint.name}
            </Card.Header>
            <Card.Body>
                {constraint.valid === CONSTRAINT_INVALID_INCOMPLETE &&
                    <Alert variant="danger">
                        <p>Invalid constraint attributes</p>
                        <hr />
                        <p>This constraint will not be active nor it will be exported in the model.</p>
                    </Alert>
                }
                {constraint.valid === CONSTRAINT_INVALID_LOOP &&
                    <Alert variant="danger">
                        <p>This constraint is in confict with another constraint</p>
                        <hr />
                        <p>It will not be active nor it will be exported in the model.</p>
                    </Alert>
                }
                <Form>
                    <Form.Group as={Form.Row}>
                        <Form.Label column sm={4}>Layout edge</Form.Label>
                        <Col sm={8}>
                            <SmartFormControl as="select" value={constraint.side || "undefined"} onChange={val => onEdit(constraintId, 'side', val)}>
                                <option value={"undefined"} disabled>Select edge</option>
                                {Object.keys(sides).map(side => (
                                    <option key={side} value={side}>{side}</option>
                                ))}
                            </SmartFormControl>
                        </Col>
                    </Form.Group>
                    <ButtonGroup size="sm" className="mb-2 mt-2">
                        <Button
                            variant={constraint.refId === null ? 'dark' : 'light'}
                            onClick={() => onEdit(constraintId, 'refId', null)}>
                            {'With parent'}
                        </Button>
                        <Button
                            variant={constraint.refId !== null ? 'dark' : 'light'}
                            onClick={() => onEdit(constraintId, 'refId', undefined)}>
                            {'With another element'}
                        </Button>
                    </ButtonGroup>
                    <Collapse in={constraint.refId !== null}>
                        <div>
                            <Form.Group as={Form.Row}>
                                <Form.Label column sm={4}>ReferenceElement</Form.Label>
                                <Col sm={8}>
                                    <SmartFormControl as="select" value={constraint.refId || "undefined"} onChange={val => onEdit(constraintId, 'refId', val)}>
                                        <option value={"undefined"} disabled>Select reference element</option>
                                        {viewController.controls.filter(c => c.id !== uiPhoneControl.id).map(c => (
                                            <option key={c.id} value={c.id}>{c.name}</option>
                                        ))}
                                    </SmartFormControl>
                                </Col>
                            </Form.Group>
                            <Collapse in={constraint.refId !== undefined}>
                                <div>
                                    <Form.Group as={Form.Row}>
                                        <Form.Label column sm={4}>ReferenceElement</Form.Label>
                                        <Col sm={8}>
                                            <SmartFormControl as="select" value={constraint.refSide || "undefined"} onChange={val => onEdit(constraintId, 'refSide', val)}>
                                                <option value={"undefined"} disabled>Select reference edge</option>
                                                {SideCompatibility[constraint.side || ""].map(side => (
                                                    <option key={side} value={side}>{side}</option>
                                                ))}
                                            </SmartFormControl>
                                        </Col>
                                    </Form.Group>
                                </div>
                            </Collapse>
                        </div>
                    </Collapse>
                </Form>
            </Card.Body>
            <Card.Footer>
                <Button variant="light" onClick={() => { onDelete(constraint.id); }}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                </Button>
            </Card.Footer>
        </Card>
    );
};

export default ConstraintEditor;