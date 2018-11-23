import React, { Component } from 'react';
import Navbar from './containers/Navbar';
import { Container } from 'react-bootstrap';
import { Route } from 'react-router';
import WelcomeComponent from './Welcome';
import Editor from './components/editor/Editor';
import About from './about/About';
import DataModelEditor from './components/dataModel/Editor';
import ManifestEditor from './components/manifest/Editor';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <>
                <Navbar />
                <Container fluid={true} id="main">
                    <Route exact path="/" component={WelcomeComponent} />
                    <Route path="/editor" component={Editor} />
                    <Route path="/model" component={DataModelEditor} />
                    <Route path="/manifest" component={ManifestEditor} />
                    <Route path="/about" component={About} />
                </Container>
            </>
        );
    }
}

export default App;
