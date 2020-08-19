import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import "./styles/mobileNav.scss";
import { withRouter } from "react-router";
import { Link, NavLink } from "react-router-dom";
import ViewProfile from "./ViewProfile";
import { connect } from "react-redux";
export class MobileNavigation extends Component {
  handleClick = () => {
    console.log("clicked");
  };

  handleProfile = () => {
    if (this.props.user) {
      this.props.history.push(`/profile/${this.props.user.username}`);
    }
  };
  render() {
    return (
      <div className="mobile-navbar" id="mobile-nav">
        <Link className="home" to="/">
          <i className="fa fa-home" aria-hidden="true"></i>
        </Link>
        {/* <div className="submit-photo" onClick={this.handleClick}>
          <i className="fa fa-plus-square-o" aria-hidden="true"></i>
        </div> */}
        {!this.props.user ? (
          <NavLink to="/login">
            <button className="mobile-login">Login</button>
          </NavLink>
        ) : (
          <ViewProfile
            profilePic={this.props.user.profile_image.large}
            handleProfile={this.handleProfile}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.userProfile,
  };
};

export default connect(mapStateToProps, null)(withRouter(MobileNavigation));
