import React, { Component } from "react";
import { connect } from "react-redux";
// import { actionUserName } from "../../../config/redux/action";
import Button from "../../../components/atoms/Button";
import { loginUserAPI } from "../../../config/redux/action";

class Login extends Component {
  // changeUser = () => {
  //   this.props.changeUserName();
  // };
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

  handleLoginSubmit = async () => {
    // console.log("email :", this.state.email);
    // console.log("password :", this.state.password);
    const { email, password } = this.state;
    const { history } = this.props;
    // console.log("data before send: ", email, password);
    const res = await this.props
      .loginAPI({ email, password })
      .catch((err) => err);
    if (res) {
      console.log("Login success", res);
      localStorage.setItem("userData", JSON.stringify(res));
      this.setState({
        email: "",
        password: "",
      });
      history.push("/");
    } else {
      console.log("Login failed");
      this.setState({
        email: "",
        password: "",
      });
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
      // <div>
      //   <p>Login page {this.props.userName}</p>
      //   <button onClick={this.changeUser}>GANTI NAMA</button>
      //   <button>Go to Register</button>
      //   <button>Go to Dashboard</button>
      // </div>
      <div className='auth-container'>
        <div className='auth-card'>
          <p className='auth-title'>Login page</p>
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
            placeholder='password'
            type='password'
            id='password'
            onChange={(this, this.handleChangeText)}
            value={this.state.password}
          />
          <Button
            title='Login'
            loading={this.props.isLoading}
            onClick={this.handleLoginSubmit}
          />
        </div>
        <button>Go to Dashboard</button>
      </div>
    );
  }
}

//redux thunx diubah kebawah
// const actionUserName = () => {
//   return (dispatch) => {
//     setTimeout(() => {
//       return dispatch({ type: "CHANGE_USER", value: "Raka Pramudita" });
//     }, 3000);
//   };
// };

// const reduxState = (state) => ({
//   popupProps: state.popup,
//   userName: state.user,
// });

// const reduxDispatch = (dispatch) => ({
//   changeUserName: () =>
//     // dispatch({ type: "CHANGE_USER", value: "Raka Pramudita" }),
//     dispatch(actionUserName()),
// });

const reduxState = (state) => ({
  isLoading: state.isLoading,
});

const reduxDispatch = (dispatch) => ({
  loginAPI: (data) => dispatch(loginUserAPI(data)),
});

export default connect(reduxState, reduxDispatch)(Login);
