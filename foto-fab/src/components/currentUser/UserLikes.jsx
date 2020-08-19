import React, { Component } from "react";
import { connect } from "react-redux";

import PhotoCard from "../photoCard";

class UserLikes extends Component {
  render() {
    const { likedPhotos } = this.props;
    return !likedPhotos ? null : (
      <div className="photo-container">
        {likedPhotos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likedPhotos: state.currentUserState.localLikes,
  };
};

export default connect(mapStateToProps, null)(UserLikes);
