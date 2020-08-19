//import React, { Component } from "react";
import MobileNavigation from "../components/mobileNavigation";
import StickyBar from "../components/StickyBar";
// import ReactContactForm from 'react-mail-form';
// import ContactUsAnimation from "../components/ContactUsAnimation";
import "./styles/ContactUs.scss";

// class ContactUs extends Component {

//   // componentDidMount() {
//   //   document.getElementById("navbar").style.display = "none";
//   // }

//   // componentWillUnmount() {
//   //   document.getElementById("navbar").style.display = "flex";
//   // }
//   render() {
//     return (
//       <>
//       {/* <div className="contact">
//       <StickyBar></StickyBar>
//         <ContactUsAnimation />
//         <MobileNavigation />
//         <ReactContactForm to="speedy.shivam.96@gmail.com" className="form"/>
//         </div> */}
//       </>
//     );
//   }
// }

// export default ContactUs;
import React from "react";

const ContactUsPage = () => {
  const [inputs, setInputs] = React.useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    e.persist();
    setInputs((inputs) => ({ ...inputs, [e.target.name]: e.target.value }));
  };

  const sendMessage = (e) => {
    if (e) e.preventDefault();
    const message = inputs.message;
    const messageEnter = message
      .replace(/\r\n|\r|\n/g, "%0D%0A")
      .replace(" ", "%20");
    const request =
      "mailto:fotofab.au8@gmail.com?subject=Email%20from%20" +
      inputs.name +
      "/" +
      inputs.email +
      "&body=" +
      messageEnter;
    document.location = request;
  };
  return (
    <div className="container">
      <StickyBar />
      <MobileNavigation />
      <div className="left"></div>
      <div className="contact__wrap">
        <h1>Contact Us</h1>
        <form onSubmit={(e) => sendMessage(e)} className="contact__form">
          <input
            value={inputs.name}
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="name"
            placeholder="name"
            title="Your name"
            maxLength="50"
            required
          />
          <input
            value={inputs.email}
            onChange={(e) => handleInputChange(e)}
            type="email"
            name="email"
            placeholder="email"
            title="Your email"
            maxLength="50"
            required
          />
          <textarea
            value={inputs.message}
            onChange={(e) => handleInputChange(e)}
            type="text"
            name="message"
            placeholder="message"
            title="Your message"
            maxLength="550"
            required
          />
          <input type="submit" value="send message" />
        </form>
      </div>
    </div>
  );
};

export default ContactUsPage;
