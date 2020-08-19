import React, { Component } from "react";
import "./styles/viewProfile.scss";
export class ViewProfile extends Component {
  render() {
    const { profilePic, handleProfile } = this.props;
    return (
      <div className="profile" onClick={() => handleProfile()}>
        <img src={profilePic} alt="" />
      </div>
    );
  }
}

export default ViewProfile;
