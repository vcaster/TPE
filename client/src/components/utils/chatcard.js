import React from "react";
import moment from 'moment';

function ChatCard(props) {
    return (
        <React.Fragment>
        {/* <div style={{ width: '100%' }}>
            <Comment
                author={props.name.name}
                avatar={
                    <Avatar
                        src={props.name.image} alt={props.name.name}
                    />
                }
                content={
                        <p>
                            {props.message}
                        </p>
                }
                datetime={
                    <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                        <span>{moment().fromNow()}</span>
                    </Tooltip>
                }
            />
        </div> */}
        {props.uid == props.name._id ? 
        
        <div className="direct-chat-msg right">
            <div className="direct-chat-infos clearfix">
                <span className="direct-chat-name float-right">{props.name.name} {props.name.lastname}</span>
                <span className="direct-chat-timestamp float-left">{moment(props.createdAt).fromNow()}</span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={props.name.photo} alt="message user image" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">
                {props.message}
            </div>

        </div>

        :
        <div className="direct-chat-msg">
            <div className="direct-chat-infos clearfix">
                <span className="direct-chat-name float-left">{props.name.name} {props.name.lastname}</span>
                <span className="direct-chat-timestamp float-right">{moment(props.createdAt).fromNow()}</span>
            </div>
            {/* /.direct-chat-infos */}
            <img className="direct-chat-img" src={props.name.photo} alt="message user image" />
            {/* /.direct-chat-img */}
            <div className="direct-chat-text">
                {props.message}
            </div>

        </div>

        }

        </React.Fragment>
    )
}

export default ChatCard;

