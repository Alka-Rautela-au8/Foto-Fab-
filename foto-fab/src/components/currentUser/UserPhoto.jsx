import React, { Component } from "react";
import { connect } from "react-redux";
import PhotoCard from "../photoCard";

class UserPhotos extends Component {
  render() {
    const { photos } = this.props;
    return !photos ? null : (
      <div className="photo-container">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photos: state.publicUserState.photos,
  };
};

export default connect(mapStateToProps, null)(UserPhotos);
