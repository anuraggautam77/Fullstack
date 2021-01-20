import React, { Component } from 'react';
import { Link } from "react-router-dom";

class Application extends Component {
 

    render() {

        return (
            <div className="header-section">
                <div className="home">
                    <div className="main-content">
                        <div className="boards">
                            <Link to={`/trello`} className="board-link">
                                <div className="board-link-title">Trello</div>
                                <div className="mini-board">
                                    <div className="mini-list" style={{ "height": "20%" }}></div>
                                    <div className="mini-list" style={{ "height": "30%" }}></div>
                                    <div className="mini-list" style={{ "height": "55%" }}></div>
                                    <div className="mini-list" style={{ "height": "75%" }}></div>
                                    <div className="mini-list" style={{ "height": "30%" }}></div>
                                    <div className="mini-list" style={{ "height": "66%" }}></div>
                                    <div className="mini-list" style={{ "height": "80%" }}></div>
                                    <div className="mini-list" style={{ "height": "90%" }}></div>
                                </div>
                            </Link>
                            <Link to={`/slack`} className="board-link ">
                                <div className="board-link-title">Slack</div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

}


export default Application;
