import React, { Component } from "react";
import uuidv1 from "uuid";

class MessageCenter extends Component<any, any> {
  public refs!: {
    newmessage: HTMLInputElement;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      messages: props.messages
    };
  }

  componentWillReceiveProps(newprops: any) {
    this.setState({ messages: newprops.messages });
  }

  sendMessage() {
    const message = this.refs.newmessage.value;
    if (message !== "") {
      const obj = { id: uuidv1(), message: message, userid: 1 };
      this.props.sendMessage(obj);
    }
    this.refs.newmessage.value = "";
  }

  rendertemplate() {
    const template = this.state.messages.map(
      (obj: { name: String; message: String, id:any }, i: number) => {
        return (
          <div className="incoming_msg" key={i}>
            <div className="received_msg">
              <div className="received_withd_msg">
                <span> <b>{obj.name} :</b>   </span>
                <p>{obj.message}</p>
              </div>
            
            </div>
           <b><a  className="dangercross delete" onClick={()=>this.props.messageDetele(obj.id)}
            style={{"float":"right"}} href="javascript:void(0)" > x </a></b> 
          </div>
        );
      }
    );
    return template;
  }

  render() {
    return (
      <div className="message-container">
        <div className="heading">
          Message Pannel : {this.state.messages.length} Message(s)
        </div>
        <hr />
        <div className="messages">{this.rendertemplate()}</div>
        <div className="send-message-container">
          <div className="box">
            <input  className="send-input" ref="newmessage" type="text"  placeholder="send your message"
            />
            <a href="#" onClick={() => { this.sendMessage(); }} className="link-style"  >
              Send
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default MessageCenter;
