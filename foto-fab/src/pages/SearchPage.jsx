import React, { Component } from "react";
import Searchbar from "../components/Searchbar";
import { connect } from "react-redux";
import "font-awesome/css/font-awesome.min.css";
import "./styles/searchPage.scss";
import {
  searchImages,
  searchUser,
  emptyImages,
} from "../redux/actions/searchPhotosAction";
import MobileNavigation from "../components/mobileNavigation";
import SearchedUsers from "../components/SearchedUsers";
import SearchedCollection from "../components/SearchedCollection";
import { Route, Switch, NavLink } from "react-router-dom";
import SearchedPhotos from "../components/SearchedPhotos";
import { Spring } from "react-spring/renderprops";
class searchPage extends Component {
  state = {
    page_no: 1,
    query: "",
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
    console.log("fetching movie");
    console.log(this.props.match.params.searchQuery);
    this.props.emptyImages();
    this.props.searchImages(
      this.state.page_no,
      this.props.match.params.searchQuery
    );

    this.setState({ query: this.props.match.params.searchQuery });
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate = (prevProp, prevState) => {
    const oldQuery = this.state.query;
    const newSearchQuery = this.props.match.params.searchQuery;
    console.log(this.props.match.params.searchQuery);
    if (prevState.page_no < this.state.page_no) {
      console.log(prevState.page_no);
      console.log("loading more photos");
      this.props.searchImages(
        this.state.page_no,
        this.props.match.params.searchQuery
      );
    } else {
      console.log("not updating");
    }
    if (newSearchQuery !== oldQuery) {
      this.props.emptyImages();
      this.setState({ query: newSearchQuery });
      console.log("searching new photos");
      this.props.searchImages(
        this.state.page_no,
        this.props.match.params.searchQuery
      );
    } else {
      console.log("not loading new photos");
    }
  };

  render() {
    return (
      <>
        <Searchbar />
        <div className="photos-collection-users">
          <div className="photos">
            <NavLink
              className="link"
              activeClassName="active"
              exact
              to={`/search/${this.props.match.params.searchQuery}`}
            >
              <p>
                <i className="fa fa-image"></i> Photos
              </p>
            </NavLink>
          </div>
          <div className="collection">
            <NavLink
              className="link"
              activeClassName="active"
              to={`/search/${this.props.match.params.searchQuery}/collections`}
            >
              <p>
                <i className="fa fa-object-group"></i>Collections
              </p>
            </NavLink>
          </div>
          <div className="user">
            <NavLink
              className="link"
              activeClassName="active"
              to={`/search/${this.props.match.params.searchQuery}/users`}
            >
              <p>
                <i className="fa fa-user"></i> Users
              </p>
            </NavLink>
          </div>
        </div>
        <hr />
        <Spring
          from={{ opacity: 0, marginLeft: -500 }}
          to={{ opacity: 1, marginLeft: 0 }}
          config={{ delay: 1000 }}
        >
          {(props) => (
            <div style={props} className="searched-query">
              <h1>{this.props.match.params.searchQuery.toUpperCase()}</h1>
            </div>
          )}
        </Spring>
        <Switch>
          <Route exact path="/search/:searchQuery" component={SearchedPhotos} />
          <Route
            exact
            path="/search/:searchQuery/users"
            component={SearchedUsers}
          />
          <Route
            exact
            path="/search/:searchQuery/collections"
            component={SearchedCollection}
          />
        </Switch>
        <MobileNavigation />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  console.log(state.searchPhotoState.photos);
  return {
    searchPhotos: state.searchPhotoState.photos,
  };
};
export default connect(mapStateToProps, {
  searchImages,
  searchUser,
  emptyImages,
})(searchPage);
