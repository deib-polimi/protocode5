import React from 'react';
import { Card, ListGroup, Form, Button, InputGroup } from 'react-bootstrap'
import { BackLink } from '../utils/FormKit';
import { LinkContainer } from 'react-router-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
import { UI_PHONE_ELEMENT_MENU_ITEM } from '../../../../../Constants';
import SmartFormControl from '../../../../../utils/SmartChangeEvent';

class MenuEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            creating: false,
            creatingName: 'newMenuItem'
        }
    }
    render() {
        const { scene, viewController, control, onCreate, match } = this.props;
        const menu = control;
        return (
            <Card className="w-100">
                <Card.Header>
                    <BackLink scene={scene} viewController={viewController} />
                    {'Main menu'}
                </Card.Header>
                {(menu.length > 0 || this.state.creating) &&
                    <ListGroup>
                        {menu.map(item => (
                            <LinkContainer key={item.id} to={`${match.url}/${item.id}`}>
                                <ListGroup.Item>{item.name}</ListGroup.Item>
                            </LinkContainer>
                        ))}
                        {this.state.creating &&
                            <ListGroup.Item>
                                <Form>
                                    <InputGroup size="sm">
                                        <SmartFormControl value={this.state.creatingName} onChange={val => this.setState({ creatingName: val})} />
                                        <InputGroup.Append>
                                            <Button variant="light" onClick={() => { onCreate(UI_PHONE_ELEMENT_MENU_ITEM, this.state.creatingName); this.setState({ creating: false, creatingName: 'newMenuItem' })}} >
                                                <FontAwesomeIcon icon={faSave} />
                                            </Button>
                                            <Button variant="light" onClick={() => { this.setState({ creating: false, creatingName: 'newMenuItem' })}} >
                                                <FontAwesomeIcon icon={faTimes} />
                                            </Button>
                                        </InputGroup.Append>
                                    </InputGroup>
                                </Form>
                            </ListGroup.Item>
                        }
                    </ListGroup>
                }
                <Card.Footer>
                    <Button variant="light">
                        <FontAwesomeIcon icon={faPlus} onClick={() => this.setState({ creating: true })} />
                    </Button>
                </Card.Footer>
            </Card>
        );
    }
}

export default MenuEditor;