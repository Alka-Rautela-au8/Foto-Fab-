import React, { Component } from "react";
import PhotoCard from "./photoCard";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import "./styles/photoCard.scss";
export class SearchedPhotos extends Component {
  render() {
    const { searchPhotos } = this.props;
    return !searchPhotos ? (
      <Spinner />
    ) : searchPhotos.length < 1 ? (
      <Spinner />
    ) : (
      <div>
        <div className="photo-container">
          {searchPhotos.map((image) => (
            <PhotoCard
              photo={image}
              key={`${Math.floor(Math.random() * 10 ** 100)}${new Date()}`}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    searchPhotos: state.searchPhotoState.photos,
  };
};

export default connect(mapStateToProps, null)(SearchedPhotos);
