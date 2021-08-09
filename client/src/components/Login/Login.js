import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'


import Button from '../Button/Button'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { email: "", password: "" };
    
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
        axios.post("http://localhost:3000/api/user/login",{
          email: this.state.email,
          password: this.state.password,
        }).then((user) => {
          if(user.data.success){
          window.location = "/chat"
          localStorage.setItem("name", user.data.data.fullname)
          localStorage.setItem("token", user.data.token)
          }else {
            alert("email atau password salah")
          }
        })
    
      }

    render() {
        return (
            <div className="container border  ">
        <h1>Form Login</h1>
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
                className="form-control mb-4"
                type="password"
                name="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
            </div>

            <Button isPrimary isLarge>Login</Button>
            <p className="text-center">Dont have account ? <Link to="/register">click here to register</Link></p>
          </div>
        </form>
      </div>
        )
    }
}
