import React, { Component } from "react";
import {
  searchCollection,
  emptyCollection,
} from "../redux/actions/searchPhotosAction";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import "./styles/collection.scss";
import Collection from "./Collection";
import { Spring } from "react-spring/renderprops";

class SearchedCollection extends Component {
  state = {
    page_no: 1,
    searchQuery: "",
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
    this.props.emptyCollection();
    this.props.searchCollection(
      this.state.page_no,
      this.props.match.params.searchQuery
    );
    this.setState({ searchQuery: this.props.match.params.searchQuery });
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate() {
    if (this.props.match.params.searchQuery !== this.state.searchQuery) {
      this.props.emptyCollection();
      this.props.searchCollection(
        this.state.page_no,
        this.props.match.params.searchQuery
      );
      this.setState({ searchQuery: this.props.match.params.searchQuery });
    } else {
      console.log("not updating users....");
    }
  }
  render() {
    const { collections } = this.props;
    console.log(collections);
    console.log(this.props.match.params.searchQuery);
    return !collections ? (
      <Spinner />
    ) : (
      <div className="searched-collection-container">
        {collections.length < 1 ? (
          <Spinner />
        ) : (
          <div className="collection-container">
            {collections.map((collection) => (
              <Collection key={collection.id} collection={collection} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collections: state.searchPhotoState.collections,
  };
};

export default connect(mapStateToProps, { searchCollection, emptyCollection })(
  SearchedCollection
);
