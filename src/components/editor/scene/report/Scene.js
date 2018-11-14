import React from 'react';
import { TextId, TextError, TextWarn, TextOk, DottedLine } from './Toolkit';
import { SMARTPHONE, SCENE_MULTI_VC, TABLET } from '../../../../Constants';
import ViewControllerReport from './ViewController';

const SceneReport = ({ scene }) => {
    return (
        <>
            <p>
                <b>REPORT</b> scene <TextId>{scene.name}</TextId>: <br />
                Scene is {scene.valid ? <TextOk>valid</TextOk> : <TextError>invalid</TextError>} <br />
                Scene is {scene.reachable ? <TextOk>reachable</TextOk> : <TextWarn>unreachable</TextWarn>}
            </p>
            <DottedLine />
            {scene.layout[SMARTPHONE].type === SCENE_MULTI_VC &&
                <>
                    <ViewControllerReport viewController={scene.layout[SMARTPHONE]} />
                    <DottedLine />
                </>
            }
            {scene.layout[TABLET].type === SCENE_MULTI_VC &&
                <>
                    <ViewControllerReport viewController={scene.layout[TABLET]} />
                    <DottedLine />
                </>
            }
            {scene.layout[SMARTPHONE].containers.map(container => (
                <React.Fragment key={`Report-${container.id}`}>
                    <ViewControllerReport viewController={container.containedViewController} />
                    <DottedLine />
                </React.Fragment>
            ))}
        </>
    );
}

export default SceneReport;