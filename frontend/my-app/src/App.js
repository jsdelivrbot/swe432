import React, { Component } from 'react';
import Home from './Home.js';
import Login from './Login.js';
import Playlist from './Playlist.js';
import TopSongs from './TopSongs.js';
import CreateAccount from './CreateAccount.js';
import CreatePlaylist from './CreatePlaylist.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {currentPage : "Home"};
    this.handleToolbarClick = this.handleToolbarClick.bind(this);
  }

  // Handles toolbar clickhandleToolbarClick={this.handleToolbarClick}ks
  handleToolbarClick(newPage) {
    this.setState( {currentPage : newPage} );
  }

  render() {
    let page = this.state.currentPage;
    console.log(this.state.currentPage);
    if(page === "Home") {
      return (<Home handleToolbarClick={this.handleToolbarClick}/>);
    } else if(page === "Login") {
      return (<Login handleToolbarClick={this.handleToolbarClick}/>);
    } else if(page === "Playlist") {
      return (<Playlist handleToolbarClick={this.handleToolbarClick}/>);
    } else if(page === "TopSongs") {
      return (<TopSongs handleToolbarClick={this.handleToolbarClick}/>);
    } else if(page === "CreateAccount") {
      return (<CreateAccount handleToolbarClick={this.handleToolbarClick}/>);
    } else if(page === "CreatePlaylist") {
      return (<CreatePlaylist handleToolbarClick={this.handleToolbarClick}/>);
    }

  }
}

export default App;
