import React, { Component } from "react";

import Header from "../components/header"
import BoardComponent from "../components/trello/Board";

class Home extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="header-section">
        <Header title="" />
        <BoardComponent />
      </div>
    );
  }
}

export default Home;
