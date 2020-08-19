import React, { Component } from "react";
import Searchbar from "../components/Searchbar";
import { connect } from "react-redux";
import { fetchImages, emptyImages } from "../redux/actions/fetchPhotosAction";
import PhotoCard from "../components/photoCard";
import "../../src/components/styles/photoCard.scss";
import Spinner from "../components/Spinner";
import MobileNavigation from "../components/mobileNavigation";
import StickyBar from "../components/StickyBar";
import { fetchCurrentUserProfile } from "../redux/actions/userAction";
import { fetchCurrentUserCollections } from "../redux/actions/currentUserAction";

class Home extends Component {
  state = {
    page_no: 1,
  };
  handleScroll = () => {
    const windowHeight =
      "innerHeight" in window
        ? window.innerHeight
        : document.documentElement.offsetHeight;
    const body = document.body;
    const html = document.documentElement;
    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.pageYOffset;
    if (windowBottom >= docHeight) {
      console.log("bottom reached");
      this.setState({ ...this.state, page_no: this.state.page_no + 1 });
    } else {
      console.log("bottom not reached");
    }
  };

  componentDidMount() {
    console.log("window history", window.location.search);
    this.props.emptyImages();
    this.props.fetchImages(this.state.page_no);
    if (this.props.user) {
      this.props.fetchCurrentUserCollections(this.props.user.username);
    }
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate = (prevProp, prevState) => {
    console.log("window history", window.location.search);
    if (prevState.page_no < this.state.page_no) {
      console.log(prevState.page_no);
      this.props.fetchImages(this.state.page_no);
    } else {
      console.log("not updating");
    }
    //user profile fetching
    if (this.props.accessTokenData !== null && this.props.user === null) {
      this.props.fetchCurrentUserProfile(
        this.props.accessTokenData.access_token
      );
    }
    if (this.props.user && !this.props.currentUserCollection) {
      this.props.fetchCurrentUserCollections(this.props.user.username);
    }
  };

  render() {
    const { photos } = this.props;
    return (
      <>
        <Searchbar />
        <StickyBar />
        {photos.length !== 0 ? (
          <div>
            <div className="photo-container">
              {photos.map((image) => (
                <PhotoCard
                  photo={image}
                  key={`${Math.floor(Math.random() * 10 ** 100)}${new Date()}`}
                />
              ))}
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        <MobileNavigation />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.photoState.photos);
  return {
    photos: state.photoState.photos,
    user: state.userState.userProfile,
    accessTokenData: state.userState.accessTokenData,
    currentUserCollection: state.currentUserState.collections,
  };
};

export default connect(mapStateToProps, {
  fetchImages,
  emptyImages,
  fetchCurrentUserProfile,
  fetchCurrentUserCollections,
})(Home);
