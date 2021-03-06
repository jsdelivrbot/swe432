import React, { Component } from 'react';

class TopSongs extends Component {
  constructor(props) {
    super(props);
    this.onToolbarClick = this.onToolbarClick.bind(this);
    this.state = {track1 : '',
                  track2 : '',
                  track3 : '',
                  track4 : '',
                  track5 : '',
                  track6 : '',
                  track7 : '',
                  track8 : '',
                  track9 : '',
                  track10: ''};
  }
  onToolbarClick(event) {
    event.preventDefault();
    this.props.handleToolbarClick(event.target.id);
	this.setState({value: 2})
  }
  componentDidMount() {
      let state = this.state;
      return fetch("http://localhost:3000/topten")
          .then(res => {return res.json()})
          .then(json => {
            for(let i = 0; i < 10; i++) {
              state[`track${i+1}`] = json[i];
            }
            this.setState(state);
          }
        );
    }

  render() {
    return (
	<html>
        <head>
          <title>
            Top Ten
          </title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
          <link rel="stylesheet" type="text/css" href="style.css" />
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"/>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"/>
        </head>
        <body class="main">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" id="Home" onClick={this.onToolbarClick}>SoundBit</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item ad">
                  <a class="nav-link" id="Home" onClick={this.onToolbarClick}>Home</a>
                </li>
                <li class="nav-item ad ">
                  <a class="nav-link" id="Playlist" onClick={this.onToolbarClick}>Explore</a>
                </li>
				<li class="nav-item ad ">
                  <a class="nav-link" id="CreatePlaylist" onClick={this.onToolbarClick}>Create Playlist</a>
                </li>
                <li class="nav-item active">
                  <a class="nav-link" id="TopSongs" onClick={this.onToolbarClick}>Top Songs<span className="sr-only">(current)</span></a>
                </li>
      		  <li class="nav-item ad">
                  <a class="nav-link" id="Login" onClick={this.onToolbarClick}>Login</a>
                </li>
              </ul>
            </div>
          </nav>

          <div class="topten"><center><h1>TOP TEN SONGS:</h1>

			<div class="list-group">
					<button type="button" class="list-group-item">1. {JSON.stringify(this.state.track1.name)} - {JSON.stringify(this.state.track1.artistName)}</button>
          <button type="button" class="list-group-item">2. {JSON.stringify(this.state.track2.name)} - {JSON.stringify(this.state.track2.artistName)}</button>
          <button type="button" class="list-group-item">3. {JSON.stringify(this.state.track3.name)} - {JSON.stringify(this.state.track3.artistName)}</button>
          <button type="button" class="list-group-item">4. {JSON.stringify(this.state.track4.name)} - {JSON.stringify(this.state.track4.artistName)}</button>
          <button type="button" class="list-group-item">5. {JSON.stringify(this.state.track5.name)} - {JSON.stringify(this.state.track5.artistName)}</button>
          <button type="button" class="list-group-item">6. {JSON.stringify(this.state.track6.name)} - {JSON.stringify(this.state.track6.artistName)}</button>
          <button type="button" class="list-group-item">7. {JSON.stringify(this.state.track7.name)} - {JSON.stringify(this.state.track7.artistName)}</button>
          <button type="button" class="list-group-item">8. {JSON.stringify(this.state.track8.name)} - {JSON.stringify(this.state.track8.artistName)}</button>
          <button type="button" class="list-group-item">9. {JSON.stringify(this.state.track9.name)} - {JSON.stringify(this.state.track9.artistName)}</button>
          <button type="button" class="list-group-item">10. {JSON.stringify(this.state.track10.name)} - {JSON.stringify(this.state.track10.artistName)}</button>
			</div>
		</center>	
			</div>


      <footer class="footer">
            <div class="container">
              <span class="text-muted">SoundBit</span>
            </div>
          </footer>

        </body>
      </html>
			);
  }

}

export default TopSongs;
