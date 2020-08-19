import React from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Home from "./pages/Home";
import ProfilePage from "./pages/ProfilePage";
import SearchPage from "./pages/SearchPage";
import PublicUserProfilePage from "./pages/publicUserProfilePage";
import AboutPage from "./pages/AboutPage";
import CollectionPage from "./pages/CollectionPhotos";
import DetailPage from "./pages/DetailPage";
import EditProfile from "./pages/EditProfile";
import ContactUs from "./pages/ContactUsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { connect } from "react-redux";
import LoginPage from "./pages/LoginPage";
import AlertModal from "./components/AlertModal";
import SearchedUsers from "./components/SearchedUsers";
import CreateCollection from "./components/CreateCollection";

function App({ user }) {
  return (
    <BrowserRouter>
      <Navbar />
      <AlertModal />
      <CreateCollection />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/profile/:username" component={ProfilePage} />
        <Route path="/search/:searchQuery" component={SearchPage} />
        <Route exact path="/about" component={AboutPage} />
        <Route exact path="/contact" component={ContactUs} />
        <Route exact path="/collection/:id/:title" component={CollectionPage} />
        <Route exact path="/detailPage/:id" component={DetailPage} />
        <Route exact path="/login" component={LoginPage} />
        <ProtectedRoute
          exact
          path="/editProfile"
          component={EditProfile}
          loggedIn={user}
        />
        <Route path="/public/:username" component={PublicUserProfilePage} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userState.userProfile,
  };
};

export default connect(mapStateToProps)(App);
