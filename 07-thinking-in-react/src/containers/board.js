import React, { Component } from 'react';

import Header from "../components/header";
import BoardListComponent from '../components/trello/BoardList';


class Board extends Component {
 

    render() {

        return (
            <div className="header-section">
                <Header/>
                <BoardListComponent />
            </div>
        );
    }

}


export default Board;
