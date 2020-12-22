import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';
import { getLogToFormId } from '../../actions/form_actions';
import TableBlock from '../../components/utils/block_timeline'
import CollapseCheckbox from '../../components/utils/collapseCheckbox'
import Retrive from '../../components/utils/retrive'

// const title = "Address";

class TimelineUser extends Component { 
    
    state= {
        loading:true,        
        grid:'',
        limit:10,
        skip:0,
        id: this.props.user.userData._id
    }

    
    componentDidMount() {
        this.props.dispatch(getLogToFormId(
            this.state.skip,
            this.state.limit,
            this.state.id
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
        this.props.dispatch(getLogToFormId(
            skip,
            this.state.limit,
            this.state.id,
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
                <section className="content">
                    <div className="container-fluid">
                        {/* Timelime example  */}
                        <div className="row">
                            <div className="col-md-12">
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

export default connect(mapStateToProps)(TimelineUser);