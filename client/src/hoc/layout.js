import React, { Component } from 'react';

import Header from '../components/Header_footer_menu/Header';
import Footer from '../components/Header_footer_menu/Footer';
import Menu from '../components/Header_footer_menu/Menu';

class Layout extends Component {
    render() {
        return (
            <div>
                <Header/>
                {/* <Menu/> */}
                {this.props.children}
                <Footer/>
            </div> 
                  
        );
    }
}

export default Layout;