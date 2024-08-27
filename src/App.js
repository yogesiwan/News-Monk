import React from 'react';
import Navbar from './components/NavBar';
import News from './components/News';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';

class App extends React.Component {
  state = {
    progress: 0
  };

  setProgress = (progress) => {
    this.setState({ progress });
  };

  render() {
    return (
      <div>
        <Router>
          <LoadingBar
            color='#f11946'
            progress={this.state.progress}
            onLoaderFinished={() => this.setProgress(0)}
          />
          <Navbar />
          <Routes>
            <Route path="/" element={<News setProgress={this.setProgress} key="general" category="general" />} />
            <Route path="/business" element={<News setProgress={this.setProgress} key="business" category="business" />} />
            <Route path="/technology" element={<News setProgress={this.setProgress} key="technology" category="technology" />} />
            <Route path="/science" element={<News setProgress={this.setProgress} key="science" category="science" />} />
            <Route path="/health" element={<News setProgress={this.setProgress} key="health" category="health" />} />
            <Route path="/sports" element={<News setProgress={this.setProgress} key="sports" category="sports" />} />
            <Route path="/entertainment" element={<News setProgress={this.setProgress} key="entertainment" category="entertainment" />} />
          </Routes>
        </Router>
      </div>
    );
  }
}

export default App;