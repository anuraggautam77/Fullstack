import React, { Component } from "react";
import Item from "./Item";
import { connect } from "react-redux";
import uuidv1 from "uuid";

import {
  addNewItem,
  changestatus,
  deleteItem
} from "../../actions/TodoActions";

class Listing extends Component<any, any> {
  public refs!: {
    title: HTMLInputElement;
  };

  constructor(props: any) {
    super(props);
    this.addItem = this.addItem.bind(this);
    this.changeItemStatus = this.changeItemStatus.bind(this);
    this.itemDelete = this.itemDelete.bind(this);
  }

  addItem() {
    const title = this.refs.title.value;

    if (title != "") {
      this.props.addNewItem({ id: uuidv1(), name: title, status: "P" });
      this.refs.title.value = "";
    }
  }

  templateRender(items: any) {
    const template = items.map((item: any, i: number) => {
      return (
        <Item
          data={item}
          key={i}
          changeStatus={(id: any, flag:any) => {
            this.changeItemStatus(id,flag);
          }}
          deleteItem={(id: any) => {
            this.itemDelete(id);
          }}
        />
      );
    });
    return template;
  }

  changeItemStatus(id: any,flag:any) {
    this.props.changestatus({ id: id, status:flag });
  }

  itemDelete(id: any) {
    this.props.deleteItem({ id: id });
  }

  render() {
    const { todo } = this.props;
    return (
      <div className="container header-section">
        <section>
          <div className="row add-container">
            <input
              ref="title"
              className="offset-sm-3 col-sm-4 form-control"
              type="text"
              placeholder="Title"
              name="notetitle"
            />
            &nbsp;
            <a
              onClick={() => {
                this.addItem();
              }}
              className="btn btn-primary"
              href="javascript:void(0)"
            >
              Add Note
            </a>
          </div>
        </section>
        <hr />
        <h3>{todo.items.length} List(s)</h3>
        <section>
          <div className="row add-container-d">
            {this.templateRender(todo.items)}
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return { todo: state.todoReducer };
}

function mapDispatchToProps(dispatch: any) {
  return {
    addNewItem: (payload: any) => dispatch(addNewItem(payload)),
    changestatus: (payload: any) => dispatch(changestatus(payload)),
    deleteItem: (payload: any) => dispatch(deleteItem(payload))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Listing);
