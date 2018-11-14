import React from 'react';
import { LIST_VIEW_IMAGE, LIST_VIEW_SIMPLE, LIST_VIEW_DETAILED } from '../../../../../Constants';

const ListViewItem = ({ platform, variant, background, title, subtitle }) => {
    let style = {};
    if (background !== '') {
        style.backgroundColor = background;
    }
    return (
        <div className={`control-list-view-cell expanded ${platform}`} style={style}>
            <div className="control-content">
                {variant === LIST_VIEW_IMAGE &&
                    <>
                        <div className="list-image"></div>
                        <div className="list-text-container">
                            <p className="list-text">{title}</p>
                        </div>
                    </>
                }
                {variant === LIST_VIEW_DETAILED &&
                    <>
                        <div className="list-image"></div>
                        <div className="list-text-container-detailed">
                            <p className="list-text">{title}</p>
                            <p className="list-subtext">{subtitle}</p>
                        </div>
                        <div className="list-icon"></div>
                    </>
                }
                {variant === LIST_VIEW_SIMPLE &&
                    <>
                        <div className="list-text-container">
                            <p className="list-text">{title}</p>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

const uiPhoneControlListView = ({ control, platform }) => {
    return (
        <div className={`control-list-view expanded ${platform}`}>
            <div className="control-content">
                {control.listViewCells.map((cell, i) => (
                    <ListViewItem
                        title={cell.title}
                        subtitle={cell.subtitle}
                        platform={platform}
                        variant={control.listType}
                        background={control.backgroundColor}
                        key={`Item${i}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default uiPhoneControlListView;