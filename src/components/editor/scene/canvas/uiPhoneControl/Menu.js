import React from 'react';

const MenuItem = ({ menuItem, platform }) => (
    <div className={`app-menu-item ${platform}`}>
        <div className="control-content">
            {menuItem.title}
        </div>
    </div>
);

const Menu = ({ menu, platform }) => {
    return (
        <div className={`app-menu ${platform}`}>
            {menu.map(item => (
                <MenuItem menuItem={item} platform={platform} key={item.id} />
            ))}
        </div>
    )
}

export default Menu;