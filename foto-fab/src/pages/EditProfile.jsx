import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { editProfile } from "../redux/actions/userAction";
import "./styles/editProfile.scss";
import image from "./img/profile_data.svg";
import MobileNavigation from "../components/mobileNavigation";
import { showEditAlert } from "../redux/actions/currentUserAction";
class EditProfile extends Component {
  state = {
    firstName: this.props.user.first_name,
    lastName: this.props.user.last_name,
    bio: this.props.user.bio,
  };
  handleFirstName = (e) => {
    this.setState({
      firstName: e.target.value,
    });
  };

  handleLastName = (e) => {
    this.setState({
      lastName: e.target.value,
    });
  };

  handleBio = (e) => {
    this.setState({
      bio: e.target.value,
    });
  };

  handleSave = (e) => {
    e.preventDefault();
    const fName = this.state.firstName;
    const lName = this.state.lastName;
    const bioData = this.state.bio;
    if (fName && lName) {
      this.props.editProfile(
        fName,
        lName,
        bioData,
        this.props.accessToken.access_token
      );
      this.props.history.push(`/profile/${this.props.user.username}`);
    } else {
      this.props.showEditAlert();
    }
  };

  handleCancel = (e) => {
    this.props.history.push(`/profile/${this.props.user.username}`);
  };

  render() {
    return !this.props.user ? (
      <Redirect to="/" />
    ) : (
      <>
        <div className="edit-profile">
          <h1>Edit Profile</h1>
          <div className="main-profile-container">
            <div className="illustration">
              <img src={image} alt="" />
            </div>
            <div className="form">
              <form className="edit-form-container">
                <label>
                  First Name
                  <input
                    type="text"
                    name="firstName"
                    required
                    value={this.state.firstName}
                    onChange={this.handleFirstName}
                  />
                </label>
                <label>
                  Last Name
                  <input
                    type="text"
                    name="lastName"
                    required
                    value={this.state.lastName}
                    onChange={this.handleLastName}
                  />
                </label>
                <label>
                  Bio
                  <textarea
                    rows="5"
                    maxLength="100"
                    name="bio"
                    value={this.state.bio}
                    onChange={this.handleBio}
                  ></textarea>
                </label>
                <div className="buttons">
                  <button type="submit" onClick={this.handleSave}>
                    Save
                  </button>
                  <button className="cancel" onClick={this.handleCancel}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <MobileNavigation />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.userProfile,
    accessToken: state.userState.accessTokenData,
  };
};

export default connect(mapStateToProps, { editProfile, showEditAlert })(
  EditProfile
);
