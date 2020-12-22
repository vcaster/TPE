import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';
import MyButton from '../../components/utils/button';
import CollapseCheckbox from '../../components/utils/collapseCheckbox'
import TableBlock from '../../components/utils/table_block_time'
import {read} from '../../components/utils/Form/fixed_categories';
import { getUsrs, getAddr, getTimeSheetFormId } from '../../actions/form_actions';
import Retrive from '../../components/utils/retrive'

const title = "Time Sheet";

class TimeSheetId extends Component {    

    state = {
        loading: true,
        grid:'',
        limit:1,
        skip:0,
        id: this.props.user.userData._id,
        filters:{
            address:[],
        }
    }

    componentDidMount() {
        this.props.dispatch(getTimeSheetFormId(
            this.state.skip,
            this.state.limit,
            this.state.id,
            this.state.filters
        )).then(response => {
            if (this.props.form.articles) {
                this.setState({
                    loading: false
                })
            }
        });

        this.props.dispatch(getAddr());
    }

    loadMoreCards = () => {
        let skip = this.state.skip + this.state.limit;
        console.log(this.props.form.articles)
        this.props.dispatch(getTimeSheetFormId(
            skip,
            this.state.limit,
            this.state.id,
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
                            <h1>{title}</h1>
                            <strong>Note:</strong>
                            <br/>
                            <strong>1.) Only submmit at the end of a pay period.</strong>
                            <br/>
                            <strong>2.)Only Add at the beginning of a pay period</strong>
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
                                    <h3 className="card-title">{title}</h3>
                                    <div className="card-tools">
                                    {this.props.form.articles[0].submitted ?
                                    <MyButton 
                                    type="default"
                                    title="Add New"
                                    linkTo="/forms/time_sheet_add"
                                    altClass="btn btn-block bg-gradient-primary float-right"
                                    addStyles={{                                        
                                    }}
                                    />
                                    :null}
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body table-responsive p-0">
                                    <table className="table table-hover text-nowrap">
                                        <thead>
                                            <tr>
                                                <th>#</th>
                                                <th>Staff</th>
                                                <th>Total Hours</th>
                                                <th>Address</th>
                                            </tr>
                                        </thead>
                                        <TableBlock
                                        list= {this.props.form.articles}
                                        limit={this.state.limit}
                                        size={this.props.form.Size}
                                        formname= 'TimeSheet'                                        
                                        loadMore={()=>this.loadMoreCards()}
                                        isAdmin={this.props.user.userData.isAdmin}
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

export default connect(mapStateToProps)(TimeSheetId);