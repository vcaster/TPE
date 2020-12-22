import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';

class Reject extends Component {

    state = {
        loading: true
    }

    
    
    componentDidMount() {
        setTimeout(()=>{
            this.props.history.push('/user/dashboard')
            },3000)
    }
    render(){
    return (
        <UserLayout>
                        {/* Content Wrapper. Contains page content */}
            <div className="content-wrapper">
            {/* Content Header (Page header) */}
            <section className="content-header">
                <div className="container-fluid">
                <div className="row mb-2">
                    <div className="col-sm-6">
                    <h1>USER ERROR</h1>
                    </div>
                    <div className="col-sm-6">
                    <ol className="breadcrumb float-sm-right">
                        <li className="breadcrumb-item"><a href="#">Home</a></li>
                        <li className="breadcrumb-item active">ACCESS DENIED</li>
                    </ol>
                    </div>
                </div>
                </div>{/* /.container-fluid */}
            </section>
            {/* Main content */}
            <section className="content">
                <div className="error-page">
                <h2 className="headline text-danger">ERROR</h2>
                <div className="error-content">
                    <h3><i className="fas fa-exclamation-triangle text-danger" /> Oops! You are not authorized to view this page.</h3>
                    <p>
                    You will be redirected Shortly. Thanks.
                    </p>
                </div>
                </div>
                {/* /.error-page */}
            </section>
            {/* /.content */}
            </div>
            {/* /.content-wrapper */}
           
        </UserLayout>
    );
    }
}

const mapStateToProps = (state) => {
    return {
        user : state.user,
        form: state.form
    }
}

export default connect(mapStateToProps)(Reject);