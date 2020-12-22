import React, { Component } from 'react';
import Login from './login'

class RegisterLogin extends Component {
    // done not evade the body (class) trap
    componentDidMount(){
        document.getElementsByTagName('body')[0].className = 'hold-transition login-page';
        document.getElementsByTagName("nav")[0].style.display = "none";
        document.getElementsByClassName("wrapper")[0].style.display = "none";
        document.getElementsByTagName("footer")[0].style.display = "none";
        document.body.appendChild(document.getElementsByClassName('login-box')[0]);
    }

    componentWillUnmount() {
        document.getElementsByTagName('body')[0].className = 'hold-transition sidebar-mini layout-fixed layout-navbar-fixed layout-footer-fixed sidebar-collapse';
        document.getElementsByTagName("nav")[0].style.display = "";
        document.getElementsByClassName("wrapper")[0].style.display = "";
        document.getElementsByTagName("footer")[0].style.display = "";
        document.getElementsByClassName('login-box')[0].remove();
    }

    render() {
        return (
            <div>
                <div className="login-box">
                <div className="login-logo">
                    <a href=""><b>COMPANY</b>IMS</a>
                </div>
                <Login/>
            </div>
            </div>
        );
    }
}

export default RegisterLogin;