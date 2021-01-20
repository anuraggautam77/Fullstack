import React, { Component } from "react";

import Header from "../components/header"

class Home extends Component {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className="header-section">
          <Header title="" />
      </div>
    );
  }
}

export default Home;
