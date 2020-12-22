import React, { Component } from 'react'
import UserLayout from '../../hoc/user'
import io from "socket.io-client";
import { connect } from "react-redux";
import  moment  from "moment";
import { getChats, afterPostMessage, getChatLog } from '../../actions/form_actions';
import ChatCard from "../utils/chatcard"
import ChatLogCard from "../utils/chatlogcard"

export class ChatPage extends Component {
    state= {
        chatMessage: "",
        
    }

    componentDidMount() {
        let server = "http://localhost:3002";

        const id = this.props.match.params.id;
        if(this.props.user.userData){
        this.props.dispatch(getChats(id,this.props.user.userData._id)).then(response=>{
        this.props.dispatch(getChatLog(this.props.user.userData._id)).then(response=>{
            // console.log(this.props.form.chatlog)
        });

        this.socket = io(server);

        this.socket.emit("join", {send:this.props.user.userData._id});

        this.socket.on("Output Chat Message", messageFromBackEnd => {
            console.log(messageFromBackEnd)
            // console.log(id)
            if(id === messageFromBackEnd[0].name._id){
            this.props.dispatch(afterPostMessage(messageFromBackEnd));
            }
        })
        this.messagesEnde.scrollIntoView({behavior: 'smooth'})
        // this.messagesEnd.scrollIntoView({behavior: 'smooth'})
        })}
    

        
        
    }
    componentDidUpdate(){
        
        this.messagesEnde.scrollIntoView({behavior: 'smooth'})
        // this.messagesEnd.scrollIntoView({behavior: 'smooth'})
    }

    hanleSearchChange =(e) => {
        this.setState({
            chatMessage: e.target.value
        })
    }

    renderCards = () =>
        this.props.form.chats
        && this.props.form.chats.map((chat) => (
            <ChatCard key={chat._id}  {...chat} uid={this.props.user.userData._id} />
        ));

    renderLogCards = () =>
        this.props.form.chatlog
        && this.props.form.chatlog.map((chat) => (
            <ChatLogCard key={chat._id}  {...chat} uid={this.props.user.userData._id} />
        ));



    submitChatMessage = (e) => {
        e.preventDefault();
        let receid = this.props.match.params.id;
        let chatMessage = this.state.chatMessage
        let userID = this.props.user.userData._id
        let userName = this.props.user.userData.name+" "+this.props.user.userData.lastname;;
        let userImage = this.props.user.userData.photo;
        let nowTime = moment();
        let type = "Image"

        this.socket.emit("Input Chat Message", {
            receid,
            chatMessage,
            userID,
            userName,
            userImage,
            nowTime,
            type
        });
        // let messageToBackend = []
        // messageToBackend.push({
        //     message: chatMessage,
        //     _id: 22,
        //     name: {
        //         _id: this.props.user.userData._id,
        //         name: this.props.user.userData.name,
        //         lastname: this.props.user.userData.lastname,
        //         createdAt: moment().fromNow(),
        //         photo: userImage,
        //         type:"Image"
        //     },

        // })
        // console.log(messageToBackend)
        this.props.dispatch(afterPostMessage(
            {
                message: chatMessage,
                _id: Math.random(),
                name: {
                    _id: this.props.user.userData._id,
                    name: this.props.user.userData.name,
                    lastname: this.props.user.userData.lastname,
                    createdAt: moment().fromNow(),
                    photo: userImage,
                    type:"Image"
                },
    
            }
        ));
        this.setState({ chatMessage: "" })


    }

    render() {
        return (
            <React.Fragment>
                <UserLayout>
                <section className="content-header">
                <div className="container-fluid">
                    <div className="row mb-2">
                        <div className="col-sm-6">
                        <h1>Direct Chat</h1>
                        </div>
                        <div className="col-sm-6">
                            <ol className="breadcrumb float-sm-right">
                                <li className="breadcrumb-item"><a href="#">Home</a></li>
                                <li className="breadcrumb-item active">Direct Chat</li>
                            </ol>
                        </div>
                    </div>
                </div>{/* /.container-fluid */}
            </section>
                {/* DIRECT CHAT */}
            <section className="content">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="card direct-chat direct-chat-primary" >
                                <div className="card-header">
                                    <h3 className="card-title">Direct Chat</h3>
                                    <div className="card-tools">
                                        <span data-toggle="tooltip" title="3 New Messages" className="badge badge-primary">3</span>
                                        <button type="button" className="btn btn-tool" data-card-widget="collapse">
                                            <i className="fas fa-minus" />
                                        </button>
                                        <button type="button" className="btn btn-tool" data-toggle="tooltip" title="Contacts" data-widget="chat-pane-toggle">
                                            <i className="fas fa-comments" />
                                        </button>
                                        <button type="button" className="btn btn-tool" data-card-widget="remove"><i className="fas fa-times" />
                                        </button>
                                    </div>
                                </div>
                                {/* /.card-header */}
                                <div className="card-body" >
                                    {/* Conversations are loaded here */}
                                    <div className="direct-chat-messages" style={{ height: '500px' }}>
                                        {this.props.form && (
                                            <div>{this.renderCards()}</div>
                                        )}
                                        <div
                                            ref={ele => {
                                                this.messagesEnde = ele;
                                            }}
                                            style={{ float: "left", clear: "both" }}
                                        />
                                    </div>

                                    {/*/.direct-chat-messages*/}
                                    
                                    {/* /.direct-chat-pane */}
                                </div>
                                {/* /.card-body */}
                                <div className="card-footer">
                                    <form onSubmit={this.submitChatMessage}>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                value={this.state.chatMessage}
                                                onChange={this.hanleSearchChange}
                                                name="message"
                                                placeholder="Type Message ..."
                                                className="form-control" />

                                            <span className="input-group-append">
                                                <button type="primary" className="btn btn-primary" onClick={this.submitChatMessage} htmlType="submit">Send</button>
                                            </span>
                                        </div>
                                    </form>
                                </div>
                                {/* /.card-footer*/}
                            </div>
                            {/*/.direct-chat */}
                        </div>

                        <div className="col-md-8">
                            <div className="card card-primary card-outline">
                                <div className="card-header">
                                    <h3 className="card-title">Recents</h3>
                                    <div className="card-tools">
                                        {/* <div className="input-group input-group-sm">
                                            <input type="text" className="form-control" placeholder="Search Mail" />
                                            <div className="input-group-append">
                                                <div className="btn btn-primary">
                                                    <i className="fas fa-search" />
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                    {/* /.card-tools */}
                                </div>
                                {/* /.card-header */}
                                <div className="card-body p-0">
                                        {/* <div className="mailbox-controls">
                                            <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                                            </button>
                                            <div className="btn-group">
                                                <button type="button" className="btn btn-default btn-sm"><i className="far fa-trash-alt" /></button>
                                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-reply" /></button>
                                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-share" /></button>
                                            </div>
                                            <button type="button" className="btn btn-default btn-sm"><i className="fas fa-sync-alt" /></button>
                                            <div className="float-right">
                                                1-50/200
                                                <div className="btn-group">
                                                    <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-left" /></button>
                                                    <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-right" /></button>
                                                </div>
                                            </div>
                                        </div> */}
                                    <div className="table-responsive mailbox-messages" style={{ height: '562px'}}>
                                        <table className="table table-hover table-striped">
                                            <tbody style={{overflowY: 'scroll'}}>
                                            {this.props.form && (
                                            this.renderLogCards()
                                             )}
                                             <div
                                            ref={el => {
                                                this.messagesEnd= el;
                                            }}
                                            style={{ float: "left", clear: "both" }}
                                        />
                                            </tbody>
                                        </table>
                                        {/* /.table */}
                                    </div>
                                    {/* /.mail-box-messages */}
                                </div>
                                {/* /.card-body */}
                                {/* <div className="card-footer p-0">
                                    <div className="mailbox-controls">
                                        <button type="button" className="btn btn-default btn-sm checkbox-toggle"><i className="far fa-square" />
                                        </button>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-default btn-sm"><i className="far fa-trash-alt" /></button>
                                            <button type="button" className="btn btn-default btn-sm"><i className="fas fa-reply" /></button>
                                            <button type="button" className="btn btn-default btn-sm"><i className="fas fa-share" /></button>
                                        </div>
                                        <button type="button" className="btn btn-default btn-sm"><i className="fas fa-sync-alt" /></button>
                                        <div className="float-right">
                                            1-50/200
                                                <div className="btn-group">
                                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-left" /></button>
                                                <button type="button" className="btn btn-default btn-sm"><i className="fas fa-chevron-right" /></button>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                            {/* /.card */}
                        </div>

                        </div>
                </div>
            </section>
                </UserLayout>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.user,
        form: state.form
    }
}


export default connect(mapStateToProps)(ChatPage);
