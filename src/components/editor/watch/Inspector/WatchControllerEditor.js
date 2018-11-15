import React from 'react';
import { Card, Button, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faHome, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import { ControlText } from './utils/FormKit';
import { Link } from 'react-router-dom';

const Leaf = ({ control, linkBase }) => (
    <li className="leaf">
        <Link to={`${linkBase}/${control.watchControlType}/${control.id}`}>
            {control.name}
        </Link>
    </li>
);

const Tree = ({ watchController }) => {
    let linkBase = `/editor/watch/${watchController.id}`;
    return (
        <Col sm={11} className="tree">
            <ul>
                <li>
                    <span>
                        <FontAwesomeIcon icon={faMobileAlt} /> {watchController.name}
                    </span>
                </li>
                <ul>
                    {watchController.controls.map(element => (
                        <Leaf key={element.id} control={element} linkBase={linkBase} />
                    ))}
                </ul>
            </ul>
        </Col>
    )
};

const WatchControllerEditor = ({ watchController, onEdit, onDelete }) => (
    <Card className="w-100">
        <Card.Header>
            {watchController.name}
        </Card.Header>
        <Card.Body>
            <Button className="btn-block" variant={watchController.launcher ? 'dark' : 'light'}>
                <FontAwesomeIcon icon={faHome} />{'Set launcher'}
            </Button>
            <Form>
                <ControlText caption="Name" value={watchController.name} onChange={value => onEdit('name', value)} />
            </Form>
            <Tree watchController={watchController} />
        </Card.Body>
        <Card.Footer>
            <Button variant="light" onClick={() => onDelete()}>
                <FontAwesomeIcon icon={faTrashAlt} />
            </Button>
        </Card.Footer>
    </Card>
);

export default WatchControllerEditor;