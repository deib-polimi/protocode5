import React from 'react';
import { TextId, TextError, TextInfo, TextOk, Indent } from "./Toolkit";
import { CONTROL_CHAIN_AXIS_HORIZONTAL, SIDE_START, SIDE_END, SIDE_CENTER_X, SIDE_CENTER_Y, SIDE_TOP, SIDE_BOTTOM, CONTROL_CHAIN_AXIS_VERTICAL, CONSTRAINT_VALID } from '../../../../Constants';

const PositionSection = ({ positionChecks }) => (
    <div>
        POSITION: <br />
        {positionChecks.map(check => {
            return (
                <React.Fragment key={`Report-${check.control.id}`}>
                    {!check.x && <React.Fragment><span>Control <TextId>{check.control.name}</TextId> <TextError>misses</TextError> an <TextInfo>X-constraint</TextInfo></span><br /></React.Fragment>}
                    {!check.y && <React.Fragment><span>Control <TextId>{check.control.name}</TextId> <TextError>misses</TextError> a <TextInfo>Y-constraint</TextInfo></span><br /></React.Fragment>}
                    {check.x && check.y && <React.Fragment><span>Control <TextId>{check.control.name}</TextId> is <TextOk>well positioned</TextOk></span><br /></React.Fragment>}
                </React.Fragment>
            )
        })}
    </div>
);

const InvalidChainControl = ({ control }) => (
    <>
        <TextError>{control.name}</TextError><br />
    </>
)

const InvalidChain = ({ chain, viewController }) => {
    let members = viewController.controls.filter(c => c.controlChain && c.controlChain.id === chain.id);
    return (
        <React.Fragment key={`Report-${chain.id}`}>
            {`Chain ${chain.id} is `}<TextError>non valid</TextError><br />
            {'So, also the chain\'s controls are not valid:'}
            <Indent>
                {members.map(control => (
                    <InvalidChainControl key={`report-${control.id}`} control={control} />
                ))}
            </Indent>
        </React.Fragment>
    );
}

const InvalidConstraintItem = ({ control, constraint }) => (
    <>
        <TextId>{constraint.name}</TextId>
        {' of '}
        <TextId>{control.name}</TextId>
        {' is '}
        <TextError>non valid</TextError>
        <br />
    </>
);

const InvalidConstraintSet = ({ constraintSet }) => (
    <>
        {constraintSet.invalid.map(constraint => (
            <InvalidConstraintItem key={`Report-${constraint.id}`} control={constraintSet.control} constraint={constraint} />
        ))}
    </>
)

const ViewControllerReport = ({ viewController }) => {
    let positionChecks = viewController.controls.map(control => {
        if (!control.controlChain || control.controlChain.valid) {
            let out = { control, x: false, y: false };
            if (control.controlChain && control.controlChain.axis === CONTROL_CHAIN_AXIS_HORIZONTAL) out.x = true;
            else if (control.controlChain && control.controlChain.axis === CONTROL_CHAIN_AXIS_VERTICAL) out.y = true;
            control.constraints.filter(c => c.valid === CONSTRAINT_VALID).forEach(constraint => {
                if (constraint.side === SIDE_START || constraint.side === SIDE_END || constraint.side === SIDE_CENTER_X)
                    out.x = true;
                if (constraint.side === SIDE_TOP || constraint.side === SIDE_BOTTOM || constraint.side === SIDE_CENTER_Y)
                    out.y = true;
            });
            return out;
        } else {
            return null;
        }
    }).filter(item => !!item);
    let invalidChains = viewController.controlChains.filter(c => !c.valid);
    let invalidConstraints = viewController.controls
        .map(control => {
            return {
                control: control,
                invalid: control.constraints.filter(constr => constr.valid !== CONSTRAINT_VALID)
            }
        })
        .filter(control => control.invalid.length > 0);
    return (
        <div>
            <b>REPORT</b> viewController <TextId>{viewController.name}</TextId>: <br />
            <Indent>
                <PositionSection positionChecks={positionChecks} />
            </Indent>
            <Indent>
                <div>
                    INVALID OBJECTS (not exported in the model):
                    <Indent>
                        <div>
                            Control chains:<br />
                            {viewController.controlChains.length > 0 && invalidChains.length === 0 &&
                                <TextOk>All valid</TextOk>
                            }
                            {viewController.controlChains.length === 0 &&
                                'No control chains in this view controller'
                            }
                            {viewController.controlChains.length > 0 && invalidChains.length > 0 &&
                                invalidChains.map(chain => (
                                    <InvalidChain key={`Report-${chain.id}`} chain={chain} viewController={viewController} />
                                ))
                            }
                        </div>
                    </Indent>
                    <Indent>
                        <div>
                            Constraints:<br />
                            {viewController.controls.length === 0 && 'No controls in this view controller'}
                            {viewController.controls.length > 0 && invalidConstraints.length > 0 &&
                                invalidConstraints.map(constraintSet => (
                                    <InvalidConstraintSet key={`Report-${constraintSet.control.id}`} constraintSet={constraintSet} />
                                ))
                            }
                            {viewController.controls.length > 0 && invalidConstraints.length === 0 &&
                                <TextOk>All valid</TextOk>
                            }
                        </div>
                    </Indent>
                </div>
            </Indent>
        </div>
    );
}

export default ViewControllerReport;