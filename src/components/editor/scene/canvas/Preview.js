import { faSearchMinus, faSearchPlus, faSyncAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { Component } from 'react';
import { Button, Card, InputGroup } from 'react-bootstrap';
import SmartFormControl from '../../../../utils/SmartChangeEvent';
import DeviceView, { LANDSCAPE, PORTRAIT } from './DeviceView';


export default class Preview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rotation: PORTRAIT,
            zoom: 60,
            showMenu: false
        }
        this.rotate = this.rotate.bind(this);
        this.zoomIn = this.zoomIn.bind(this);
        this.zoomOut = this.zoomOut.bind(this);
        this.zoomTo = this.zoomTo.bind(this);
        this.toggleMenu = this.toggleMenu.bind(this);
    }
    rotate() {
        switch (this.state.rotation) {
            case LANDSCAPE:
                this.setState({ rotation: PORTRAIT });
                break;
            case PORTRAIT:
            default:
                this.setState({ rotation: LANDSCAPE });
                break;
        }
    }
    toggleMenu() {
        this.setState({
            showMenu: !this.state.showMenu
        })
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
        let { viewController, device, platform, scene } = this.props;
        if (viewController) {
            return (
                <Card>
                    <Card.Header>
                        <div className="d-flex justify-content-between align-items-center">
                            <span>{viewController.name}</span>
                            {device.type === 'tablet' &&
                                <Button onClick={this.rotate}>
                                    <FontAwesomeIcon icon={faSyncAlt} /> {'Rotate'}
                                </Button>
                            }
                            {!!scene && 
                                <Button 
                                    variant={this.state.showMenu ? 'dark': 'light'}
                                    onClick={this.toggleMenu}
                                >
                                    <FontAwesomeIcon icon={faBars}/> Menu
                                </Button>
                            }
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
                            scene={scene}
                            viewController={viewController}
                            device={device}
                            platform={platform}
                            zoom={this.state.zoom}
                            showMenu={this.state.showMenu}
                            rotation={this.state.rotation}
                            onCreate={this.props.onCreate}
                            menu={this.props.menu}
                        />
                    </Card.Body>
                </Card>
            );
        } else {
            return (<></>);
        }

    }
}