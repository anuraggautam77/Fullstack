import React, { Component } from "react";

class DirectList extends Component<any, any> {
  constructor(props: any) {
    super(props);

    this.state = {
      userlist: props.list
    };
  }

  renderTemplate() {
    const template = this.state.userlist.map(
      (user: { id: any; name: String }, i: number) => {
        return (
          <li
            onClick={() => {
              this.props.userClick(user.id);
            }}
            key={i}
          >
            {user.name}
          </li>
        );
      }
    );
    return template;
  }
  render() {
    return (
      <div className="channels">
        <h4 className="channel-heading">Direct Message</h4>
        <ul id="channellist">{this.renderTemplate()}</ul>
      </div>
    );
  }
}

export default DirectList;
