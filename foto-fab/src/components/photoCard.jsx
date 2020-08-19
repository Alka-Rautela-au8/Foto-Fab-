import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import { withRouter, Link, Redirect } from "react-router-dom";
import axios from "axios";
import { connect } from "react-redux";
import { likeAPhoto, unlikeAPhoto } from "../redux/actions/userAction";
import {
  likePictureLocally,
  removePictureLocally,
} from "../redux/actions/currentUserAction";

import CollectionModal from "./CollectionModal";
import { showAlertModal } from "../redux/actions/currentUserAction";
class PhotoCard extends Component {
  state = {
    liked: false,
    display: "none",
  };

  checkIfAlreadyLiked = () => {
    if (this.props.localLikes) {
      for (let item of this.props.localLikes) {
        if (this.props.photo.id === item.id) {
          this.setState({ liked: true });
        }
      }
    }
  };

  handleDisplay = () => {
    console.log(this.state.display);
    if (this.props.accessTokenData !== null) {
      if (this.state.display === "none") {
        this.setState({ display: "flex" });
      } else {
        this.setState({ display: "none" });
      }
    } else {
      this.props.showAlertModal();
    }
  };

  handleProfile = () => {
    this.props.history.push(`/public/${this.props.photo.user.username}`);
  };

  handlePhoto = () => {
    this.props.history.push(`/detailPage/${this.props.photo.id}`);
  };

  //TODO: redirect to login page if not a user
  handleLike = () => {
    if (this.props.user && this.props.accessTokenData !== null) {
      this.setState({ liked: !this.state.liked });
      if (!this.state.liked) {
        this.props.likeAPhoto(
          this.props.photo.id,
          this.props.accessTokenData.access_token
        );
        this.props.likePictureLocally({ ...this.props.photo });
        this.setState({ liked: true });
        console.log("like");
      } else {
        this.props.removePictureLocally(this.props.photo.id);
        this.props.unlikeAPhoto(
          this.props.photo.id,
          this.props.accessTokenData.access_token
        );
        console.log("unlike");
        this.setState({ liked: false });
      }
    } else {
      this.props.showAlertModal();
    }
  };

  handleDownload = () => {
    console.log("download");
    console.log(this.props.photo.links.download);
    axios({
      url: this.props.photo.urls.small,
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${this.props.photo.id}.jpg`);
        document.body.appendChild(link);
        link.click();
      })
      .catch((err) => alert("this picture cannot be downloaded"));
  };

  render() {
    const { photo } = this.props;
    return (
      <div className="photo-card" onMouseOver={this.checkIfAlreadyLiked}>
        <img src={`${photo.urls.regular}`} alt="" />
        {this.state.display === "flex" ? (
          <CollectionModal
            id={photo.id}
            handleDisplay={this.handleDisplay}
            display={this.state.display}
          />
        ) : (
          <div className="overlay">
            <div className="like-add">
              <button onClick={this.handleLike}>
                {this.state.liked ? (
                  <i className="fa fa-heart" aria-hidden="true"></i>
                ) : (
                  <i className="fa fa-heart-o" aria-hidden="true"></i>
                )}
              </button>
              <div className="tooltip-container">
                <button onClick={this.handleDisplay}>
                  <i className="fa fa-plus"></i>
                  <span className="tooltip-content">
                    Add to <br /> Collection
                  </span>
                </button>
              </div>
            </div>
            <div className="view-image">
              <button onClick={this.handlePhoto}>View Image</button>
            </div>
            <div className="photographer-download">
              <div className="user-info" onClick={this.handleProfile}>
                <div className="profile-image">
                  <img src={`${photo.user.profile_image.medium}`} alt="" />
                </div>
                <p>{photo.user.name}</p>
              </div>

              <button onClick={this.handleDownload}>
                <i className="fa fa-arrow-down"></i>
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessTokenData: state.userState.accessTokenData,
    userLikedPhotos: state.currentUserState.likedPhotos,
    localLikes: state.currentUserState.localLikes,
    user: state.userState.userProfile,
  };
};

export default connect(mapStateToProps, {
  likeAPhoto,
  unlikeAPhoto,
  likePictureLocally,
  removePictureLocally,
  showAlertModal,
})(withRouter(PhotoCard));
