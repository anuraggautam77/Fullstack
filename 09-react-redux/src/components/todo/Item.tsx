import React, { Component } from "react";

class Item extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      item: props.data
    };
  }

  changeStatus(id: any, flag: any) {
    this.props.changeStatus(id, flag);
  }

  deleteItem(id: any) {
    this.props.deleteItem(id);
  }

  componentWillReceiveProps(newprops: any) {
    this.setState({ item: newprops.data });
  }

  render() {
    var status = this.state.item.status == "C" ? "Completed" : "Complete";
    return (
      <div className="note">
        <span className="cross_btn">
          <b>
            <a
              className="dangercross delete"
              onClick={() => this.deleteItem(this.state.item.id)}
              href="javascript:void(0)"
            >
              X
            </a>
          </b>
        </span>
        <div className="note-info">
          <div
            className={`${
              this.state.item.status == "C" ? "strikethrough" : ""
            }`}
          >
            {this.state.item.name}
          </div>
        </div>
        <div className="note_action ">
          <a
            className={`btn btn-sm  ${
              this.state.item.status == "C"
                ? "disabled secondary"
                : "btn-primary"
            }`}
            onClick={() => this.changeStatus(this.state.item.id, "C")}
          >
            {" "}
            {status}{" "}
          </a>
          &nbsp;
          <a
            className={`btn btn-sm btn-primary`}
            href="javascript:void(0)"
            onClick={() => this.changeStatus(this.state.item.id, "P")}
          >
            Incomplete
          </a>
          &nbsp;
        </div>
      </div>
    );
  }
}

export default Item;
