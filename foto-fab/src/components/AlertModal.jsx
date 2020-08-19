import React, { Component } from "react";
import "./styles/alertModal.scss";
import {
  showAlertModal,
  showLogoutModal,
  showTimeModal,
  showCreationTimeModal,
  showEditAlert,
} from "../redux/actions/currentUserAction";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { logOutUser } from "../redux/actions/userAction";
class AlertModal extends Component {
  handleLogin = () => {
    this.props.showAlertModal();
    this.props.history.push("/login");
  };

  handleLogout = () => {
    this.props.showLogoutModal();
    this.props.logOutUser();
  };
  render() {
    return (
      <>
        {this.props.showAlert && (
          <div className="alert-modal-container">
            <div className="alert-modal-main">
              <p>Please login for accomplishing this task!</p>
              <div className="buttons">
                <button className="login" onClick={this.handleLogin}>
                  Login
                </button>
                <button
                  className="cancel"
                  onClick={() => this.props.showAlertModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {this.props.showLogoutAlert && (
          <div className="alert-modal-container">
            <div className="alert-modal-main">
              <p>
                Are you sure? logging out will remove all of your liked data!
              </p>
              <div className="buttons">
                <button className="login" onClick={this.handleLogout}>
                  Logout
                </button>
                <button
                  className="cancel"
                  onClick={() => this.props.showLogoutModal()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        {this.props.timeModal && (
          <div className="alert-modal-container">
            <div className="alert-modal-main">
              <div className="ok-alert">
                <p>It takes two minutes to add picture to Collection!</p>
                <div className="buttons">
                  <button
                    className="cancel"
                    onClick={() => this.props.showTimeModal()}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.props.creationTimeModal && (
          <div className="alert-modal-container">
            <div className="alert-modal-main">
              <div className="ok-alert">
                <p>It takes 25 minutes to create a Collection!</p>
                <div className="buttons">
                  <button
                    className="cancel"
                    onClick={() => this.props.showCreationTimeModal()}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {this.props.editAlert && (
          <div className="alert-modal-container">
            <div className="alert-modal-main">
              <div className="ok-alert">
                <p>First and last name are required!</p>
                <div className="buttons">
                  <button
                    className="cancel"
                    onClick={() => this.props.showEditAlert()}
                  >
                    OK
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    showAlert: state.currentUserState.showAlert,
    showLogoutAlert: state.currentUserState.showLogoutAlert,
    accessTokenData: state.userState.accessTokenData,
    user: state.userState.userProfile,
    timeModal: state.currentUserState.timeModal,
    creationTimeModal: state.currentUserState.creationTimeModal,
    editAlert: state.currentUserState.editAlert,
  };
};
export default connect(mapStateToProps, {
  showAlertModal,
  showLogoutModal,
  logOutUser,
  showTimeModal,
  showCreationTimeModal,
  showEditAlert,
})(withRouter(AlertModal));
