import React, { Component } from "react";
import "./styles/collectionModal.scss";
import { connect } from "react-redux";

import {
  createANewCollection,
  addPhotoToACollection,
} from "../redux/actions/userAction";
import { showTimeModal } from "../redux/actions/currentUserAction";

class collectionModal extends Component {
  state = {
    content: "",
    create: false,
    createNew: false,
    createdCollection: false,
  };

  handleChange = (e) => {
    this.setState({
      content: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const title = this.state.content;
    if (title === "") {
      alert("title required");
    } else {
      console.log(title);
      this.props.createANewCollection(
        title,
        this.props.accessTokenData.access_token
      );
      this.setState({ createdCollection: true });
      this.props.handleDisplay();
    }
  };

  // createNewCollection = () => {
  //   this.setState({ createNew: !this.state.createNew });
  // };

  handleAdd = (colId, id, access_token) => {
    this.props.addPhotoToACollection(colId, id, access_token);
    this.props.handleDisplay();
    this.props.showTimeModal();
  };

  // componentDidMount() {
  //   if (this.state.createdCollection) {
  //     if (this.props.newCollection) {
  //       this.handleAdd(
  //         this.props.newCollection[0].id,
  //         this.props.id,
  //         this.props.accessTokenData.access_token
  //       );
  //       // this.setState({ createdCollection: false });
  //     } else {
  //       alert("collection is created but unable to add photo");
  //     }
  //   }
  // }
  // componentDidUpdate() {
  //   if (this.state.createdCollection) {
  //     if (this.props.newCollection) {
  //       this.handleAdd(
  //         this.props.newCollection[0].id,
  //         this.props.id,
  //         this.props.accessTokenData.access_token
  //       );
  //       this.setState({ createdCollection: false });
  //     } else {
  //       alert("collection is created but unable to add photo");
  //     }
  //   }
  // }

  render() {
    return (
      <div
        className="collection-form"
        style={{
          display: `${this.props.display}`,
        }}
      >
        {/* {!this.state.createNew ? ( */}
        <div className="collection-form-main">
          <p>Add photo to Existing collections</p>
          <ul>
            {!this.props.collection ? (
              <p>NO COLLECTIONS CREATED YET</p>
            ) : (
              this.props.collection.map((col) => (
                <li
                  key={col.id}
                  onClick={() =>
                    this.handleAdd(
                      col.id,
                      this.props.id,
                      this.props.accessTokenData.access_token
                    )
                  }
                >
                  <button>{col.title}</button>
                </li>
              ))
            )}
          </ul>
          {/* <p className="or">OR</p>
            <p className="create">
              <button onClick={this.createNewCollection}>
                create a new collection
              </button>
            </p>
            <p className="note">
              * but Remember that it may take longer to create a collection, and
              created collection will not contain any images at first. After
              creating collection you can add images to it. *
            </p> */}
          {/* </>
        // ) : (
        //   <>
        //     <form className="create-new-collection">
        //       <p>Create New Collection</p>
        //       <div>
        //         <input */}
          {/* //           type="text"
        //           name="content"
        //           value={this.state.content}
        //           onChange={this.handleChange}
        //         />
        //         <button onClick={this.handleSubmit}>CREATE</button>
        //       </div>
        //     </form> */}
          {/* //     <p className="or">OR</p>
        //     <button className="add-in-old" onClick={this.createNewCollection}>
        //       Add in Existing Collection
        //     </button>
        //   </>
        // )} */}

          {/* )} */}
          <button className="cancel" onClick={() => this.props.handleDisplay()}>
            Cancel
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collection: state.currentUserState.collections,
    accessTokenData: state.userState.accessTokenData,
    newCollection: state.userState.newCollection,
  };
};

export default connect(mapStateToProps, {
  createANewCollection,
  addPhotoToACollection,
  showTimeModal,
})(collectionModal);
