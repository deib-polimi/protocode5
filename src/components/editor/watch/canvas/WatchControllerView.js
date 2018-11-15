import React, { Component } from 'react';
import createWatchControlElement from './controls/createWatchControl';

class WatchControllerView extends Component {
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
        e.preventDefault();
    }
    onDragEnter() {
        this.setState({
            draggingOver: true
        });
    }
    onDragLeave() {
        this.setState({
            draggingOver: false
        });
    }
    onDrop(evt) {
        this.setState({
            draggingOver: false
        });
        let type = evt.dataTransfer.getData('uiPhoneControlType');
        if (this.props.onCreate) {
            this.props.onCreate(type, this.props.watchController.id);
        }
    }
    render() {
        let { watchController, platform } = this.props;
        let dragProps = {};
        dragProps.onDragOver = this.onDragOver;
        dragProps.onDragEnter = this.onDragEnter;
        dragProps.onDragLeave = this.onDragLeave;
        dragProps.onDrop = this.onDrop;
        let className = "w-100 h-100";
        if (this.props.className) {
            className = this.props.className;
        }
        return (
            <div {...dragProps} className={`smartwatch-screen-view ${this.state.draggingOver ? 'dragging-over' : ''}`}>
                <div className="status-bar"></div>
                <div className={`${className}`}>
                    {watchController.controls.map(control => {
                        return createWatchControlElement(watchController, control, platform);
                    })}
                </div>
            </div>
        );
    }
}

export default WatchControllerView;