import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import UserLikes from "./UserLikes";
import PublicUserPhotos from "../publicUserPhotos";
import PublicUserCollection from "../PublicUserCollection";
import Modal from "../Modal";
import { connect } from "react-redux";
import { withRouter, Route, Switch, NavLink } from "react-router-dom";

class CurrentUserProfile extends Component {
  handleEdit = () => {
    console.log("edit");
    this.props.history.push(`/editProfile`);
  };
  render() {
    const { user, show, hideModal, showModal } = this.props;
    console.log(this.props.loca);
    return (
      <div className="profile-container">
        <div className="all-bio">
          <div className="profile-pic">
            <img src={user.profile_image.large} alt="" />
          </div>
          <div className="name-data">
            <div className="name-and-follow-button">
              <h1>{user.name}</h1>
              <h1>
                <button onClick={this.handleEdit} className="edit">
                  Edit Profile
                </button>
              </h1>
            </div>
            <div className="location-portfolio-bio">
              <nav className="links">
                {!user.location ? null : (
                  <>
                    <div className="location" onClick={showModal}>
                      <i className="fa fa-location-arrow"></i>
                      {user.location}
                    </div>
                    {!this.props.loca ? null : (
                      <Modal show={show} handleClose={hideModal}>
                        <p>Map</p>
                        <p>{this.props.loca.lat}</p>
                        <p>{this.props.loca.lng}</p>
                      </Modal>
                    )}
                  </>
                )}
                {!user.portfolio_url ? null : (
                  <a
                    href={user.portfolio_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div>
                      <i className="fa fa-globe"></i> {user.portfolio_url}
                    </div>
                  </a>
                )}
              </nav>

              <p>{user.bio}</p>
            </div>
          </div>
        </div>
        <div className="photos-likes-collections">
          <div className="link-div">
            <NavLink
              className="link"
              activeClassName="active"
              exact
              to={`/profile/${user.username}`}
            >
              <p>
                <i className="fa fa-image"></i> Photos {user.total_photos}
              </p>
            </NavLink>
          </div>
          <div className="link-div">
            {!this.props.likes ? null : (
              <NavLink
                className="link"
                activeClassName="active"
                to={`/profile/${user.username}/likes`}
              >
                <p>
                  <i className="fa fa-heart"></i> Likes{" "}
                  {this.props.likes.length}
                </p>
              </NavLink>
            )}
          </div>

          <div className="link-div">
            <NavLink
              className="link"
              activeClassName="active"
              to={`/profile/${user.username}/collections`}
            >
              <p>
                <i className="fa fa-object-group"></i>Collections{" "}
                {user.total_collections}
              </p>
            </NavLink>
          </div>
        </div>
        <hr />
        <Switch>
          <Route exact path="/profile/:username" component={PublicUserPhotos} />
          <Route exact path="/profile/:username/likes" component={UserLikes} />
          <Route
            exact
            path="/profile/:username/collections"
            component={PublicUserCollection}
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    likes: state.currentUserState.localLikes,
    loca: state.locationState.location,
  };
};

export default connect(mapStateToProps, null)(withRouter(CurrentUserProfile));
