import React, { Component } from "react";
import { searchUser, emptyUsers } from "../redux/actions/searchPhotosAction";
import { connect } from "react-redux";
import Spinner from "./Spinner";
import SearchedUserProfile from "./SearchedUserProfile";
import "./styles/searchedUser.scss";

class SearchedUsers extends Component {
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
    this.props.emptyUsers();
    this.props.searchUser(
      this.state.page_no,
      this.props.match.params.searchQuery
    );
    this.setState({ searchQuery: this.props.match.params.searchQuery });
    window.addEventListener("scroll", this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  componentDidUpdate(prevProp, prevState) {
    if (prevState.page_no < this.state.page_no) {
      this.props.searchUser(
        this.state.page_no,
        this.props.match.params.searchQuery
      );
    } else {
      console.log("not updating");
    }
    if (this.props.match.params.searchQuery !== this.state.searchQuery) {
      this.props.emptyUsers();
      this.props.searchUser(
        this.state.page_no,
        this.props.match.params.searchQuery
      );
      this.setState({ searchQuery: this.props.match.params.searchQuery });
    } else {
      console.log("not updating users....");
    }
    console.log("prevProps", prevProp);
    console.log("prevState", prevState);
  }
  render() {
    const { users } = this.props;
    console.log(users);
    console.log(this.props);
    return !this.props.users ? (
      <Spinner />
    ) : (
      <div className="searched-users-container">
        <h1>{this.props.searchQuery}</h1>
        {this.props.users === null ? (
          <h1>No user found</h1>
        ) : (
          <div className="searched-user">
            {this.props.users.map((user) => (
              <SearchedUserProfile key={user.id} user={user} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.searchPhotoState.users,
  };
};

export default connect(mapStateToProps, { searchUser, emptyUsers })(
  SearchedUsers
);
