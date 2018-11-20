import React, { Component } from 'react';
import Konva from 'konva';
import { Stage, Line, Circle, Layer, Rect } from 'react-konva';
import { SIDE_START, SIDE_TOP, SIDE_BOTTOM, SIDE_CENTER_X, SIDE_END, SIDE_CENTER_Y, MEASURE_MODE_AUTO, CONSTRAINT_VALID, CONTROL_CHAIN_AXIS_HORIZONTAL } from '../../../../Constants';
import ConstraintCalculator from './ConstraintCalculator';

const ComputeXPoints = function (style) {
    return {
        left: style.left,
        mid: style.left + style.width / 2,
        right: style.left + style.width,
        width: style.width
    }
}

const ComputeYPoints = function (style) {
    return {
        top: style.top,
        mid: style.top + style.height / 2,
        bottom: style.top + style.height,
        height: style.height
    }
}

const PositionConstraintsTransform = function (active, constraint, styles, width, height) {
    let activeStyle = styles[active.id];
    let activeX = ComputeXPoints(activeStyle);
    let activeY = ComputeYPoints(activeStyle);
    if (constraint.refId === null) {
        // WITH PARENT
        switch (constraint.side) {
            case SIDE_START:
                return <Line key={constraint.id} x={0} y={0} points={[0, activeY.mid, activeX.left, activeY.mid]} stroke="#00ff00" strokeWidth={2} />
            case SIDE_END:
                return <Line key={constraint.id} x={0} y={0} points={[activeX.right, activeY.mid, width - 1, activeY.mid]} stroke="#00ff00" strokeWidth={2} />
            case SIDE_TOP:
                return <Line key={constraint.id} x={0} y={0} points={[activeX.mid, 0, activeX.mid, activeY.top]} stroke="#00ff00" strokeWidth={2} />
            case SIDE_BOTTOM:
                return <Line key={constraint.id} x={0} y={0} points={[activeX.mid, activeY.bottom, activeX.mid, height - 1]} stroke="#00ff00" strokeWidth={2} />
            case SIDE_CENTER_X:
                return (
                    <React.Fragment key={constraint.id}>
                        <Line x={0} y={0} points={[0, activeY.mid, activeX.left, activeY.mid]} stroke="#00ff00" strokeWidth={2} />
                        <Line x={0} y={0} points={[activeX.right, activeY.mid, width - 1, activeY.mid]} stroke="#00ff00" strokeWidth={2} />
                    </React.Fragment>
                );
            case SIDE_CENTER_Y:
                return (
                    <React.Fragment key={constraint.id}>
                        <Line x={0} y={0} points={[activeX.mid, 0, activeX.mid, activeY.top]} stroke="#00ff00" strokeWidth={2} />
                        <Line x={0} y={0} points={[activeX.mid, activeY.bottom, activeX.mid, height - 1]} stroke="#00ff00" strokeWidth={2} />
                    </React.Fragment>
                )
            default:
                return undefined;
        }
    } else {
        let otherStyle = styles[constraint.refId];
        let otherX = ComputeXPoints(otherStyle);
        let otherY = ComputeYPoints(otherStyle);
        let color = Konva.Util.getRandomColor();
        let draw = [];
        if (constraint.side === SIDE_START || constraint.side === SIDE_CENTER_X) {
            draw.push(<Circle key={`${constraint.id}-1`} x={activeX.left} y={activeY.mid} radius={5} fill={color} />);
            if (constraint.refSide === SIDE_START) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.left} y={otherY.mid} radius={5} fill={color} />);
            }
            else if (constraint.refSide === SIDE_END) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.right} y={otherY.mid} radius={5} fill={color} />);
            }
        }
        if (constraint.side === SIDE_END || constraint.side === SIDE_CENTER_X) {
            draw.push(<Circle key={`${constraint.id}-1`} x={activeX.right} y={activeY.mid} radius={5} fill={color} />);
            if (constraint.refSide === SIDE_START) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.left} y={otherY.mid} radius={5} fill={color} />);
            }
            else if (constraint.refSide === SIDE_END) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.right} y={otherY.mid} radius={5} fill={color} />);
            }
        }
        if (constraint.side === SIDE_TOP || constraint.side === SIDE_CENTER_Y) {
            draw.push(<Circle key={`${constraint.id}-1`} x={activeX.mid} y={activeY.top} radius={5} fill={color} />);
            if (constraint.refSide === SIDE_TOP) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.mid} y={otherY.top} radius={5} fill={color} />);
            }
            else if (constraint.refSide === SIDE_BOTTOM) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.mid} y={otherY.bottom} radius={5} fill={color} />);
            }
        }
        if (constraint.side === SIDE_BOTTOM || constraint.side === SIDE_CENTER_Y) {
            draw.push(<Circle key={`${constraint.id}-1`} x={activeX.mid} y={activeY.bottom} radius={5} fill={color} />);
            if (constraint.refSide === SIDE_TOP) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.mid} y={otherY.top} radius={5} fill={color} />);
            }
            else if (constraint.refSide === SIDE_BOTTOM) {
                draw.push(<Circle key={`${constraint.id}-2`} x={otherX.mid} y={otherY.bottom} radius={5} fill={color} />);
            }
        }
        return (
            <React.Fragment key={constraint.id}>
                {draw}
            </React.Fragment>
        )
    }
}

const DimensionConstraintTransform = function (active, styles) {
    let draw = [];
    let activeX = ComputeXPoints(styles[active.id]);
    let activeY = ComputeYPoints(styles[active.id]);
    if (active.widthMode !== MEASURE_MODE_AUTO) {
        draw.push(
            <Line key={`${active.id}-width-top`} x={activeX.left} y={activeY.top} points={[0, 0, activeX.width, 0]} stroke="#ff0000" strokeWidth={2} />,
            <Line key={`${active.id}-width-bottom`} x={activeX.left} y={activeY.bottom} points={[0, 0, activeX.width, 0]} stroke="#ff0000" strokeWidth={2} />
        );
    }
    if (active.heightMode !== MEASURE_MODE_AUTO) {
        draw.push(
            <Line key={`${active.id}-height-start`} x={activeX.left} y={activeY.top} points={[0, 0, 0, activeY.height]} stroke="#ff0000" strokeWidth={2} />,
            <Line key={`${active.id}-height-end`} x={activeX.right} y={activeY.top} points={[0, 0, 0, activeY.height]} stroke="#ff0000" strokeWidth={2} />
        );
    }
    if (active.ratioMode !== MEASURE_MODE_AUTO) {
        draw.push(
            <Line key={`${active.id}-ratio-topleft-1`} x={activeX.left} y={activeY.top} points={[0, 0, 0, 12]} stroke="#ff0000" strokeWidth={2} />,
            <Line key={`${active.id}-ratio-topleft-2`} x={activeX.left} y={activeY.top} points={[0, 0, 12, 0]} stroke="#ff0000" strokeWidth={2} />,
            <Line key={`${active.id}-ratio-botright-1`} x={activeX.right} y={activeY.bottom} points={[0, 0, 0, -12]} stroke="#ff0000" strokeWidth={2} />,
            <Line key={`${active.id}-ratio-botright-2`} x={activeX.right} y={activeY.bottom} points={[0, 0, -12, 0]} stroke="#ff0000" strokeWidth={2} />
        );
    }
    return (
        <>
            {draw}
        </>
    )
}

const ControlChainTransform = function (active, controls, styles) {
    const chain = active.controlChain;
    if (!chain || !chain.valid) {
        return undefined;
    }
    let members = controls.filter(control => control.controlChainId === chain.id);
    members.sort((a, b) => a.controlChainPosition - b.controlChainPosition);
    const membersX = members.map(m => ComputeXPoints(styles[m.id]));
    const membersY = members.map(m => ComputeYPoints(styles[m.id]));
    let draw = [];
    if (chain.axis === CONTROL_CHAIN_AXIS_HORIZONTAL) {
        for (let i = 0; i < members.length - 1; i++) {
            const firstX = membersX[i], firstY = membersY[i], secondX = membersX[i + 1], secondY = membersY[i + 1];
            draw.push(
                <Rect
                    key={`${chain.id}-${i}-1`}
                    x={firstX.right}
                    y={firstY.mid - 4}
                    width={8}
                    height={8}
                    fill="#a6a6a6"
                    stroke="#a6a6a6"
                />,
                <Rect
                    key={`${chain.id}-${i}-3`}
                    x={secondX.left - 8}
                    y={secondY.mid - 4}
                    width={8}
                    height={8}
                    fill="#a6a6a6"
                    stroke="#a6a6a6"
                />,
                <Line
                    key={`${chain.id}-${i}-2`}
                    x={firstX.right}
                    y={firstY.mid}
                    points={[0, 0, secondX.left - firstX.right, 0]}
                    stroke="#a6a6a6"
                    strokeWidth={2}
                />
            );
        }
    } else {
        for (let i = 0; i < members.length - 1; i++) {
            const firstX = membersX[i], firstY = membersY[i], secondX = membersX[i + 1], secondY = membersY[i + 1];
            draw.push(
                <Rect
                    key={`${chain.id}-${i}-1`}
                    x={firstX.mid - 4}
                    y={firstY.bottom}
                    width={8}
                    height={8}
                    fill="#a6a6a6"
                    stroke="#a6a6a6"
                />,
                <Rect
                    key={`${chain.id}-${i}-3`}
                    x={secondX.mid - 4}
                    y={secondY.top - 8}
                    width={8}
                    height={8}
                    fill="#a6a6a6"
                    stroke="#a6a6a6"
                />,
                <Line
                    key={`${chain.id}-${i}-2`}
                    x={firstX.mid}
                    y={firstY.bottom}
                    points={[0, 0, 0, secondY.top - firstY.bottom]}
                    stroke="#a6a6a6"
                    strokeWidth={2}
                />
            );
        }
    }
    return (
        <>
            {draw}
        </>
    )
}

export default class ConstraintOverlay extends Component {
    constructor(props) {
        super(props);
        let obj = {};
        this.props.controls.forEach(c => {
            obj[c.id] = ConstraintCalculator.public[c.id] || {
                width: 0,
                height: 0,
                top: 0,
                left: 0
            }
        });
        this.state = {
            styles: obj
        }
    }
    componentDidMount() {
        let controls = this.props.controls;
        this.listenerKeys = {};
        controls.forEach(c => {
            this.listenerKeys[c.id] = ConstraintCalculator.addListener(c.id, style => {
                this.setState({
                    ...this.state,
                    styles: {
                        ...this.state.styles,
                        [c.id]: style
                    }
                });
            });
        })
    }
    componentDidUpdate(prevProps) {
        // DIFF procedure on listeners
        let prev = { ...this.listenerKeys };
        let next = {};
        let controls = this.props.controls;
        controls.forEach(c => {
            if (prev[c.id]) {
                next[c.id] = prev[c.id];
                delete prev[c.id];
            } else {
                next[c.id] = ConstraintCalculator.addListener(c.id, style => {
                    this.setState({
                        ...this.state,
                        styles: {
                            ...this.state.styles,
                            [c.id]: style
                        }
                    });
                });
            }
        });
        for (let k in prev) {
            ConstraintCalculator.removeListener(k, prev[k]);
        }
        this.listenerKeys = next;
    }
    componentWillUnmount() {
        let controls = this.props.controls;
        controls.forEach((c, idx) => {
            ConstraintCalculator.removeListener(c.id, this.listenerKeys[c.id]);
        });
    }
    render() {
        const { width, height, controls, activeControlId } = this.props;
        const active = controls.find(c => c.id === activeControlId);
        // Recompute all styles on the flight, controls might have been added and there is no lifecycle hook to be called before render
        // ComponentDidUpdate will care of listeners
        const styles = {};
        this.props.controls.forEach(c => {
            styles[c.id] = ConstraintCalculator.public[c.id] || {
                width: 0,
                height: 0,
                top: 0,
                left: 0
            }
        });
        return (
            <Stage className="screen-canvas" width={width} height={height}>
                <Layer>
                    {active && active.constraints.filter(c => c.valid === CONSTRAINT_VALID).map(constraint => PositionConstraintsTransform(active, constraint, styles, width, height))}
                    {active && DimensionConstraintTransform(active, styles)}
                    {active && ControlChainTransform(active, controls, styles)}
                </Layer>
            </Stage>
        );
    }
}