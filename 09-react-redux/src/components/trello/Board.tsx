import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import "../../css/home.css";
import uuidv1 from "uuid";
import { connect } from "react-redux";
import { addNewBoard, editBoard } from "../../actions/TrelloActions";

class BoardComponent extends Component<any, any> {
  public refs!: {
    boardname: HTMLInputElement;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      currentboard: "",
      editData: ""
    };

    this.addnewboardHandler = this.addnewboardHandler.bind(this);
    this.editHandler = this.editHandler.bind(this);
    this.updateHandler = this.updateHandler.bind(this);
  }

  editHandler(id: string, text: string, flag: boolean) {
    if (flag) {
      this.setState({ currentboard: id, editData: text });
    } else {
      this.setState({ currentboard: "", editData: "" });
    }
  }

  updateHandler(id: string) {
    this.props.editBoard({ id: id, title: this.state.editData });
    this.editHandler("", "", false);
  }

  addnewboardHandler() {
    let boardname = this.refs.boardname.value;
    if (boardname !== "") {
      this.props.addBoard({ id: uuidv1(), title: boardname });
      this.refs.boardname.value = "";
    }
  }

  onChange(e: any) {
    this.setState({ editData: e.target.value });
  }

  renderboardlist() {
    const template = this.props.boards.map(
      (board: { title: string; id: any }, i: any) => {
        return (
          <div className="board-link blue" key={board.id}>
            <div
              className={`edit-container ${
                board.id == this.state.currentboard ? "dn" : "db"
              } `}
            >
              <Link to={`/trello/detail/${board.id}`}>
                {" "}
                <div className="board-link-title">{board.title}</div>{" "}
              </Link>
            </div>
            <div
              className={`update-container  ${
                board.id == this.state.currentboard ? "db" : "dn"
              }`}
            >
              <input
                type="text"
                value={this.state.editData}
                onChange={e => this.onChange(e)}
              />
            </div>
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
            <div
              className={`edit-container ${
                board.id == this.state.currentboard ? "dn" : "db"
              } `}
            >
              <a
                href="#"
                onClick={() => {
                  this.editHandler(board.id, board.title, true);
                }}
                className="btn btn-sm btn-danger"
              >
                Edit
              </a>
            </div>
            <div
              className={`update-container  ${
                board.id == this.state.currentboard ? "db" : "dn"
              }`}
            >
              <a
                href="#"
                onClick={() => {
                  this.updateHandler(board.id);
                }}
                className="btn btn-sm btn-success"
              >
                Update
              </a>{" "}
              &nbsp;
              <a href="#" className="btn btn-sm btn-info">
                Cancel
              </a>
            </div>
          </div>
        );
      }
    );
    return template;
  }

  render() {
    return (
      <Fragment>
        <div className="home">
          <div className="main-content">
            <h1>board List</h1>
            <div className="boards">
              {this.renderboardlist()}
              <div className="add-board-container">
                <input type="text" ref="boardname" />
                <button
                  className="add-board-button"
                  onClick={this.addnewboardHandler}
                >
                  Add a new board...
                </button>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return { boards: state.trelloReducer.boards };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addBoard: (payload: any) => dispatch(addNewBoard(payload)),
    editBoard: (payload: any) => dispatch(editBoard(payload))
  };
}

const BoardLists = connect(
  mapStateToProps,
  mapDispatchToProps
)(BoardComponent);
export default BoardLists;
