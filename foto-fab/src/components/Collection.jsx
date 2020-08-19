import React, { Component } from "react";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
class Collection extends Component {
  handleSearch = (event) => {
    console.log(event.target.innerText);
    this.props.history.push(`/search/${event.target.innerText}`);
  };
  render() {
    const { collection } = this.props;
    const { preview_photos, title, total_photos, tags } = this.props.collection;
    console.log(preview_photos);
    console.log(collection);
    return (
      <div className="collection-card">
        <Link to={`/collection/${collection.id}/${collection.title}`}>
          {!preview_photos ? null : preview_photos.length >= 3 ? (
            <>
              <div className="collection-grid-1">
                <div className="grid-item-11">
                  <img src={preview_photos[0].urls.thumb} alt="" />
                </div>

                <div className="grid-item-12">
                  {" "}
                  <img src={preview_photos[1].urls.thumb} alt="" />
                </div>

                <div className="grid-item-13">
                  <img src={preview_photos[2].urls.thumb} alt="" />
                </div>
              </div>
            </>
          ) : preview_photos.length === 2 ? (
            <>
              <div className="collection-grid-2">
                {" "}
                <img
                  className="grid-item-21"
                  src={preview_photos[0].urls.thumb}
                  alt=""
                />
                <img
                  className="grid-item-22"
                  src={preview_photos[1].urls.thumb}
                  alt=""
                />
              </div>
            </>
          ) : (
            <div className="collection-grid-3">
              <img
                className="grid-item-31"
                src={preview_photos[0].urls.thumb}
                alt=""
              />
            </div>
          )}
        </Link>

        <div className="description-section">
          <p className="title">{title}</p>
          <p className="count">{total_photos} Photos</p>
          <div className="tag-section">
            <p>
              {!tags
                ? null
                : tags.map((tag) => (
                    <button onClick={this.handleSearch} key={tag.title}>
                      {tag.title}
                    </button>
                  ))}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Collection);
