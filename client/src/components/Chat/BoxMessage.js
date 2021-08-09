import React, { Component } from "react";
import ListMessage from "../Chat/ListMessage";

export default class BoxMessage extends Component {
  render() {
    const nodeList = this.props.data.map((item) => {
      return (
        <ListMessage
          id={item.id}
          fullname={item.fullname}
          message={item.message}
          key={item.id}
          remove={this.props.removeChat}
        ></ListMessage>
      );
    });
    return <div>{nodeList}</div>;
  }
}
