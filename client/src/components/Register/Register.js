import React, { Component } from "react";
import { Link } from 'react-router-dom'


import Button from '../Button/Button'
import axios from 'axios'

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", fullname: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
    event.preventDefault()
    axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user/register`,{
      email: this.state.email,
      password: this.state.password,
      fullname: this.state.fullname
    }).then((user) => {
      window.location = "/chat"
      localStorage.setItem("name", user.data.data.fullname)
      localStorage.setItem("token", user.data.token)
    })

  }
  render() {
    return (
      <div className="container border  ">
        <h1>Form Registrasi</h1>
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="form group">
              <label>Email:</label>
              <input
                className="form-control"
                type="email"
                name="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <div className="form group">
              <label>Password:</label>
              <input
                className="form-control"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>
            <br />

            <div className="form group">
              <label>Fullname:</label>
              <input
                className="form-control mb-3"
                type="text"
                name="fullname"
                value={this.state.fullname}
                onChange={this.handleChange}
              />
            </div>
            <br />
            <Button isPrimary isLarge>Register</Button>
            <p className="text-center mt-2">Already have account ? <Link to="/">click here to login</Link></p>

          </div>
        </form>
      </div>
    );
  }
}
