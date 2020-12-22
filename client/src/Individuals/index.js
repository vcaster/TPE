import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import { connect } from 'react-redux';
import MyButton from '../components/utils/button';
import CollapseCheckbox from '../components/utils/collapseCheckbox'
import TableBlock from '../components/utils/table_block'
import {getAddr, getIndivToForm } from '../actions/user_actions';
import Retrive from '../components/utils/retrive'

const title = "Individuals";

class Individual extends Component {    

    state = {
        loading: true,
        grid:'',
        limit:100,
        skip:0,
        filters:{
            address: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getIndivToForm(
            this.state.skip,
            this.state.limit,
            this.state.filters
        )).then(response => {
            console.log(this.props.user.articles)
            if (this.props.user.articles) {
                this.setState({
                    loading: false
                })
            }
        });

        this.props.dispatch(getAddr());
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
        
        console.log(this.state.filters)
    }

    showFilteredResults = (filters) => {
        this.props.dispatch(getIndivToForm(
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
        this.props.dispatch(getIndivToForm(
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
            <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                            <h1>Add {title}</h1>
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
                                title="Address"
                                list={this.props.form.address}
                                handleFilters={(filters)=>this.handleFilters(filters,'address')}
                            />
                                        </div>
                                {/* /.card-body */}
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{title}</h3>
                                    <div className="card-tools">
                                    <MyButton 
                                    type="default"
                                    title="Add New"
                                    linkTo="/individuals/individual_add"
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
                                                <th>Individual Name</th>
                                                <th>Address</th>
                                                <th>Photo</th>
                                            </tr>
                                        </thead>
                                        <TableBlock
                                        list= {this.props.user.articles}
                                        limit={this.state.limit}
                                        size={this.props.user.Size}
                                        formname= 'Individuals'                                        
                                        loadMore={()=>this.loadMoreCards()}
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
        user: state.user,
        form: state.form
    }
}

export default connect(mapStateToProps)(Individual);