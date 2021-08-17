import React, { Component } from "react";
import axios from "axios";
import socketClient from "socket.io-client";

import Header from "../components/Header/Header";
import BoxMessage from "../components/Chat/BoxMessage";
import FormName from "../components/Chat/FormName";

var SERVER = `${process.env.REACT_APP_SERVER_URL}`;
var socket = socketClient(SERVER);

export default class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = { message: [] };

    this.addMessage = this.addMessage.bind(this);
    this.removeChat = this.removeChat.bind(this);
    this.loadChat = this.loadChat.bind(this);
    this.resend = this.resend.bind(this);
  }

  componentDidMount() {
    this.loadChat();

    socket.on("load chat", () => {
      this.loadChat();
    });

    socket.on("remove chat", () => {
      this.loadChat();
    });
  }

  loadChat() {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/api/chat`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        this.setState({
          message: response.data.map((item) => {
            item.sent = true;
            return item;
          }),
        });
      });
  }

  addMessage(message, fullname) {
    const id = Date.now();
    this.setState((state, props) => ({
      message: [...state.message, { id, message, fullname, sent: true }],
    }));
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/chat/add`, {
        id, message, fullname,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
      )
      .then((data) => {
        socket.emit("new message", null);
      })
      .catch((err) => {
        console.log(err);
        this.setState((state, props) => ({
          message: state.message.map((item) => {
            if (item.id === id) {
              item.sent = false;
            }
            return item;
          }),
        }));
      });
  }

  resend(message, fullname) {
    const id = Date.now();
    axios
      .post(`${process.env.REACT_APP_SERVER_URL}/api/chat/add`, {
        id, message, fullname,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
      ).then((data) => {
      socket.emit("new message", null);
      this.loadChat();
    });
  }

  removeChat(id) {
    axios
      .delete(`${process.env.REACT_APP_SERVER_URL}/api/chat/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((response) => {
        socket.emit("delete message", null);

        this.setState({
          message: this.state.message.filter((item) => item.id !== id),
        });
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    return (
      <div className="container mt-4">
        <Header></Header>
        <BoxMessage
          data={this.state.message}
          removeChat={this.removeChat}
          resend={this.resend}
        ></BoxMessage>
        <FormName addMessage={this.addMessage}></FormName>
      </div>
    );
  }
}
