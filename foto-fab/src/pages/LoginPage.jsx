import React, { Component } from "react";
//import LoginAnimation from "../components/LoginAnimation";
//import LoginForm from "../components/LoginForm";
//import "./styles/loginPage.scss";
import { key } from "../config";
import "./styles/loginPage.scss";
//import LoginPhoto from "../components/LoginPhoto";
import { Link } from "react-router-dom";
import lg from "../image/crlg.png";
// import logo from "../image/logof.svg";
import logo from "../image/loginLogo.svg";
class LoginPage extends Component {
  state = {
    loginClicked: false,
  };
  handleLogin = () => {
    console.log("clicked");
    this.setState({ loginClicked: true });
  };

  componentDidMount() {
    document.getElementById("navbar").style.display = "none";
  }

  componentWillUnmount() {
    document.getElementById("navbar").style.display = "flex";
  }
  render() {
    return (
      // <div className="login-page">
      //   {/* <LoginAnimation /> */}
      //   <LoginPhoto />
      //   <LoginForm />
      //   <Link to="/signUp">not a member yet? Sign up!</Link>
      // </div>
      <div className="login-page">
        <div className="top"></div>
        <div className="bottom">
          <div className="light-green-bg">
            <div className="girl-container">
              <img src={lg} className="girl" alt="login-girl"></img>
            </div>
            <div className="left">
              <div className="logo">
                <Link to="/">
                  <img src={logo} className="lg" alt="logo"></img>
                </Link>
              </div>
              <div className="time">
                <span>
                  <span className="est">est</span>
                  <span className="date">07</span>
                  <span className="month">Aug,2020</span>
                </span>
              </div>
            </div>
            <div className="right">
              <h1>Login</h1>
              <a
                href={`https://unsplash.com/oauth/authorize?&client_id=${key.ACCESS_KEY}&redirect_uri=${key.REDIRECT_URI}&response_type=code&scope=public+read_user+write_user+write_likes+write_collections`}
              >
                <button className="button" onClick={this.handleLogin}>
                  Login with Unsplash
                </button>
              </a>
              <div className="top">
                {/* <a href={`https://unsplash.com/oauth/authorize?&client_id=${key.ACCESS_KEY}&redirect_uri=${key.REDIRECT_URI}&response_type=code&scope=public+read_user+write_user+write_likes+write_collections`}
                 >
            not a member yet? Sign up!
          </a> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginPage;
