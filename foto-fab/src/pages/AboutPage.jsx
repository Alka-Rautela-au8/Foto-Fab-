import React, { Component } from "react";
import MobileNavigation from "../components/mobileNavigation";
import AboutPhoto from "../components/AboutPhoto";
import "./styles/aboutPage.scss";
import dev1 from "./img/dev1.png";
import dev2 from "./img/dev2.png";
class AboutPage extends Component {
  render() {
    return (
      <div className="container">
        <div className="about-page">
          <AboutPhoto />
        </div>
        <div className="about-description">
          <h1>About Us</h1>
          <p>
            "It's not wise to violate rules until you know how to observe them."
          </p>
          <div className="about-devs">
            <h2>Developers</h2>
            <div className="dev-info">
              <div className="dev-1-info">
                <div className="image-container">
                  <img src={dev1} alt="" />
                </div>
                <p>Alka Rautela</p>
              </div>
              <div className="dev-2-info">
                <div className="image-container">
                  <img src={dev2} alt="" />
                </div>
                <p>Shivam Yadav</p>
              </div>
            </div>
          </div>
        </div>
        <MobileNavigation />
        {/* <div className="ab">
          <img src={ab} alt="about" className="ab-img"></img>
        </div> */}
      </div>
    );
  }
}

export default AboutPage;
