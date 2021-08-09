import React, { Component } from "react";
import { Link } from 'react-router-dom'

export default class FormName extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "", fullname: localStorage.getItem("name") };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    this.props.addMessage(this.state.message, this.state.fullname)
    this.setState({message: ""})
    event.preventDefault();
    
  }

  logout(e){
    e.preventDefault()
    localStorage.clear()
    window.location = "/"
  }

  render() {
    return (
      <div className="mt-4 row form-chat-styling">
        <form onSubmit={this.handleSubmit} className="mt-4">
          <div className="form-group">
            <label>Name:</label>
            <input
              className="form-control col-sm-4"
              name="fullname"
              type="text"
              value={localStorage.getItem("name")}
              onChange={this.handleChange}
              readOnly
            />
          </div>
          <div className="form-group">
            <label>Message:</label>
            <textarea
              className="form-control col-sm-4 mb-4"
              name="message"
              type="text"
              value={this.state.message}
              onChange={this.handleChange}
            ></textarea>
          </div>
          <button className="btn btn-primary btn-lg">
            Post
          </button>
          <Link to="/" className="btn btn-secondary btn-lg" onClick={this.logout}>
            Logout
          </Link>
        </form>
         
      </div>
    );
  }
}
