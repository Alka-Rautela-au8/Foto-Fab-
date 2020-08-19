import React, { Component } from "react";
import "./styles/searchBar.scss";
import "font-awesome/css/font-awesome.min.css";
import { withRouter } from "react-router-dom";
import SearchForm from "./SearchForm";
import { connect } from "react-redux";
import { fetchRandomPhotos } from "../redux/actions/randomPhotoAction";
class SearchBar extends Component {
  state = {
    searchQuery: "",
  };

  componentDidMount() {
    this.props.fetchRandomPhotos();
  }

  handleChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.searchQuery) {
      this.props.history.push(`/search/${this.state.searchQuery}`);
    }
  };

  handleProfile = () => {
    this.props.history.push(`/public/${this.props.photo.user.username}`);
  };

  render() {
    const { photo } = this.props;
    return !photo ? (
      <div className="search-bar-container">
        <div className="search-bar-area">
          <div className="about-foto-fab">
            <h1>Foto-Fab</h1>
            <p>The internet's source of freely-usable images.</p>
            <p>Powered by creator everywhere</p>
          </div>
          <SearchForm
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />
        </div>
      </div>
    ) : (
      <div
        className="search-bar-container"
        style={{ backgroundImage: `url("${photo.urls.full}")` }}
      >
        <div className="black-layer"></div>
        <div className="search-bar-area">
          <div className="about-foto-fab">
            <h1>Foto-Fab</h1>
            <p>The internet's source of freely-usable images.</p>
            <p>Powered by creator everywhere</p>
          </div>
          <SearchForm
            onSubmit={this.handleSubmit}
            onChange={this.handleChange}
          />
        </div>

        <div className="picture-info">
          <div className="photographer">
            <p onClick={this.handleProfile}>
              <strong>Photo</strong> by {""}
              <strong>{photo.user.name}</strong>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    photo: state.randomPhotoState.photo,
  };
};

export default connect(mapStateToProps, { fetchRandomPhotos })(
  withRouter(SearchBar)
);
