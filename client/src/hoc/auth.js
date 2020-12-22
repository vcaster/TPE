import React, { Component } from 'react'
import { connect } from 'react-redux'
import { auth } from '../actions/user_actions'
import {areas} from '../components/utils/misc'
import CircularProgress from '@material-ui/core/CircularProgress'

export default function (ComposedClass, reload, adminRoute = null, superRoute = null, qaRoute = null, accountRoute = null) {

    class AuthCheck extends Component {

        state = {
            loading:true
        }
        

        componentDidMount(){
                   

            // var centerPoint = { lat: 39.3607065, lng: -76.6104103 };
            // checks if two coordinates are within range of each other in kilometers
            function arePointsNear(checkPoint, centerPoint, m) {
                var km = m/1000;
                var ky = 40000 / 360;
                var kx = Math.cos(Math.PI * centerPoint.lat / 180.0) * ky;
                var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
                var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;
                return Math.sqrt(dx * dx + dy * dy) <= km;
            }
            var pos = {}

            if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {

                  pos = {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude 
                  }
                  console.log(pos)
                
                //   var ans = areas.some(row => {
                //     if (arePointsNear(row, pos, 1200)){
                //         return true
                //     }
                // })
                var ans = true
                
                this.props.dispatch(auth()).then(response => {
                    let user = this.props.user.userData
                    console.log(user);
                    console.log('hello');
                    if(!user.isAuth){
                        console.log("Logged out")
                        if(reload){
                            this.props.history.push('/register_login');
                        }
                        this.setState({loading:false})
                    }else if(ans || user.isAdmin){
                        if(adminRoute && !user.isAdmin){
                            this.props.history.push('/user/dashboard');         
                        } // for two groups compatibility use double route check
                        else if(accountRoute && user.isSupervisor && !user.isAccount){
                            this.props.history.push('/access_denied');
                        }
                        else if(accountRoute && user.isQa && !user.isAccount){
                            this.props.history.push('/access_denied');
                        }
                        else if(superRoute && user.isQa && !user.isSupervisor){
                            this.props.history.push('/access_denied');
                        }
                        else if(superRoute && user.isAccount && !user.isSupervisor){
                            this.props.history.push('/access_denied');
                        }
                        else if(qaRoute && user.isAccount && !user.isQa){
                            this.props.history.push('/access_denied');
                        }
                        else if(qaRoute && user.isSupervisor  && !user.isQa){
                            this.props.history.push('/access_denied');
                        }
                        else{
                            if(reload === false){
                                this.props.history.push('/user/dashboard');
                            }
                        }    
    
                        this.setState({loading:false})
                        }            
                        else{
                            console.log(ans)
                            alert("Out of range")
                        }
            })
            })
            }
            else{
                alert("Browser Not Supported")
            }        
            
            
        }

        render() {
            if (this.state.loading) {
                return (
                        <div className="content-wrapper" style={{ minHeight: '1592.4px' }}>
                            {/* Content Header (Page header) */}
                            <section className="content-header">
                                <div className="container-fluid">
                                    <div className="row mb-2">
                                        <div className="col-sm-6">
                                            <h1>Authenticating</h1>
                                        </div>
                                        <div className="col-sm-6">
                                            <ol className="breadcrumb float-sm-right">
                                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                                <li className="breadcrumb-item active">Authentication</li>
                                            </ol>
                                        </div>
                                    </div>
                                </div>{/* /.container-fluid */}
                            </section>
                            {/* Main content */}
                            <section className="content">
                                {/* Default box */}
                                <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">User Not Authenticated</h3>
                                    <div className="card-tools">
                                        <button title="Collapse" className="btn btn-tool" type="button" data-toggle="tooltip" data-card-widget="collapse">
                                            <i className="fas fa-minus" /></button>
                                        <button title="Remove" className="btn btn-tool" type="button" data-toggle="tooltip" data-card-widget="remove">
                                            <i className="fas fa-times" /></button>
                                    </div>
                                </div>

                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-md-6"></div>

                                            <div className="col-md-6">

                                            <CircularProgress size={40} style={{ color: '#2196f3' }} thickness={7} />
                                            </div>

                                        </div>
                                        <div className="row">
                                            Checking...
                                        </div>
                                        
                                    </div>
                                    {/* /.card-body */}
                                    
                                </div>
                                {/* /.card */}
                            </section>
                            {/* /.content */}
                        </div>
                  
                );
            }
            return (
                <ComposedClass {...this.props}  user={this.props.user} />
            );  
        }
    }

    function mapStateToProps(state){
        return {
            user: state.user
        }
    }

    return connect(mapStateToProps)(AuthCheck)
}