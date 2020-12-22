import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';
import MyButton from '../../components/utils/button';
import CollapseCheckbox from '../../components/utils/collapseCheckbox'
import TableBlock from '../../components/utils/table_block'
import {read} from '../../components/utils/Form/fixed_categories';
import { getAddr, getUsrs, getSafetyInspecToForm } from '../../actions/form_actions';
import Retrive from '../../components/utils/retrive'

const title = "Safety Inspection Checklist";

class SafetyInspec extends Component {    

    state = {
        loading: true,
        grid:'',
        limit:100,
        skip:0,
        filters:{
            individual:[],
            address:[],
            read: []
        }
    }

    componentDidMount() {
        if(this.props.user.userData.isSadmin){
        this.props.dispatch(getSafetyInspecToForm(
            this.state.skip,
            this.state.limit,
            this.state.filters
        )).then(response => {
            if (this.props.form.articles) {
                this.setState({
                    loading: false
                })
            }
        });

        this.props.dispatch(getAddr());
        this.props.dispatch(getUsrs());
    }else{
        this.props.form.articles = [];
        this.props.form.Size = 0;
        this.setState({
            loading:false
        })
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

    showFilteredResults = (filters) => {
        if(filters['address'] == "" &&  this.props.user.userData.isSupervisor){
            console.log(filters['address'])
            this.props.form.articles = [];
            this.props.form.Size = 0;

        }
        else {
        this.props.dispatch(getSafetyInspecToForm(
            0,
            this.state.limit,
            filters)).then(()=>{
                this.setState({
                    skip:0
                })
            })
        }

    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;
        console.log(this.props.form.articles)
        this.props.dispatch(getSafetyInspecToForm(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.form.articles
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
                        <div className="card card-primary">
                                <div className="card-header">
                                    <h3 className="card-title">Filters</h3>
                                    <div className="card-tools">
                                        <button className="btn btn-tool" type="button" data-card-widget="collapse"><i className="fas fa-plus" />
                                        </button>
                                    </div>
                                    {/* /.card-tools */}
                                </div>
                                {/* /.card-header */}
                                <div className="card-body" style={{ display: 'block' }}>
                                {this.props.user.userData.isSupervisor ?
                            <CollapseCheckbox
                                initState={true}
                                title="Address"
                                list={this.props.user.userData.address}
                                handleFilters={(filters)=>this.handleFilters(filters,'address')}
                            />
                            :null
                            }
                            {this.props.user.userData.isSadmin ?
                            <React.Fragment>
                            <CollapseCheckbox
                                initState={false}
                                title="Users"
                                list={this.props.form.users}
                                handleFilters={(filters)=>this.handleFilters(filters,'name')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Checked"
                                list={read}
                                handleFilters={(filters)=>this.handleFilters(filters,'read')}

                            />
                            </React.Fragment>
                            :
                            null
                            }
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
                                    linkTo="/forms/safety_inspection_add"
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
                                                <th>Individual Initials</th>
                                                <th>Unit</th>
                                                <th>Date</th>
                                                <th>Staff</th>
                                            </tr>
                                        </thead>
                                        <TableBlock
                                        list= {this.props.form.articles}
                                        limit={this.state.limit}
                                        size={this.props.form.Size}
                                        formname= 'Safety_Inspec'                                        
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
        form: state.form
    }
}

export default connect(mapStateToProps)(SafetyInspec);