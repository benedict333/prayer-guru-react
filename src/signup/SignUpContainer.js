import React, { Component } from "react";
import SignUpForm from "./SignUpForm.js";
const axios = require("axios");
const FormValidators = require("./validate");
const validateSignUpForm = FormValidators.validateSignUpForm;
const zxcvbn = require("zxcvbn");

class SignUpContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: {},
      user: {
        userName: "",
        userEmail: "",
        password: ""
      
      },
      btnTxt: "show",
      type: "password",
      score: "0"
    };

    this.pwMask = this.pwMask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.submitSignup = this.submitSignup.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.pwHandleChange = this.pwHandleChange.bind(this);
  }

  handleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  pwHandleChange(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });

    if (event.target.value === "") {
      this.setState(state =>
        Object.assign({}, state, {
          score: "null"
        })
      );
    } else {
      var pw = zxcvbn(event.target.value);
      this.setState(state =>
        Object.assign({}, state, {
          score: pw.score + 1
        })
      );
    }
  }

  submitSignup(user) {
    console.log(user)
    var params = { userName: user.usr, firstName: user.firstName,  lastName: user.lastName,
      age: user.age, telphone:user.telphone,
       address: user.address,password: user.pw, userEmail: user.email };
    axios
      .post("http://localhost:8080/auth/register/userName", params)
      .then(res => {
        if (res.data.success === true) {
          localStorage.token = res.data.token;
          localStorage.isAuthenticated = true;
          window.location.reload();
        } else {
          this.setState({
            errors: { message: res.data.message }
          });
        }
      })
      .catch(err => {
        console.log("Sign up data submit error: ", err);
      });
  }

  validateForm(event) {
    console.log(this.state.user.userName)
    console.log(this.state.user.userEmail)
    event.preventDefault();
    var payload = validateSignUpForm(this.state.user);
    if (payload.success) {
      this.setState({
        errors: {}
      });
            var user = {
        usr: this.state.user.userName,
        pw: this.state.user.password,
        email: this.state.user.userEmail
      };
      console.log(user)
      this.submitSignup(user);
      
    } else {
      var user = {
        usr: this.state.user.userName,
        pw: this.state.user.password,
        email: this.state.user.userEmail
      };
      console.log(user)
      this.submitSignup(user);
      const errors = payload.errors;
      this.setState({
        errors
      });
    }
  }

  pwMask(event) {
    event.preventDefault();
    this.setState(state =>
      Object.assign({}, state, {
        type: this.state.type === "password" ? "input" : "password",
        btnTxt: this.state.btnTxt === "show" ? "hide" : "show"
      })
    );
  }

  render() {
    return (
      <div>
        <SignUpForm
          onSubmit={this.validateForm}
          onChange={this.handleChange}
          onPwChange={this.pwHandleChange}
          errors={this.state.errors}
          user={this.state.user}
          score={this.state.score}
          btnTxt={this.state.btnTxt}
          type={this.state.type}
          pwMask={this.pwMask}
        />
      </div>
    );
  }
}

export default SignUpContainer;
