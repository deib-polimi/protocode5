import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import '../style/navbar.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDownload, faCode } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import XmlGenerator from '../xml/XmlGenerator';

const MainComponent = ({ app, model, onCreate, onDelete }) => {
    let generateModelListener = () => {
        XmlGenerator.DownloadModelXml(model);
    }
    return (
        <>
            <Navbar bg="dark" expand="lg" className="navbar-default" fixed="top" variant="">
                <Container fluid>
                    <LinkContainer to="/">
                        <Navbar.Brand>Protoc<FontAwesomeIcon icon={faCode} className="align-text-bottom" />de</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            {app != null &&
                                <Nav.Item>
                                    <LinkContainer to="/editor">
                                        <Nav.Link>View Editor</Nav.Link>
                                  </LinkContainer>
                                </Nav.Item>
                            }
                            {app != null &&
                                <Nav.Item>
                                    <LinkContainer to="/model">
                                        <Nav.Link>Model Editor</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            }
                            {app != null &&
                                <Nav.Item>
                                    <LinkContainer to="/manifest">
                                        <Nav.Link>Manifest Editor</Nav.Link>
                                    </LinkContainer>
                                </Nav.Item>
                            }
                            <Nav.Item>
                                <LinkContainer to="/about">
                                    <Nav.Link href="#">About</Nav.Link>
                                </LinkContainer>
                            </Nav.Item>
                        </Nav>
                        <Nav className="float-right">
                            {app == null &&
                                <Nav.Item>
                                    <Nav.Link href="#" onSelect={onCreate}>Create App</Nav.Link>
                                </Nav.Item>
                            }
                            {app != null &&
                                <Nav.Item>
                                    <Nav.Link href="#" onSelect={onDelete}>Delete App</Nav.Link>
                                </Nav.Item>
                            }
                            {app != null &&
                                <Nav.Item>
                                    <Nav.Link href="#" onSelect={generateModelListener}>
                                        <FontAwesomeIcon icon={faDownload} /> {'Model'}
                                    </Nav.Link>
                                </Nav.Item>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

export default MainComponent;