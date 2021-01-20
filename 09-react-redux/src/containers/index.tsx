import React, { Component } from "react";
import { Link } from "react-router-dom";

interface ApplicataionProps {}

export default class Application extends Component<ApplicataionProps> {
  render() {
    return (
      <div className="header-section">
        <div className="home">
          <div className="main-content">
            <div className="boards">
              <Link to={`/trello`} className="board-link">
                <div className="board-link-title">Trello</div>
                <div className="mini-board">
                  <div className="mini-list" style={{ height: "20%" }} />
                  <div className="mini-list" style={{ height: "30%" }} />
                  <div className="mini-list" style={{ height: "55%" }} />
                  <div className="mini-list" style={{ height: "75%" }} />
                  <div className="mini-list" style={{ height: "30%" }} />
                  <div className="mini-list" style={{ height: "66%" }} />
                  <div className="mini-list" style={{ height: "80%" }} />
                  <div className="mini-list" style={{ height: "90%" }} />
                </div>
              </Link>
              <Link to={`/slack`} className="board-link ">
                <div className="board-link-title">Slack</div>
              </Link>

              <Link to={`/note`} className="board-link ">
                <div className="board-link-title">TODO LIST</div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
