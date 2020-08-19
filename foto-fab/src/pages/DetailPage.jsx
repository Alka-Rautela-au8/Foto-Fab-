import React, { Component } from "react";
import { connect } from "react-redux";
import {
  fetchDetailPhotos,
  fetchStatistics,
} from "../redux/actions/detailPhoto";
import Spinner from "../components/Spinner";
import MobileNavigation from "../components/mobileNavigation";
import axios from "axios";
import Collection from "../components/Collection";
import { withRouter } from "react-router-dom";
import "./styles/detailPage.scss";
import { fetchLocation } from "../redux/actions/fetchCoordinates";
import Modal from "../components/Modal";
class DetailPage extends Component {
  state = {
    liked: false,
  };
  container = React.createRef();
  state = {
    show: false,
    liked: false,
    lat: "",
    lng: "",
    open: false,
    dval: " Download  ☰",
  };

  showModal = () => {
    this.props
      .fetchLocation(this.props.photo.location.name)
      .catch(alert("searching..."));
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  };
  handleSearch = (event) => {
    console.log(event.target.innerText);
    this.props.history.push(`/search/${event.target.innerText}`);
  };

  handleProfile = () => {
    this.props.history.push(`/public/${this.props.photo.user.username}`);
  };

  componentDidMount() {
    console.log(this.props.match.params.id);
    document.addEventListener("mousedown", this.handleClickOutside);
    this.props.fetchDetailPhotos(this.props.match.params.id);
    this.props.fetchStatistics(this.props.match.params.id);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleClickOutside = (event) => {
    if (
      this.container.current &&
      !this.container.current.contains(event.target)
    ) {
      this.setState({
        open: false,
      });
    }
  };

  handleButtonClick = () => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
  };

  handleDownloadFull = (e) => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
    console.log("download");
    e.preventDefault();

    //this.setState({dval:e.target.value});
    console.log(e.target.value);
    axios({
      url: this.props.photo.urls.full,
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
      .catch((err) =>
        alert("Sorry! Photos Cannot be downloaded due to CORS error")
      );
  };
  handleDownloadSmall = (e) => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
    console.log("download");
    e.preventDefault();

    //this.setState({dval:e.target.value});
    console.log(e.target.value);
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
      .catch((err) =>
        alert("Sorry! Photos Cannot be downloaded due to CORS error")
      );
  };
  handleDownloadRaw = (e) => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
    console.log("download");
    e.preventDefault();

    //this.setState({dval:e.target.value});
    console.log(e.target.value);
    axios({
      url: this.props.photo.urls.raw,
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
      .catch((err) =>
        alert("Sorry! Photos Cannot be downloaded due to CORS error")
      );
  };
  handleDownloadRegular = (e) => {
    this.setState((state) => {
      return {
        open: !state.open,
      };
    });
    console.log("download");
    e.preventDefault();

    //this.setState({dval:e.target.value});
    console.log(e.target.value);
    axios({
      url: this.props.photo.urls.regular,
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
      .catch((err) =>
        alert("Sorry! Photos Cannot be downloaded due to CORS error")
      );
  };
  render() {
    console.log(this.state.dval);
    const { photo } = this.props;
    console.log(photo);
    return (
      <>
        {!photo ? (
          <Spinner />
        ) : (
          <div className="detail-page">
            <div className="detail-page-section">
              <div className="header">
                <div className="user-info">
                  <div className="profile-pic" onClick={this.handleProfile}>
                    <img src={`${photo.user.profile_image.large}`} alt="" />
                  </div>
                  <div className="name-location">
                    <p className="name" onClick={this.handleProfile}>
                      {photo.user.name}
                    </p>

                    {!photo.location ? null : (
                      <>
                        <p className="location" onClick={this.showModal}>
                          {photo.location.name}
                        </p>
                        {!this.props.loca ? null : (
                          <Modal
                            show={this.state.show}
                            handleClose={this.hideModal}
                          >
                            <p>Map</p>
                            <p>{this.props.loca.lat}</p>
                            <p>{this.props.loca.lng}</p>
                          </Modal>
                        )}
                      </>
                    )}
                  </div>
                </div>

                <div className="download">
                  <div className="button-container" ref={this.container}>
                    <button
                      type="button"
                      class="button"
                      onClick={this.handleButtonClick}
                    >
                      {this.state.dval}
                    </button>
                    {this.state.open && (
                      <div className="container">
                        <ul
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "2px",
                            position: "absolute",
                            zIndex: "5",
                          }}
                        >
                          <button
                            onClick={this.handleDownloadFull}
                            style={{ marginBottom: "2px" }}
                          >
                            Large
                          </button>
                          <button
                            onClick={this.handleDownloadRegular}
                            style={{ marginBottom: "2px" }}
                          >
                            Medium
                          </button>
                          <button
                            onClick={this.handleDownloadSmall}
                            style={{ marginBottom: "2px" }}
                          >
                            Small
                          </button>
                          <button
                            onClick={this.handleDownloadRaw}
                            style={{ marginBottom: "2px" }}
                          >
                            Original Size
                          </button>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="photo-section">
                <img
                  src={`${photo.urls.regular}`}
                  alt={photo.alt_description}
                />
              </div>
              <div className="tags">
                {photo.tags.map((tag) => (
                  <button onClick={this.handleSearch} key={tag.title}>
                    {tag.title}
                  </button>
                ))}
              </div>
              <div className="description">
                {!photo.description ? null : (
                  <>
                    <h3>Caption </h3>
                    <p>{photo.description}</p>
                  </>
                )}
              </div>
              {this.props.stat && (
                <div className="image-statistics">
                  <h3>Image Statistics</h3>
                  <p>
                    <span>Downloads: </span> {this.props.stat.downloads.total}
                  </p>
                  <p>
                    <span>Views: </span>
                    {this.props.stat.views.total}
                  </p>
                  <p>
                    <span>Likes: </span>
                    {this.props.stat.likes.total}
                  </p>
                </div>
              )}

              <div className="capture-info">
                {!photo.exif ? null : (
                  <>
                    <p className="line"></p>
                    <p>
                      <span>Aperture: </span>
                      {!photo.exif.aperture ? null : photo.exif.aperture}
                    </p>
                    <p>
                      <span>Exposure Time: </span>
                      {!photo.exif.exposure_time
                        ? null
                        : photo.exif.exposure_time}
                    </p>
                    <p>
                      <span>Focal Length: </span>
                      {!photo.exif.focal_length
                        ? null
                        : photo.exif.focal_length}
                    </p>
                    <p>
                      <span>ISO: </span>
                      {!photo.exif.iso ? null : photo.exif.iso}
                    </p>
                    <p>
                      <span>Model: </span>
                      {!photo.exif.model ? null : photo.exif.model}
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="similar-collection">
              <p>Related Collections</p>
              <div className="collection-body">
                {!photo.related_collections
                  ? null
                  : photo.related_collections.results.map((collection) => (
                      <Collection key={collection.id} collection={collection} />
                    ))}
              </div>
            </div>
          </div>
        )}
        <MobileNavigation />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessTokenData: state.userState.accessTokenData,
    userLikedPhotos: state.currentUserState.likedPhotos,
    photo: state.detailPhoto.photo,
    loca: state.locationState.location,
    stat: state.detailPhoto.stat,
    user: state.userState.userProfile,
    localLikes: state.currentUserState.localLikes,
  };
};

export default connect(mapStateToProps, {
  fetchDetailPhotos,
  fetchLocation,
  fetchStatistics,
})(withRouter(DetailPage));
