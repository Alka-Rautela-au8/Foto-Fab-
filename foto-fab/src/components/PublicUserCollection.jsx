import React, { Component } from "react";
import { connect } from "react-redux";
import Collection from "./Collection";
import "./styles/collection.scss";
import { fetchPublicUserCollections } from "../redux/actions/publicProfileAction";
class PublicUserCollection extends Component {
  state = {
    page_no: 1,
    publicUser: this.props.match.params.username,
  };
  componentDidMount() {
    this.props.fetchPublicUserCollections(
      this.props.match.params.username,
      this.state.page_no
    );
  }
  render() {
    const { collections } = this.props;
    return !collections ? null : (
      <div className="collection-container">
        {collections.map((collection) => (
          <Collection key={collection.id} collection={collection} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collections: state.publicUserState.collections,
  };
};

export default connect(mapStateToProps, { fetchPublicUserCollections })(
  PublicUserCollection
);
