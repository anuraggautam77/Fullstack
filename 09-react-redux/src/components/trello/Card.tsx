import React, { Component } from "react";

class CardComponent extends Component<any, any> {
  render() {
    return (
      <div className="card">
        <div className="text-right">
          <i
            onClick={(id: any) => this.props.crossClick(this.props.carddata.id)}
            className="fa fa-close"
          />
        </div>
        <div className="card-title"> {this.props.carddata.title}</div>
        <div className="card-detail"> {this.props.carddata.detail}</div>
      </div>
    );
  }
}

export default CardComponent;
