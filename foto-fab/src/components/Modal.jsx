import React, { Component } from "react";
import "./styles/Modal.scss";

import GoogleMapReact from "google-map-react";

class Modal extends Component {
  render() {
    const { handleClose, show, children } = this.props;
    console.log(children);
    console.log(children[1].props.children);
    console.log(children[2].props.children);
    const showHideClassName = show
      ? "modal display-block"
      : "modal display-none";
    return (
      <div className={showHideClassName}>
        <section className="modal-main">
          <div className="close-button">
            <button onClick={handleClose}>Close</button>
          </div>

          <div className="map-container">
            <GoogleMapReact
              bootstrapURLKeys={{ key: "" }}
              defaultCenter={{
                lat: children[1].props.children,
                lng: children[2].props.children,
              }}
              defaultZoom={11}
            ></GoogleMapReact>
          </div>
        </section>
      </div>
    );
  }
}

export default Modal;
