import React, { Component } from "react";
import MobileNavigation from "../components/mobileNavigation";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { fetchLocation } from "../redux/actions/fetchCoordinates";
import { emptyImages } from "../redux/actions/searchPhotosAction";
import "./styles/publicUser.scss";

import {
  // fetchPublicUser,
  fetchPublicUserPhotos,
  fetchPublicUserLikedPhotos,
  fetchPublicUserCollections,
} from "../redux/actions/publicProfileAction";

import {
  fetchCurrentUserLikedPhotos,
  fetchCurrentUserCollections,
} from "../redux/actions/currentUserAction";

import CurrentUserProfile from "../components/currentUser/Profile";
class ProfilePage extends Component {
  state = {
    page_no: 1,
    stateChanged: false,
    user: this.props.match.params.username,
    show: false,
    lat: "",
    lng: "",
  };

  componentDidMount() {
    if (this.props.user) {
      this.props.fetchCurrentUserCollections(this.props.user.username);
    }
  }
  componentDidUpdate() {
    if (this.props.user && !this.props.currentUserCollection) {
      this.props.fetchCurrentUserCollections(this.props.user.username);
    }
  }

  showModal = () => {
    this.props
      .fetchLocation(this.props.user.location)
      .catch(alert("searching..."));
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };

  render() {
    const { user, location } = this.props;
    return (
      <div
        style={{ width: "100%", paddingTop: "100px" }}
        className="profile-page"
      >
        {!user ? (
          <Redirect to="/" />
        ) : (
          <CurrentUserProfile
            user={user}
            loc={location}
            showModal={this.showModal}
            show={this.state.show}
            hideModal={this.hideModal}
          />
        )}
        <MobileNavigation />
      </div>
    );
  }
}

const mapStateToProps = (storeState) => {
  return {
    accessTokenData: storeState.userState.accessTokenData,
    user: storeState.userState.userProfile,
    loc: storeState.locationState.location,
    currentUserCollection: storeState.currentUserState.collections,
  };
};

export default connect(mapStateToProps, {
  fetchPublicUserPhotos,
  fetchPublicUserLikedPhotos,
  fetchPublicUserCollections,
  fetchLocation,
  emptyImages,
  fetchCurrentUserLikedPhotos,
  fetchCurrentUserCollections,
})(ProfilePage);
