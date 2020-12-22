import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';
import { countIndividual, countUser, countAddress } from '../../actions/form_actions';
import TableBlock from '../../components/utils/table_block'
import { getMessageToForm } from '../../actions/form_actions';
import Retrive from '../../components/utils/retrive'

// const title = "Address";

class User extends Component { 
    
    state= {
        loading:true,        
        grid:'',
        limit:7,
        skip:0,
        countIndiv: null ,
        countAddr:null,
        countUser:null 


    }
    
    componentDidMount() {
         this.props.dispatch(countIndividual()).then(response => {
             if(response){
                if (this.props.form.countIndiv.count) {
                    this.setState({
                        countIndiv: this.props.form.countIndiv.count
                        })
                    }
             }
         this.props.dispatch(countAddress()).then(response => {
            if (this.props.form.countAddr.count) {
                this.setState({
                    countAddr: this.props.form.countAddr.count
                    })
                }
        this.props.dispatch(countUser()).then(response => {
            if (this.props.form.countUser.count) {
                this.setState({
                    countUser:this.props.form.countUser.count,
                    loading: false
                    })
                }
            })
        })
    })
        this.props.dispatch(getMessageToForm(
            this.state.skip,
            this.state.limit,
        )).then(response => {
            if (this.props.user.articles) {
                this.setState({
                    loading: false
                })
            }
        });
    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;
        console.log(this.props.user.articles)
        this.props.dispatch(getMessageToForm(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.user.articles
        )).then(()=>{
            this.setState({
                skip
            })
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
            {/* Content Header (Page header) */}
            <div className="content-header">
                    <div className="container-fluid">
                        <div className="row mb-2">
                            <div className="col-sm-6">
                                <h1 className="m-0 text-dark">Dashboard</h1>
                            </div>{/* /.col */}
                            <div className="col-sm-6">
                                <ol className="breadcrumb float-sm-right">
                                    <li className="breadcrumb-item"><a href="#">Home</a></li>
                                    <li className="breadcrumb-item active">Dashboard v1</li>
                                </ol>
                            </div>{/* /.col */}
                        </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                {this.props.user.userData.isAdmin ?
                <section className="content">
                    <div className="container-fluid">
                        {/* Small boxes (Stat box) */}
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>17</h3>
                                        <p>Forms</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-document" />
                                    </div>
                                    <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-success">
                                    <div className="inner">
                                        <h3>{this.state.countIndiv}</h3>
                                        <p>Individuals</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-stats-bars" />
                                    </div>
                                    <a href="/individuals/individual" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-warning">
                                    <div className="inner">
                                        <h3>{this.state.countUser}</h3>
                                        <p>Users</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-person-add" />
                                    </div>
                                    <a href="/user/users" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                            <div className="col-lg-3 col-6">
                                {/* small box */}
                                <div className="small-box bg-danger">
                                    <div className="inner">
                                        <h3>{this.state.countAddr}</h3>
                                        <p>Units</p>
                                    </div>
                                    <div className="icon">
                                        <i className="ion ion-home" />
                                    </div>
                                    <a href="/forms/address" className="small-box-footer">More info <i className="fas fa-arrow-circle-right" /></a>
                                </div>
                            </div>
                            {/* ./col */}
                        </div>
                        {/* /.row */}
                    </div>{/* /.container-fluid */}
                </section>
                :null}
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <TableBlock
                                list= {this.props.user.articles}
                                limit={this.state.limit}
                                size={this.props.user.Size}
                                formname= 'MessageBoard'                                        
                                loadMore={()=>this.loadMoreCards()}
                                />

                            </div>
                        </div>
                    </div>
                </section>
                {/* /.content */}
        </UserLayout>
);
};
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        form: state.form
    }
}

export default connect(mapStateToProps)(User);