import React, { Component } from 'react';
import CodeIcon from '../img/about/code_icon.png';
import PoliLogo from '../img/about/poli_logo.png';
import GithubLogo from '../img/about/github_logo.png';
import '../style/about.scss';

export default class About extends Component {
    render() {
        return (
            <div className="about-section">
                <h3 className="about-title">
                    Protoc&lt;/&gt;de
                    <small>From idea to mobile app</small>
                </h3>
                <br />
                <div className="row">
                    <div className="col-md-10">
                        <div className="card card-body">
                            <div>
                                <img src={CodeIcon} className="code-icon" alt="" />
                                <img src={PoliLogo} className="poli-logo" alt="" />
                                <div className="about-text col-md-7">
                                    Protocode v4.0 is a thesis project done at Politecnico di Milano,
                                <br />master degree in Computer Science and Engineering.
                                <br />Made by Massimo Beccari from the original projects of Alessio Rossotti, Aldo Pintus and Mattia Natali.
                                <br />
                                </div>
                            </div>
                            <hr />
                            <div className="about-links row">
                                <div className="col-md-4 github-title">
                                    <img src={GithubLogo} className="github-icon" alt="" />
                                    <span>GitHub Links :</span>
                                </div>
                                <div className="list-group col-md-5 github-links">
                                    <a href="https://github.com/osioalberto/protocode5" className="list-group-item list-group-item-action active">
                                        Protocode v5.0  - Alberto Osio
                                    </a>
                                    <a href="https://github.com/massimo-beccari/protocode4" className="list-group-item list-group-item-action">
                                        Protocode v4.0  - Massimo Beccari
                                    </a>
                                    <a href="https://github.com/alessioros/protocode3" className="list-group-item list-group-item-action">
                                        Protocode v3.0  - Alessio Rossotti
                                    </a>
                                    <a href="https://github.com/aldopolimi/protocode" className="list-group-item list-group-item-action">
                                        Protocode v2.0  - Aldo Pintus
                                    </a>
                                    <a href="https://github.com/deib-polimi/protocode" className="list-group-item list-group-item-action">
                                        Protocode v1.0  - Mattia Natali
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}