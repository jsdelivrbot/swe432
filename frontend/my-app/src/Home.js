import React, { Component } from 'react';

class Home extends Component {
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
            Homepage
          </title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
          <link rel="stylesheet" type="text/csss" href="style.css"/>
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"/>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"/>
        </head>
        <body>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand">SoundBit</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <a className="nav-link" >Home<span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item ad ">
                  <a className="nav-link" id="Playlist" onClick={this.onToolbarClick}>Explore</a>
                </li>
                <li className="nav-item ad">
                  <a className="nav-link" id="TopSongs" onClick={this.onToolbarClick}>Top Songs</a>
                </li>
      		  <li className="nav-item ad">
                  <a className="nav-link" id="Login" onClick={this.onToolbarClick}>Login</a>
                </li>
              </ul>
            </div>
          </nav>


        <div className="jumbotron main">
          <h1 className="title">Discovering New Music</h1>
        </div>

        <div className="container">
        <section className = "sec right">
          <h3>Find Music</h3>
          <p>Discover new music from our top
             charts or that are featured on
             our site. Add music of your own
             that the public can add.</p>

        </section>
        <section className = "sec">
          <h3>Recommended</h3>
          <p>Based off the music that you find,
             we will introduce music to you
             may enjoy along with links to
             purchase songs to support your
             favorite artists</p>
        </section>
        <section className = "sec left">
          <h3>Personal Playlists</h3>
          <p>Find music you enjoy and create
             playlists of your favorite songs.
             See what music other people are
             listening to while sharing your own. </p>
        </section>
      </div>

        <footer className="footer">
              <div className="container">
                <span className="text-muted">SoundBit</span>
              </div>
            </footer>

        </body>
      </html>
    );
  }
}

export default Home;
