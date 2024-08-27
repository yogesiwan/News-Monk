import React from "react";
import PropTypes from "prop-types";

class NewsItem extends React.Component {
  render() {
    let { title, description, imageUrl, newsUrl, publishedAt, author } =
      this.props;
    return (
      <div className="card">
        <img
          src={imageUrl ? imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8fOnAz6GeplfWNKrb6Rsru9KLj-41no0lEw&s"}
          className="card-img-top"
          alt="News"
        />
        <div className="card-body">
          <div>
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
          </div>
          <div className="card-footer">
            <small className="text-muted">
              Published by {author} on {publishedAt}
            </small>
          </div>
          <a href={newsUrl} target="_blank" className="btn btn-primary">
            Read More
          </a>
        </div>
      </div>
    );
  }
}

NewsItem.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  imageUrl: PropTypes.string,
  newsUrl: PropTypes.string,
  publishedAt: PropTypes.string,
};

export default NewsItem;
