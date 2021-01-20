import React, { Component } from "react";

import Header from "../components/header";
import ListComponent from "../components/trello/List";

class BoardDetail extends Component<any, any> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="header-section">
        <Header title="" />
        <ListComponent boardid={this.props.match.params.id} />
      </div>
    );
  }
}

export default BoardDetail;
