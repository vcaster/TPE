import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import { connect } from 'react-redux';
import MyButton from '../components/utils/button';
import CollapseCheckbox from '../components/utils/collapseCheckbox'
import TableBlockA from '../components/utils/table_block_addrassoc'
import TableBlockI from '../components/utils/table_block_indivassoc'
import {status} from '../components/utils/Form/fixed_categories';
import { removeAddrAss,removeIndivAss,adLog,getUserId } from '../actions/user_actions';
import Retrive from '../components/utils/retrive'

const title = "Associations";

class Assoc extends Component {    

    state = {
        showTotal1: true,
        showTotal2: true,
        uid:null,
        loading: true,
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.setState({
            uid : id
        })
            
        this.props.dispatch(getUserId(id)).then(response=>{
            console.log(this.props.user.form);
            if (this.props.user.form) {
                this.setState({
                    loading: false
                })
            }
        });
    }

    removeAddr = (uid,aid) => {
        this.props.dispatch(removeAddrAss(uid,aid))
        .then(()=>{
            this.props.dispatch(adLog(this.props.user.userData._id,"Removed Address Association",null,"/associate_user/"+uid,'delete')).then(response =>{});
            if(this.props.user.userData.address.length <= 0){
                this.setState({
                    showTotal1: false
                })
            }
        })
    }

    removeIndiv = (uid,iid) => {
        this.props.dispatch(removeIndivAss(uid,iid))
        .then(()=>{
            this.props.dispatch(adLog(this.props.user.userData._id,"Removed Individual Association",null,"/associate_user/"+uid,'delete')).then(response =>{});
            if(this.props.user.userData.individual.length <= 0){
                this.setState({
                    showTotal2: false
                })
            }
        })
    }

    render(){

        if (this.state.loading) {
            return (
            <Retrive/>
    );
        }

    return (
        <UserLayout>
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>{title}</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">{title}</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Address Associations</h3>
                                    <div className="card-tools">
                                    <MyButton 
                                    type="default"
                                    title="Add Address Associations"
                                    linkTo="/user/address_assoc_add"
                                    altClass="btn btn-block bg-gradient-primary float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Address Name</th>
                                            </tr>
                                        </thead>
                                        <TableBlockA
                                        list= {this.props.user.form.address}
                                        uid={this.state.uid}
                                        formname= 'AddrAss'                                        
                                        removeAddrAss={(uid,aid)=>this.removeAddr(uid,aid)}
                                        />
                                    </table>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">Individual Associations</h3>
                                    <div className="card-tools">
                                    <MyButton 
                                    type="default"
                                    title="Add Individual Association"
                                    linkTo="/user/individual_assoc_add"
                                    altClass="btn btn-block bg-gradient-primary float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                            </tr>
                                        </thead>
                                        <TableBlockI
                                        list= {this.props.user.form.individual}
                                        uid={this.state.uid}
                                        formname= 'InidivAss'                                        
                                        removeIndivAss={(uid,iid)=>this.removeIndiv(uid,iid)}
                                        />
                                    </table>
                                </div>
                                {/* /.card-body */}
                            </div>
                            {/* /.card */}
                        </div>
                    </div>

                    {/* /.row */}
                </div>{/* /.container-fluid */}
            </section>


        </UserLayout>
    );
    };
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Assoc);