import React, { Component } from "react";
import "./styles/StickyBar.scss";
import fb from "./img/fb1.png";
import tw from "./img/tw1.png";
import pin from "./img/pin1.png";
import li from "./img/li1.png";
import con from "./img/contact.svg";
import gr from "./img/group.svg";
import ff from "./img/logo.svg";
import { withRouter } from "react-router-dom";
class StickyBar extends Component {
  state = {};

  handleAboutUs = () => {
    this.props.history.push(`/about`);
  };

  handleContactUs = () => {
    this.props.history.push(`/contact`);
  };

  handleHomePage = () => {
    this.props.history.push(`/`);
  };

  render() {
    return (
      <div className="sticky-container">
        <ul className="sticky">
          <li onClick={this.handleHomePage}>
            {" "}
            <img width="32" height="32" title="" alt="" src={ff} />
            <p>Foto Fab</p>
          </li>
          <li onClick={this.handleAboutUs}>
            {" "}
            <img width="32" height="32" title="" alt="" src={gr} />
            <p>About Us</p>
          </li>
          <li onClick={this.handleContactUs}>
            {" "}
            <img width="32" height="32" title="" alt="" src={con} />
            <p>Contact</p>
          </li>
          <li>
            {" "}
            <a
              href="https://www.facebook.com/Foto-fab-247784806339014"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img width="32" height="32" title="" alt="fb" src={fb} />
              <p>Facebook</p>
            </a>
          </li>
          <li>
            {" "}
            <a
              href="https://twitter.com/FotoFab1"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img width="32" height="32" title="" alt="tw" src={tw} />
              <p>Twitter</p>
            </a>
          </li>
          <li>
            {" "}
            <a
              href="https://www.pinterest.com.mx/pin/791366965767506177"
              style={{ textDecoration: "none", color: "white" }}
            >
              <img width="32" height="32" title="" alt="pin1" src={pin} />
              <p>Pinterest</p>
            </a>
          </li>
          <li>
            {" "}
            <img width="32" height="32" title="" alt="li" src={li} />
            <p>Linkedin</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(StickyBar);
