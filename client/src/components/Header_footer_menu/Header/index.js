import React, { Component } from 'react';
import {Link, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../../actions/user_actions'
import {adLog} from '../../../actions/form_actions'
import axios from 'axios';


class Header extends Component {

    logoutHandler = () =>{
        this.props.dispatch(adLog(this.props.user.userData._id,"Logged Out",null,"/user/users","logout")).then(response =>{
            
        });
        this.props.dispatch(logoutUser()).then(response =>{
            if(response.payload.success){
                // const dataToSubmit = {
                //     name : response.payload.id,
                //     action : "Logged Out",
                //     data : null,
                //     link : "/user/users",
                //     id : null,
                //     extra : "logout"
                // }
                // axios.post(`/api/users/log`, dataToSubmit)
                // const id = response.payload.id
                // console.log(response.payload.id)
                this.props.history.push('/')
                
            }
                
            
        })
    }

     generateLogout = () => (
        <a href="url" onClick={()=>this.logoutHandler()} className="nav-link">Contact</a>

)

    render() {
        return (
            <div>
                <nav className="main-header navbar navbar-expand navbar-white navbar-light">
                    {/* Left navbar links */}
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="url" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        
                    </ul>
                   
                    {/* Right navbar links */}
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <a className="nav-link" data-widget="pushmenu" href="url" role="button"><i className="fas fa-bars" /></a>
                        </li>
                        {/* <li className="nav-item dropdown">
                            <a className="nav-link" data-toggle="dropdown" href="#">
                                <i className="far fa-comments" />
                                <span className="badge badge-danger navbar-badge">3</span>
                            </a>
                            <div className="dropdown-menu dropdown-menu-lg dropdown-menu-right">
                                <a href="#" className="dropdown-item">
                                    <div className="media">
                                        <img src="dist/img/user1-128x128.jpg" alt="User Avatar" className="img-size-50 mr-3 img-circle" />
                                        <div className="media-body">
                                            <h3 className="dropdown-item-title">
                                                Brad Diesel
                                                <span className="float-right text-sm text-danger"><i className="fas fa-star" /></span>
                                            </h3>
                                            <p className="text-sm">Call me whenever you can...</p>
                                            <p className="text-sm text-muted"><i className="far fa-clock mr-1" /> 4 Hours Ago</p>
                                        </div>
                                    </div>
                                </a>
                                <div className="dropdown-divider" />
                                <a href="/chat" className="dropdown-item dropdown-footer">See All Messages</a>
                            </div>
                        </li> */}

                        <li className="nav-item">
                        <a href="/user/dashboard" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                        <button className="btn btn-block bg-gradient-primary" type="button"onClick={()=> this.logoutHandler()}>Logout</button>

                        </li>
                    </ul>
                </nav>

            </div>
        );
    }
}

function mapStateToProps(state){
    return{
        user: state.user
    }
}

export default connect(mapStateToProps)(withRouter(Header));