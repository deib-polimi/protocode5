import React from 'react';
import { Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faArrowsAlt, faExpand, faIndent, faSitemap } from '@fortawesome/free-solid-svg-icons';

export const CommonNav = ({ items, className }) => (
    <Nav variant="tabs" className={ className || "border-bottom mb-3"}>
        {items.map(({ eventKey, icon }) => (
            <Nav.Item key={eventKey}>
                <Nav.Link eventKey={eventKey}>
                    <FontAwesomeIcon icon={icon} />
                </Nav.Link>
            </Nav.Item>
        ))}
    </Nav>
);

export const DefaultNav = ({ main, position, dimension, spacing, model, className, others }) => {
    let items = [
        main && {eventKey: 'main', icon: faPencilAlt },
        position && {eventKey: 'position', icon: faArrowsAlt },
        dimension && {eventKey: 'dimension', icon: faExpand },
        spacing && {eventKey: 'spacing', icon: faIndent },
        model && {eventKey: 'model', icon: faSitemap },
        ...(others || []),
    ].filter(item => !!item);
    return <CommonNav items={items} className={className} />
}