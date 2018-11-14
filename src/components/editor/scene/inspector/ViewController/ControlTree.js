import React from 'react';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { CONTROL_CHAIN } from '../../../../../Constants';
import '../../../../../style/treeview.scss';

const Leaf = ({ control, linkBase }) => (
    <li className="leaf">
        <Link to={`${linkBase}/${control.uiPhoneControlType}/${control.id}`}>
            {control.name}
        </Link>
    </li>
);

const Tree = ({ scene, viewController }) => {
    let linkBase = '';
    if (scene) {
        linkBase = `/editor/scenes/${scene.id}/viewControllers/${viewController.id}`;
    } else {
        linkBase = `/editor/scenes/viewControllers/${viewController.id}`;
    }
    let controlGroups = { '_noChain': [] };
    viewController.controlChains.forEach(chain => {
        controlGroups[chain.id] = [];
    })
    viewController.controls.forEach(control => {
        if (!control.controlChain) {
            controlGroups._noChain.push(control);
        } else {
            controlGroups[control.controlChain.id].push(control);
        }
    });
    for (let k in controlGroups) {
        if (k !== '_noChain') {
            controlGroups[k].sort((a, b) => a.controlChainPosition - b.controlChainPosition);
        }
    }
    let noChain = controlGroups._noChain;
    delete controlGroups._noChain;
    return (
        <Col sm={11} className="tree">
            <ul>
                <li>
                    <span>
                        <FontAwesomeIcon icon={faMobileAlt} /> {viewController.name}
                    </span>
                </li>
                <ul>
                    {noChain.map(control => (
                        <Leaf key={control.id} control={control} linkBase={linkBase} />
                    ))}
                    {
                        Object.keys(controlGroups).map(chainId => {
                            let elements = controlGroups[chainId];
                            return (
                                <React.Fragment key={chainId}>
                                    <li>
                                        <span>
                                            <Link to={`${linkBase}/${CONTROL_CHAIN}/${chainId}`}>
                                                <FontAwesomeIcon icon={faLink} /> {'Chain ' + chainId}
                                            </Link>
                                        </span>
                                        <ul>
                                            {elements.map(element => (
                                                <Leaf key={element.id} control={element} linkBase={linkBase} />
                                            ))}
                                        </ul>
                                    </li>
                                </React.Fragment>
                            );
                        })
                    }
                </ul>
            </ul>
        </Col>
    )
};

export default Tree;