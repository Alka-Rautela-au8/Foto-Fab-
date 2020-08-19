import React, { Component } from "react";
import "font-awesome/css/font-awesome.min.css";
import PublicUserPhotos from "./publicUserPhotos";
import PublicUserLikes from "./PublicUserLikes";
import PublicUserCollection from "./PublicUserCollection";
import { Route, Switch, NavLink } from "react-router-dom";
import Modal from "./Modal";
import { connect } from "react-redux";
class UserProfile extends Component {
  render() {
    const { user, show, hideModal, showModal } = this.props;
    return (
      <div className="profile-container">
        <div className="all-bio">
          <div className="profile-pic">
            <img src={user.profile_image.large} alt="" />
          </div>
          <div className="name-data">
            <div className="name-and-follow-button">
              <h1>{user.name}</h1>
            </div>
            <div className="location-portfolio-bio">
              <nav className="links">
                {!user.location ? null : (
                  <>
                    <div className="location" onClick={() => showModal()}>
                      <i className="fa fa-location-arrow"></i>
                      {user.location}
                    </div>
                    {!this.props.location ? null : (
                      <Modal show={show} handleClose={hideModal}>
                        <p>Map</p>
                        <p>{this.props.location.lat}</p>
                        <p>{this.props.location.lng}</p>
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
              to={`/public/${user.username}`}
            >
              <p>
                <i className="fa fa-image"></i> Photos {user.total_photos}
              </p>
            </NavLink>
          </div>
          <div className="link-div">
            <NavLink
              className="link"
              activeClassName="active"
              to={`/public/${user.username}/likes`}
            >
              <p>
                <i className="fa fa-heart"></i> Likes {user.total_likes}
              </p>
            </NavLink>
          </div>
          <div className="link-div">
            <NavLink
              className="link"
              activeClassName="active"
              to={`/public/${user.username}/collections`}
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
          <Route exact path="/public/:username" component={PublicUserPhotos} />
          <Route
            exact
            path="/public/:username/likes"
            component={PublicUserLikes}
          />
          <Route
            exact
            path="/public/:username/collections"
            component={PublicUserCollection}
          />
        </Switch>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    location: state.locationState.location,
  };
};
export default connect(mapStateToProps, null)(UserProfile);
