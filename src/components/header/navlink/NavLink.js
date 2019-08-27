import React from 'react';
import './NavLink.css';

const NavLink = props => {
    return (
        
        <li className="nav-item">
            <button className="btn btn-info"><span className={`fa fa-${props.iconName}`}></span> {props.linkTitle}</button>
        </li>
        
    );
}

export default NavLink;