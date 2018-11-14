import React from 'react';
import { Card, Collapse } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';

const Thumbnail = ({ type, label, image }) => {
    return (
        <div
            className="img-thumbnail control-ui-picker"
            draggable
            onDragStart={evt => evt.dataTransfer.setData("uiPhoneControlType", type)}
            title={label}
            style={{ backgroundImage: `url(${image})`, cursor: 'pointer' }}
        />
    )
}


export default class Palette extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            open: !this.state.open
        });
    }
    render() {
        return (
            <Card className={this.props.className}>
                <Card.Header>
                    <div onClick={this.toggle} className="d-flex align-items-center justify-content-between">
                        <span>{this.props.title}</span>
                        <FontAwesomeIcon icon={faCaretDown} />
                    </div>
                </Card.Header>
                <Collapse in={this.state.open}>
                    <div> {/* Needed to properly compute collapse animation */}
                        <Card.Body>
                            <div className="d-flex justify-content-start align-items-center">
                                {this.props.controls.map(item => (
                                    <Thumbnail key={item.type} type={item.type} label={item.label} image={item[this.props.platform]} />
                                ))}
                            </div>
                        </Card.Body>
                    </div>
                </Collapse>
            </Card>
        );
    }
}