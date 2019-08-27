import React from 'react';
import NavLink from './navlink/NavLink';
import './Header.css';

const Header = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-info">
            <a className="navbar-brand" href="/"><img src="images/logo.svg" alt="" height="60"/></a>
            <span className="spacer"></span>
            <div className="justify-content-end" id="navbarNav">
                <ul className="navbar-nav ">
                    <NavLink linkTitle="HOME" iconName="home"/>
                    <NavLink linkTitle="LINKEDIN" iconName="linkedin"/>
                    <NavLink linkTitle="GITHUB" iconName="github-square"/>
                 </ul>
             </div>
        </nav>
    );
}

export default Header;