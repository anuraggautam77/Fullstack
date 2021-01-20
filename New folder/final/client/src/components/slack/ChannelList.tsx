import React, { Component } from "react";
import uuidv1 from "uuid";
class Channel extends Component<any, any, any> {
  public refs!: {
    channelName: HTMLInputElement;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      channels: props.list
    };

    this.channelAddHandler = this.channelAddHandler.bind(this);
  }

  componentWillReceiveProps(newprops: any) {
    this.setState({ channels: newprops.list });
  }

  renderTemplate() {
    const template = this.state.channels.map(
      (channel: { id: any; name: any }, i: number) => {
        return (
          <li
            onClick={() => {
              this.props.channelclick(channel.id);
            }}
            key={i}
          >
            #{channel.name}
          </li>
        );
      }
    );
    return template;
  }

  channelAddHandler() {
    let channelname = this.refs.channelName.value;
    if (channelname !== "") {
      this.props.channelAddHandler({
        id: uuidv1(),
        name: channelname,
        members: []
      });
      this.refs.channelName.value = "";
    }
  }

  render() {
    return (
      <div className="channels" id="channels">
        <h4 className="channel-heading">Channels</h4>
        <ul id="channellist">{this.renderTemplate()}</ul>
        <div className="channel-add-container">
          <input
            type="text"
            ref="channelName"
            className="channel-input"
            placeholder="Channel Name"
          />
          <br />
          <a
            href="#"
            className="add-channelbtn"
            onClick={this.channelAddHandler}
          >
            Add Channel
          </a>
        </div>
      </div>
    );
  }
}

export default Channel;
