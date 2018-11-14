import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLightbulb, faPencilAlt, faCode, faMagic, faCubes } from '@fortawesome/free-solid-svg-icons';
import { faAndroid, faReact, faApple } from '@fortawesome/free-brands-svg-icons';
import { Container, Row, Col } from 'react-bootstrap';

export default class WelcomeComponent extends Component {
    render() {
        return (
            <>
                <h3 className="pt-3 pb-2" style={{fontSize: '24px'}}>
                    Protoc<FontAwesomeIcon icon={faCode} className="align-text-bottom"/>de
                    <small style={{fontSize: '65%', color: '#777'}} className="ml-1">From idea to mobile app</small>
                </h3>
                <br />
                <Row>
                    <Col md={4}>
                        <div className="card">
                            <Container fluid className="p-4">
                                <Row className="justify-content-center">
                                    <FontAwesomeIcon icon={faLightbulb} size="5x" />
                                    <FontAwesomeIcon icon={faPencilAlt} size="5x" />
                                </Row>
                                <Row className="justify-content-center">
                                    <p className="p-2 m-0">Make your app with Protoc<FontAwesomeIcon icon={faCode} className="align-text-bottom" />de</p>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="card">
                            <Container fluid className="p-4">
                                <Row className="justify-content-center">
                                    <FontAwesomeIcon icon={faMagic} size="5x" />
                                    <FontAwesomeIcon icon={faCubes} size="5x" />
                                </Row>
                                <Row className="justify-content-center">
                                    <p className="p-2 m-0">Generate the model</p>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="card">
                            <Container fluid className="p-4">
                                <Row className="justify-content-center">
                                    <FontAwesomeIcon icon={faAndroid} size="5x" />
                                    <FontAwesomeIcon icon={faReact} size="5x" />
                                    <FontAwesomeIcon icon={faApple} size="5x" />
                                </Row>
                                <Row className="justify-content-center">
                                    <p className="p-2 m-0">Have fun with native mobile apps</p>
                                </Row>
                            </Container>
                        </div>
                    </Col>
                </Row>
            </>
        );
    }
}