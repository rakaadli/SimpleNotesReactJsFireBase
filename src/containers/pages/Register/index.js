import React, { Component } from "react";
import "./Register.scss";
// import firebase from "../../../config/firebase";
import Button from "../../../components/atoms/Button";
import { connect } from "react-redux";
import { registerUserAPI } from "../../../config/redux/action";

class Register extends Component {
  state = {
    email: "",
    password: "",
    // isLoading: false,
  };
  handleChangeText = (e) => {
    // console.log(e.target.id);
    this.setState({
      // email: e.target.value,
      // password: e.target.value,
      [e.target.id]: e.target.value,
    });
  };

  handleRegisterSubmit = async () => {
    // console.log("email :", this.state.email);
    // console.log("password :", this.state.password);
    const { email, password } = this.state;
    const { history } = this.props;
    console.log("data before send: ", email, password);
    const res = await this.props
      .registerAPI({ email, password })
      .catch((err) => err);
    if (res) {
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("register failed");
    }
    // this.setState({
    //   isLoading: true,
    // });
    // setTimeout(() => {
    //   this.setState({
    //     isLoading: false,
    //   });
    // }, 5000);
  };
  render() {
    return (
      <div className='auth-container'>
        <div className='auth-card'>
          <p className='auth-title'>Register page</p>
          <input
            className='input'
            placeholder='Email'
            type='text'
            id='email'
            onChange={(this, this.handleChangeText)}
            value={this.state.email}
          />
          <input
            className='input'
            placeholder='Email'
            type='password'
            id='password'
            onChange={(this, this.handleChangeText)}
            value={this.state.password}
          />
          <Button
            title='register'
            loading={this.props.isLoading}
            onClick={this.handleRegisterSubmit}
          />
        </div>
        <button>Go to Dashboard</button>
      </div>
    );
  }
}

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  registerAPI: (data) => dispatch(registerUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Register);
