import React, { Component } from 'react';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.onToolbarClick = this.onToolbarClick.bind(this);
  }
  onToolbarClick(event) {
    event.preventDefault();
    console.log(event.target);
    this.props.handleToolbarClick(event.target.id);
  }

  render() {
    return (
      <html>
        <head>
          <title>
            Playlist
          </title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
          <link rel="stylesheet" type="text/css" href="style.css" />
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"/>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"/>
        </head>
        <body>
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand">SoundBit</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <a class="nav-link" id="Home" onClick={this.onToolbarClick}>Home<span class="sr-only">(current)</span></a>
                </li>
                <li class="nav-item ad ">
                  <a class="nav-link" id="Playlist">Explore</a>
                </li>
                <li class="nav-item ad">
                  <a class="nav-link" id="TopSongs">Top Songs</a>
                </li>
      		  <li class="nav-item ad">
                  <a class="nav-link" id="Login" onClick={this.onToolbarClick}>Login</a>
                </li>
              </ul>
            </div>
          </nav>

          <div id="playlist-name">
            <p>Playlist 1</p>
          </div>

          <div class="list-group">
        <button type="button" class="list-group-item">1. Cold Wind Blows</button>
        <button type="button" class="list-group-item">2. Talkin' 2 Myself</button>
        <button type="button" class="list-group-item">3. On Fire</button>
        <button type="button" class="list-group-item">4. Won't Back Down</button>
        <button type="button" class="list-group-item">5. W.T.P.</button>
        <button type="button" class="list-group-item">6. Going Through Changes</button>
        <button type="button" class="list-group-item">7. Not Afraid</button>
        <button type="button" class="list-group-item">8. Seduction</button>
        <button type="button" class="list-group-item">9. No Love</button>
        <button type="button" class="list-group-item">10. Space Bound</button>
      </div>

      <div class="jumbotron player">
        <img src="eminem.jpeg"/>
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

export default Playlist;
