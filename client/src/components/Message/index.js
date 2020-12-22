import React, { Component } from 'react';
import UserLayout from '../../hoc/user'
import { connect } from 'react-redux';
import MyButton from '../../components/utils/button';
import TableBlock from '../../components/utils/table_block'
import { getMessageToForm } from '../../actions/form_actions';
import Retrive from '../../components/utils/retrive'

const title = "Message";

class Message extends Component {    

    state = {
        loading: true,
        grid:'',
        limit:100,
        skip:0,
    }

    componentDidMount() {
        this.props.dispatch(getMessageToForm(
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
                            <div className="card">
                                <div className="card-header">
                                    <h3 className="card-title">{title}</h3>
                                    <div className="card-tools">
                                    <MyButton 
                                    type="default"
                                    title="Add New"
                                    linkTo="/messages/message_add"
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
                                                <th>Title</th>
                                            </tr>
                                        </thead>
                                        <TableBlock
                                        list= {this.props.user.articles}
                                        limit={this.state.limit}
                                        size={this.props.user.Size}
                                        formname= 'Message'                                        
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

export default connect(mapStateToProps)(Message);