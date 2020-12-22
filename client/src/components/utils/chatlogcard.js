import React from "react";
import moment from 'moment';
import Button from './button'

function ChatLogCard(props) {
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
        {console.log(props)}
        {props.uid !== props.name ? 
        
        
                <tr>
                    <td>
                        <div className="icheck-primary">
                            <input type="checkbox" defaultValue id="check1" />
                            <label htmlFor="check1" />
                        </div>

                    </td>
                    <td className="mailbox-star"><a href="#"><i class="fas fa-star text-warning"></i></a></td>
                    <td className="mailbox-name">
                        <a href="read-mail.html">
                    </a>
                    <Button
                            type="default-a"
                            // altClass="btn btn-block bg-gradient-primary"
                            title={`${props.details[0].name} ${props.details[0].lastname}`}
                            linkTo={`/chat/${props.name}`}
 
                            // addStyles={{
                            //     margin: "10px 0 0 0"
                            // }}
                        />
                    </td>
                    <td className="mailbox-subject"> { props.read ? props.message : <b>{props.message}</b> }
                    </td>
                    <td className="mailbox-attachment"></td>
                    <td className="mailbox-date">{moment(props.createdAt).fromNow()}</td>
                </tr>
            

        :
        null

        }

        </React.Fragment>
    )
}

export default ChatLogCard;

