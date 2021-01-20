import React, { Component, Fragment } from "react";
import _ from "lodash";

import "../../css/listandcard.css";
import CardComponent from "./Card";

import uuidv1 from "uuid";
import { connect } from "react-redux";
import {
  getBoardDetail,
  addListInBoard,
  addCardInList,
  deleteCard,
  deleteList
} from "../../actions/TrelloActions";

class ListComponent extends Component<any, any> {
  public refs!: {
    newlisttitle: HTMLInputElement;
    [string: string]: any;
  };

  constructor(props: any) {
    super(props);
    this.state = {
      currentBoard: props.boardid,
      lists: [],
      cards: [],
      BoardName: ""
    };

    this.addNewlistHandler = this.addNewlistHandler.bind(this);
    this.addnewCardhandler = this.addnewCardhandler.bind(this);
  }

  componentDidMount() {
    this.props.getBoardDetail({ boardid: this.state.currentBoard });
  }

  componentWillReceiveProps(newprops: any) {
    if (newprops.boards.length > 0) {
      this.setState({
        ...this.state,
        lists: newprops.boards[0].hasOwnProperty("lists")
          ? [...newprops.boards[0].lists]
          : [],
        cards: newprops.boards[0].hasOwnProperty("cards")
          ? [...newprops.boards[0].cards]
          : []
      });
    }
  }

  rendercardlist(id: any) {
    let newarry = _.filter(this.state.cards, { listid: id });
    const listRenderTemplate = newarry.map((card, i) => (
      <CardComponent
        crossClick={(id: any) => this.deleteCardFromList(id)}
        carddata={card}
        key={i}
      />
    ));
    return listRenderTemplate;
  }

  deleteCardFromList(id: any) {
    this.props.deleteCard({ boardid: this.state.currentBoard, cardid: id });
  }

  deleteListFromBoard(id: any) {
    this.props.deleteList({ boardid: this.state.currentBoard, listid: id });
  }

  listRender() {
    const listRenderTemplate = this.state.lists.map(
      (list: { title: String; id: any }, i: number) => {
        return (
          <span key={i}>
            <div className="single-list">
              <div className="text-right">
                <i
                  onClick={(id: any) => this.deleteListFromBoard(list.id)}
                  className="fa fa-close"
                />
              </div>
              <div className="list-title">
                <span>{list.title}</span>
              </div>
              <div className="cards-container">
                {this.rendercardlist(list.id)}
                <div className="addnew-card-container">
                  <div className="inputclass">
                    <input
                      className="input"
                      ref={`cardtitle_${list.id}`}
                      placeholder="title"
                      type="text"
                    />
                  </div>
                  <div className="inputclass">
                    <input
                      className="input"
                      ref={`carddetail_${list.id}`}
                      placeholder="Detail"
                      type="text"
                    />
                  </div>
                  <a
                    href="#"
                    className="addbutton"
                    onClick={e => this.addnewCardhandler(e, list.id)}
                  >
                    Add Card
                  </a>
                </div>
              </div>
            </div>
          </span>
        );
      }
    );
    return listRenderTemplate;
  }

  addnewCardhandler(event: any, id: any) {
    event.preventDefault();
    let cardtitle = this.refs[`cardtitle_${id}`]["value"];
    let carddetail = this.refs[`carddetail_${id}`]["value"];

    if (cardtitle !== "" && carddetail !== "") {
      this.props.addCardInList({
        boardid: this.state.currentBoard,
        card: {
          id: uuidv1(),
          title: cardtitle,
          detail: carddetail,
          listid: id
        }
      });

      this.refs[`cardtitle_${id}`]["value"] = "";
      this.refs[`carddetail_${id}`]["value"] = "";
    }
  }

  addNewlistHandler() {
    let listname = this.refs.newlisttitle.value;
    if (listname !== "") {
      this.props.addListInBoard({
        boardid: this.state.currentBoard,
        list: { id: uuidv1(), title: listname }
      });
      this.refs.newlisttitle.value = "";
    }
  }
  render() {
    return (
      <Fragment>
        <div className="listandcard">
          <div className="horizontal-scroll-container">
            <h5>{` ${
              this.props.boards ? this.props.boards[0].title : "...."
            }  `}</h5>
          </div>
          <div className="horizontal-scroll-container">{this.listRender()}</div>
          <div className="horizontal-scroll-container">
            <div className="addNew-list">
              <input type="text" ref="newlisttitle" />
              <button className="btn-newlist" onClick={this.addNewlistHandler}>
                +Add new list
              </button>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state: any) {
  return { boards: state.trelloReducer.board };
}

function mapDispatchToProps(dispatch: any) {
  return {
    getBoardDetail: (payload: any) => dispatch(getBoardDetail(payload)),
    addListInBoard: (payload: any) => dispatch(addListInBoard(payload)),
    addCardInList: (payload: any) => dispatch(addCardInList(payload)),
    deleteCard: (payload: any) => dispatch(deleteCard(payload)),
    deleteList: (payload: any) => dispatch(deleteList(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListComponent);
