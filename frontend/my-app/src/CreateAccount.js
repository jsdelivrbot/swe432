import React, { Component } from 'react';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.onToolbarClick = this.onToolbarClick.bind(this);
  }
  onToolbarClick(event) {
    event.preventDefault();
    console.log(event.target);
    this.props.handleToolbarClick(event.target.id);
  }

  onChange = (e) => {
    // super easy to update the state
    const state = this.state
    state[e.target.name] = e.target.value;
    this.setState(state);
  }

  onSubmit = (e) => {
	alert('Account Created! You are now logged in!');
    e.preventDefault();
    // get our form data out of state
	  
    const { email, password } = this.state;

      fetch('/signup', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      })
    })
  }
  onLoginClick(event){
	alert('Account Created! You are now logged in!');
  }
  


  render() {
    return (
      <html>
        <head>
          <title>
            Login
          </title>
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous"/>
          <link rel="stylesheet" type="text/css" href="style.css" />
          <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"/>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js" integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh" crossorigin="anonymous"/>
          <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js" integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ" crossorigin="anonymous"/>
        </head>
        <body class = "main">
          <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" id="Home" onClick={this.onToolbarClick}>SoundBit</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item ad">
                  <a class="nav-link" id="Home" onClick={this.onToolbarClick}>Home<span className="sr-only">(current)</span></a>
                </li>
                <li class="nav-item ad ">
                  <a class="nav-link" id="Playlist" onClick={this.onToolbarClick}>Explore</a>
                </li>
				<li class="nav-item ad ">
                  <a class="nav-link" id="CreatePlaylist" onClick={this.onToolbarClick}>Create Playlist</a>
                </li>
                <li class="nav-item ad">
                  <a class="nav-link" id="TopSongs" onClick={this.onToolbarClick}>Top Songs</a>
                </li>
      		  <li class="nav-item active">
                  <a class="nav-link" id="Login" onClick={this.onToolbarClick}>Login<span className="sr-only">(current)</span></a>
                </li>
              </ul>
            </div>
          </nav>


        <div class="login-page">
        <div class="form" onSubmit={this.onSubmit}>
          <form class="login-form">
            <input type="text" id="email" placeholder="email" required/>
            <input type="password" id="password" placeholder="password" required/>
            <button>Create Account</button>

          </form>
        </div>
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

export default CreateAccount;
