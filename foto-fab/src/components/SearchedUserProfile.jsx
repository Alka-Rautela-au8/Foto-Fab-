import React, { Component } from "react";
import { withRouter } from "react-router-dom";
class SearchedUserProfile extends Component {
  handleProfile = () => {
    this.props.history.push(`/public/${this.props.user.username}`);
  };

  render() {
    const { user } = this.props;
    return (
      <div
        onClick={this.handleProfile}
        className="searched-user-profile-container"
      >
        <div className="searched-user-profile-bio">
          <div className="profile-img">
            <img src={user.profile_image.large} alt="" />
          </div>
          <div className="bio">
            <h4>{user.name}</h4>
            <p>@{user.username}</p>
          </div>
        </div>
        <div className="user-photos">
          {user.photos.length < 1 ? (
            <p>No Photos</p>
          ) : (
            user.photos.map((photo) => (
              <img key={photo.id} src={photo.urls.thumb} alt="" />
            ))
          )}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchedUserProfile);
