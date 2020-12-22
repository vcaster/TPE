import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';
import { getUsrs,getLogToForm } from '../../actions/form_actions';
import TableBlock from '../../components/utils/block_timeline'
import CollapseCheckbox from '../../components/utils/collapseCheckbox'
import Retrive from '../../components/utils/retrive'

// const title = "Address";

class Timeline extends Component { 
    
    state= {
        loading:true,        
        grid:'',
        limit:100,
        skip:0,
        filters:{
            name:[],
        }
    }

    handleFilters = (filters, category) => {
        const newFilters = {...this.state.filters}
        newFilters[category] = filters;
        // if(category === "price"){
        //     let priceValues = this.handlePrice(filters);
        //     newFilters[category] = priceValues
        // }

        this.showFilteredResults(newFilters)

        this.setState({
            filters:newFilters
        })
    }

    
    componentDidMount() {
        this.props.dispatch(getLogToForm(
            this.state.skip,
            this.state.limit,
            this.state.filters
        )).then(response => {
            if (this.props.user.articles) {
                this.setState({
                    loading: false
                })
            }
        });
        
        this.props.dispatch(getUsrs());
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getLogToForm(
            0,
            this.state.limit,
            filters)).then(()=>{
                this.setState({
                    skip:0
                })
            })
        
    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;
        console.log(this.props.user.articles)
        this.props.dispatch(getLogToForm(
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
                    <div class="row mb-2">
                        <div class="col-sm-6">
                            <h1>Timeline</h1>
                        </div>
                        <div class="col-sm-6">
                            <ol class="breadcrumb float-sm-right">
                                <li class="breadcrumb-item"><a href="#">Home</a></li>
                                <li class="breadcrumb-item active">Timeline</li>
                            </ol>
                        </div>
                    </div>{/* /.row */}
                    </div>{/* /.container-fluid */}
                </div>
                {/* /.content-header */}
                {/* Main content */}
                {this.props.user.userData.isAdmin ?
                <section className="content">
                    <div className="container-fluid">
                        {/* Timelime example  */}
                        <div className="row">
                            <div className="col-md-12">
                            <div className="card card-primary collapsed-card">
                                <div className="card-header">
                                    <h3 className="card-title">Filters</h3>
                                    <div className="card-tools">
                                        <button className="btn btn-tool" type="button" data-card-widget="collapse"><i className="fas fa-plus" />
                                        </button>
                                    </div>
                                    {/* /.card-tools */}
                                        </div>
                                        {/* /.card-header */}
                                        <div className="card-body" style={{ display: 'none' }}>
                    
                                    <CollapseCheckbox
                                        initState={false}
                                        title="Users"
                                        list={this.props.form.users}
                                        handleFilters={(filters)=>this.handleFilters(filters,'name')}
                                    />
                                                </div>
                                        {/* /.card-body */}
                                    </div>
                                {/* The time line */}
                                <div className="timeline">
                                    {/* timeline time label */}
                                    <div className="time-label">
                                        <span className="bg-red">Today</span>
                                    </div>
                                    <TableBlock
                                        list= {this.props.user.articles}
                                        limit={this.state.limit}
                                        size={this.props.user.Size}
                                        formname= 'timeline'                                        
                                        loadMore={()=>this.loadMoreCards()}
                                        isAdmin={this.props.user.userData.isAdmin}
                                    />
                                    <div>
                                        <i className="fas fa-clock bg-gray" />
                                    </div>
                                </div>
                            </div>
                            {/* /.col */}
                        </div>

                        {/* /.row */}
                    </div>{/* /.container-fluid */}
                </section>
                :null}
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

export default connect(mapStateToProps)(Timeline);