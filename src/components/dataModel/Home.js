import React from 'react';
import { Link } from 'react-router-dom';
import PrefGear from '../../img/model_editor/pref_gear.png';
import DatabaseGear from '../../img/model_editor/database_gear.png';
import FileDoc from '../../img/model_editor/file_doc.png';
import CloudDoc from '../../img/model_editor/cloud_db.png';
import { Card } from 'react-bootstrap';

export const Home = ({ match }) => {
    return (
        <Card>
            <Card.Body className="data-presentation-wrapper">
                <div className='data-presentation'>
                    <div className='data-presentation-title'>
                        {'Choose the data model for your App'}
                    </div>
                    <div className="data-presentation-imgs">
                        <div className='data-img'>
                            <Link to={`${match.url}/default_preferences`}>
                                <img src={PrefGear} alt="preferences" />
                            </Link>
                            <span>Preferences</span>
                        </div>
                        <div className='data-img'>
                            <Link to={`${match.url}/database`}>
                                <img src={DatabaseGear} alt="database" />
                            </Link>
                            <span>SQL DB</span>
                        </div>
                        <div className='data-img'>
                            <Link to={`${match.url}/files`}>
                                <img src={FileDoc} alt="files" />
                            </Link>
                            <span>Files</span>
                        </div>
                        <div className='data-img'>
                            <Link to={`${match.url}/cloud`}>
                                <img src={CloudDoc} alt="cloud" />
                            </Link>
                            <span>Cloud DB</span>
                        </div>
                    </div>
                </div>
            </Card.Body>
        </Card>
    );
}