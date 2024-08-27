import React from "react";
import PropTypes from "prop-types";
import NewsItem from "./NewsItem";
import "./News.css"; // Import the CSS file

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: true,
      page: 1,
      totalResults: 0,
    };
    this.observer = React.createRef();
  }

  componentDidMount() {
    this.fetchArticles();
    this.props.setProgress(10);
    // Set up the observer to implement infinite scroll
    this.observer = new IntersectionObserver(this.handleObserver, {
      root: null,
      rootMargin: "20px",
      threshold: 1.0,
    });
    this.observer.observe(document.querySelector('.end-of-list'));
  }

  componentWillUnmount() {
    // Clean up the observer when the component is unmounted
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  handleObserver = (entities) => {
    const { loading } = this.state;
    if (entities[0].isIntersecting && !loading) {
      this.setState(
        (prevState) => ({ page: prevState.page + 1 }),
        this.fetchArticles
      );
    }
  };

  fetchArticles = async () => {
    this.props.setProgress(30);
    const { page } = this.state;
    const { category } = this.props;
    this.setState({ loading: true });
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&page=${page}&apiKey=8dfe5319bc874206806fef923b7b8428`;
    let data = await fetch(url);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.setState((prevState) => ({
      articles: [...prevState.articles, ...parsedData.articles],
      totalResults: parsedData.totalResults,
      loading: false,
      
    }));
    this.props.setProgress(100);
  };

  render() {
    const { articles, loading } = this.state;

    return (
      <div className="container my-3">
        <h2>NewsMonkey Top Headlines - {this.props.category.toUpperCase()}</h2>
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
          </div>
        )}
        <div className="row">
          {articles.map((element) => (
            <div className="col-md-4" key={element.url}>
              <NewsItem
                title={element.title}
                description={element.description}
                imageUrl={element.urlToImage}
                newsUrl={element.url}
                author={element.author}
                publishedAt={element.publishedAt}
              />
            </div>
          ))}
        </div>
        <div className="end-of-list"></div>
      </div>
    );
  }
}

News.propTypes = {
  category: PropTypes.string.isRequired,
};

News.defaultProps = {
  category: "general",
};

export default News;