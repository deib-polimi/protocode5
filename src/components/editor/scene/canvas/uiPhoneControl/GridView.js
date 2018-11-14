import React from 'react';
import { GRID_VIEW_IMAGE, GRID_VIEW_SIMPLE, GRID_VIEW_DETAILED } from '../../../../../Constants';

const GridViewCell = ({ platform, variant, title }) => {
    return (
        <div className={`control-grid-view-cell expanded ${platform}`}>
            <div className="control-content">
                {variant === GRID_VIEW_IMAGE &&
                    <div className="grid-image"></div>
                }
                {variant === GRID_VIEW_DETAILED &&
                    <>
                        <div className="grid-image"></div>
                        <p className="grid-text">{title}</p>
                    </>
                }
                {variant === GRID_VIEW_SIMPLE &&
                    <>
                        <div className="grid-image-empty"></div>
                        <p className="grid-text">{title}</p>
                    </>
                }
            </div>
        </div>
    );
}

const uiPhoneControlGridView = ({ control, platform }) => {
    return (
        <div className={`control-grid-view expanded ${platform}`}>
            <div className="control-content">
                {control.gridViewCells.map((cell, i) => (
                    <GridViewCell
                        key={`Item${i}`}
                        variant={control.gridType}
                        title={cell.title}
                        platform={platform}
                    />
                ))}
            </div>
        </div>
    );
}

export default uiPhoneControlGridView;