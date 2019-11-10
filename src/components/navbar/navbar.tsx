import React, { Component } from 'react';
import './navbar.scss';
import logo from '../../logo.svg';

class Navbar extends Component<any, any> {

    render(): React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal | boolean | null | undefined {

        return (
            <div id="navbar" className="d-flex px-3">
                <div className="logo-title-wrapper float-l d-flex">
                    <img src={logo} alt="Logo"/>
                    <p className="main-title ml-4 my-0">TODO App</p>
                </div>
                <a href="#" className="float-r">Help</a>
            </div>
        );
    }
}

export default Navbar;
