import React, { Component } from 'react';
import UserLayout from '../hoc/user'
import { connect } from 'react-redux';
import MyButton from '../components/utils/button';
import CollapseCheckbox from '../components/utils/collapseCheckbox'
import TableBlock from '../components/utils/table_block'
import {status} from '../components/utils/Form/fixed_categories';
import { getUserToForm } from '../actions/user_actions';
import Retrive from '../components/utils/retrive'

const title = "Staff Certs/Expiration";

class UsersExp extends Component {    

    state = {
        loading: true,
        grid:'',
        limit:100,
        skip:0,
        filters:{
            deleted: []
        }
    }

    componentDidMount() {
        this.props.dispatch(getUserToForm(
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
        this.props.dispatch(getUserToForm(
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
        this.props.dispatch(getUserToForm(
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
                                title="Staus"
                                list={status}
                                handleFilters={(filters)=>this.handleFilters(filters,'deleted')}

                            />
                                        </div>
                                {/* /.card-body */}
                            </div>
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{title}</h3>
                                    <div className="card-tools btn-group">
                                    <MyButton 
                                    type="default-group"
                                    title="Add New"
                                    linkTo="/user/register"
                                    altClass="btn btn-block bg-gradient-primary float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    <MyButton 
                                    type="default-group"
                                    title="Add Address Associations"
                                    linkTo="/user/address_assoc_add"
                                    altClass="btn btn-block bg-gradient-success float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    <MyButton 
                                    type="default-group"
                                    title="Add Individual Association"
                                    linkTo="/user/individual_assoc_add"
                                    altClass="btn btn-block bg-gradient-purple float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    <MyButton 
                                    type="default-group"
                                    title="List Mode"
                                    linkTo="/user/users"
                                    altClass="btn btn-block bg-gradient-warning float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0" style={{height: "530px"}}>
                                    <table className="table table-head-fixed text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Staff Name</th>
                                                <th>Driv Lic</th>
                                                <th>Elig Status </th>                                                
                                                <th>Social</th>
                                                <th>CMT</th>
                                                <th>First Aid</th>
                                                <th>CPR</th>
                                                <th>BPS/MANDT</th>
                                                <th>Blood Boorne</th>
                                                <th>Staff Name</th>
                                                <th>Comm Integr</th>
                                                <th>IDOOP</th>
                                                <th>Chara</th>
                                                <th>Funda Rig</th>
                                                <th>Comm Dis</th>
                                                <th>Supo Indiv</th>
                                                <th>Comm Skills</th>
                                                <th>Aging</th>
                                                <th>Incident Rep</th>
                                                <th>Seiz</th>
                                                <th>Autism</th>
                                            </tr>
                                        </thead>
                                        <TableBlock
                                        list= {this.props.user.articles}
                                        limit={this.state.limit}
                                        size={this.props.user.Size}
                                        formname= 'UsersExp'                                        
                                        loadMore={()=>this.loadMoreCards()}
                                        isSadmin={this.props.user.userData.isSadmin}
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

export default connect(mapStateToProps)(UsersExp);