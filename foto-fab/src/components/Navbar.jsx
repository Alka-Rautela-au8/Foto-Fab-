import React, { Component } from "react";
import { NavLink, Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./styles/navbar.scss";
import ViewProfile from "./ViewProfile";
import logo from "../logo/logo.svg";
import { connect } from "react-redux";
import {
  logOutUser,
  unsplashLogin,
  fetchCurrentUserProfile,
} from "../redux/actions/userAction";
import { showCreateCollectionModal } from "../redux/actions/currentUserAction";
import { showLogoutModal } from "../redux/actions/currentUserAction";

import axios from "axios";
import { key } from "../config";
class Navbar extends Component {
  state = {
    isToggled: false,
    loginClicked: false,
    code: null,
    gotToken: false,
  };

  // fetchUserLikedPhotos = async (username) => {
  //   try {
  //     const { data } = await axios.get(
  //       `https://api.unsplash.com/users/${username}/likes/?client_id=${key.ACCESS_KEY}`
  //     );
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };

  async componentDidMount() {
    console.log(this.props.location.search);
    // console.log("window history", window.location.search);
    const query = window.location.search.slice(6);
    this.setState({ code: query });
    if (this.props.accessTokenData === null) {
      this.props.unsplashLogin(query);
    }
    // if (this.props.user) {
    //   this.fetchUserLikedPhotos(this.props.user.username);
    // }
  }

  componentDidUpdate() {
    if (this.props.accessTokenData !== null && this.props.user === null) {
      this.props.fetchCurrentUserProfile(
        this.props.accessTokenData.access_token
      );
    }
  }

  handleToggle = () => {
    console.log("clicked");
    this.setState({ isToggled: !this.state.isToggled });
  };

  handleLogin = () => {
    console.log("clicked");
    this.setState({ loginClicked: true });
  };

  handleProfile = () => {
    this.props.history.push(`/profile/${this.props.user.username}`);
  };

  render() {
    const { isToggled } = this.state;
    let activeClass = "";
    if (isToggled) activeClass = "active";
    console.log("window history", this.state.code);

    return (
      <nav className="navbar" id="navbar">
        <div className="primary-components">
          <div className="brand-title">
            <Link
              to="/"
              className="brand-name"
              style={{
                textDecoration: "none",
                color: "inherit",
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={logo} alt="" height="40px" />
              <p style={{ marginLeft: "10px", fontWeight: "500" }}>Foto-Fab</p>
            </Link>
          </div>
          <div className="toggle-button" onClick={this.handleToggle}>
            <span className="bar"></span>
            <span className="bar"></span>
            <span className="bar"></span>
          </div>
        </div>

        <div className={`navbar-links ${activeClass}`}>
          <ul>
            <li>
              <NavLink
                className="main-nav"
                activeClassName="main-nav-active active"
                exact
                to="/"
              >
                {/* <button className="home-button">  */}
                Home
                {/* </button> */}
              </NavLink>
            </li>
            <li>
              {this.props.user && (
                <button
                  onClick={() => this.props.showCreateCollectionModal()}
                  className="create-collection-button"
                >
                  Create Collection
                </button>
              )}
            </li>
            <li>
              {this.props.user ? (
                <ViewProfile
                  profilePic={this.props.user.profile_image.large}
                  handleProfile={this.handleProfile}
                />
              ) : null}
            </li>
            <li>
              {this.props.accessTokenData ? (
                <button
                  className="logout-button"
                  onClick={() => this.props.showLogoutModal()}
                >
                  Logout
                </button>
              ) : (
                <NavLink to="/login">
                  <button onClick={this.handleLogin} className="login-button">
                    Login
                  </button>
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessTokenData: state.userState.accessTokenData,
    user: state.userState.userProfile,
  };
};

export default connect(mapStateToProps, {
  logOutUser,
  unsplashLogin,
  fetchCurrentUserProfile,
  showCreateCollectionModal,
  showLogoutModal,
})(withRouter(Navbar));
