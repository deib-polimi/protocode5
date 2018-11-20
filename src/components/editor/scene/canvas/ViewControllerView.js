import React, { Component } from 'react';
import { ConstraintLayout } from './ConstraintLayout';
import createUiPhoneControlElement from './uiPhoneControl/UiPhoneControl';
import ConstraintOverlay from './ConstraintOverlay';

export const PORTRAIT = 'portrait';
export const LANDSCAPE = 'landscape';

class ViewControllerView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            draggingOver: false
        }
        this.onDragEnter = this.onDragEnter.bind(this);
        this.onDragLeave = this.onDragLeave.bind(this);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDrop = this.onDrop.bind(this);
    }
    onDragOver(e) {
        if (this.props.allowDrop) {
            e.preventDefault();
        }
    }
    onDragEnter() {
        if (this.props.allowDrop) {
            this.setState({
                draggingOver: true
            });
        }
    }
    onDragLeave() {
        if (this.props.allowDrop) {
            this.setState({
                draggingOver: false
            });
        }
    }
    onDrop(evt) {
        if (this.props.allowDrop) {
            this.setState({
                draggingOver: false
            });
            let type = evt.dataTransfer.getData('uiPhoneControlType');
            if (this.props.onCreate) {
                this.props.onCreate(type, this.props.viewController.id);
            }
        }
    }
    render() {
        let { scene, viewController, platform, allowDrop, activeControlId, width, height } = this.props;
        let vcStyle = {
            backgroundColor: viewController.backgroundColor
        }
        let dragProps = {};
        if (allowDrop) {
            dragProps.onDragOver=this.onDragOver;
            dragProps.onDragEnter=this.onDragEnter;
            dragProps.onDragLeave=this.onDragLeave;
            dragProps.onDrop=this.onDrop;
        }
        let className="w-100 h-100";
        if (this.props.className) {
            className = this.props.className;
        }
        return (
            <div style={{position: 'relative'}}>
                <div
                    className={`${className} ${this.state.draggingOver ? 'dragging-over' : ''}`}
                    style={vcStyle}
                    {...dragProps}
                >
                    <ConstraintLayout className="w-100 h-100">
                        {viewController.controls.map(control => {
                            return createUiPhoneControlElement(platform, scene, viewController, control, control.id === activeControlId, this.props.onCreate);
                        })}
                    </ConstraintLayout>
                    <ConstraintOverlay width={width} height={height} controls={viewController.controls} activeControlId={activeControlId} />
                </div>
                
            </div>
        );
    }
}

export default ViewControllerView;