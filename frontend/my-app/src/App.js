import React, { Component } from 'react';
import Home from './Home.js';
import Login from './Login.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage : "Home"};
    this.handleToolbarClick = this.handleToolbarClick.bind(this);
  }

  // Handles toolbar clicks
  handleToolbarClick(newPage) {
    this.setState( {currentPage : newPage} );
  }

  render() {
    let page = this.state.currentPage;
    if(page === "Home") {
      return (<Home handleToolbarClick={this.handleToolbarClick}/>);
    } else if(page === "Login") {
      return (<Login />);
    }

  }
}

export default App;
