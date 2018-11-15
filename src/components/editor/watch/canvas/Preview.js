import { faSearchMinus, faSearchPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, InputGroup } from 'react-bootstrap';
import SmartFormControl from '../../../../utils/SmartChangeEvent';
import DeviceView from './DeviceView';


export default class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            zoom: 60,
        }
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.zoomTo = this.zoomTo.bind(this);
    }
    zoomIn() {
        this.setState({
            zoom: Math.min(100, this.state.zoom + 10)
        });
    }
    zoomOut() {
        this.setState({
            zoom: Math.max(0, this.state.zoom - 10)
        });
    }
    zoomTo(val) {
        let f = Math.min(100, Math.max(0, parseInt(val)))
        if (isNaN(f)) {
            f = 0;
        }
        this.setState({
            zoom: f
        });
    }
    render() {
        let { watchController, device, platform } = this.props;
        if (watchController) {
            return (
                <Card>
                    <Card.Header>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{watchController.name}</span>
                            <InputGroup className="w-25">
                                <InputGroup.Prepend>
                                    <Button onClick={this.zoomOut}>
                                        <FontAwesomeIcon icon={faSearchMinus} />
                                    </Button>
                                </InputGroup.Prepend>
                                <SmartFormControl value={this.state.zoom.toString()} onChange={this.zoomTo} />
                                <InputGroup.Append>
                                    <Button onClick={this.zoomIn}>
                                        <FontAwesomeIcon icon={faSearchPlus} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body className="plotted">
                        <DeviceView
                            app={this.props.app}
                            watchController={watchController}
                            device={device}
                            platform={platform}
                            zoom={this.state.zoom}
                            onCreate={this.props.onCreate}
                        />
                    </Card.Body>
                </Card>
            );
        } else {
            return (<></>);
        }

    }
}