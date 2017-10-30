import React, { Component } from 'react';

class TopSongs extends Component {
  constructor(props) {
    super(props);
    this.state = {songs : 'test'};
  }

  componentDidMount() {
      return fetch("http://localhost:3000/topten")
          .then(res => {return res.json()})
          .then(json => {
            this.setState({ songs : json});
          });

    }

  render() {

    return (<p>TOP TEN SONGS: {JSON.stringify(this.state.songs)}</p>);
  }

}

export default TopSongs;
