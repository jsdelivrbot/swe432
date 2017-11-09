var express = require('express')
var fetch = require('node-fetch');
var bodyParser = require('body-parser');
var fs = require('fs');
var path = require('path');

var app = express();
app.use(bodyParser.json());

//app.use(express.static(path.join(__dirname, 'frontend')));

const firebase = require('firebase');

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAoALAhnP3dK_KDJwiW5TZziLIRaPc55IU",
    authDomain: "swe432-491ba.firebaseapp.com",
    databaseURL: "https://swe432-491ba.firebaseio.com",
    projectId: "swe432-491ba",
    storageBucket: "swe432-491ba.appspot.com",
    messagingSenderId: "167207760575"
};
firebase.initializeApp(config);


class StoreData {
  getTopTen(artist){
    fetch("https://rss.itunes.apple.com/api/v1/us/apple-music/hot-tracks/all/10/explicit.json")
    .then(res => {return res.json()})
    .then(json => {
      topten = json.feed.results;
    });
  }
}
class ProcessData {

  //adds songs
  add(artist, album, track){
    database.ref('artists/' + artist + '/' + album).push().set({
      name: track,
      artist: artist,
      collection: album
    });
	return true;
  }

  // Doesn't work
  // Delete a song
  deleteSong(artist, album, track) {
	  database.ref('artists/' + artist + '/' + album + '/' + track).remove();
	  return true;
  }

  //removes artists from database
  remove(artist){
    database.ref().child('artists/' + artist).remove();
  }

  // Create a new empty playlist
  createPlaylist(playlist) {
	  database.ref('playlists/' + playlist).set({
		name: playlist,
		tracks: []
	});
  }

  // Add tracks to a playlist
  updatePlay(playlist, track){
    var playref = database.ref().child("playlists/" + playlist + "/tracks/");
    playref.push({songname : track});
  }
}

var storeData = new StoreData();
var processData = new ProcessData();

storeData.getTopTen();
var topten;
var database = firebase.database();

/*
// Homepage
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/frontend/Homepage.html');
});
*/

//retrieves top ten songs from all artists from itunes api
app.get('/topTen', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.send(topten);
})

//retrieves top ten songs from an artist using itunes api
app.get('/topTen/:artistID', function(req, res){
	fetch(`https://itunes.apple.com/search?term=${req.params.artistID}&entity=musicTrack&limit=10`)
    .then(res => {return res.json()})
    .then(json => {
      var topTenArtist = json.results;
	  res.send(topTenArtist);
    });

})

//get songs from artist's album
app.get('/:artistID/:collection/', (req,res) => {
  var ref = firebase.database().ref("artists/" + req.params.artistID);
  ref.once("value")
  .then((snapshot) => {
    var album = snapshot.child(req.params.collection).val()
    res.send(album);
  });
});

// Search for a song by giving a keyword
app.get('/song/search/:keyword', (req, res) => {
	fetch (`https://itunes.apple.com/search?term=${req.params.keyword}&entity=musicTrack&attribute=songTerm`)
	.then(res => {return res.json()})
    .then(json => {
      var results = json.results;
	  res.send(results);
    });
});

//get songs from a playlist
app.get('/get/:playlist', (req,res) => {
  var ref = firebase.database().ref("playlists/" + req.params.playlist);
  ref.once("value")
  .then((snapshot) => {
    //var album = snapshot.child(req.params.collection).val()
    res.send(snapshot);
  });
});

// Add a new song with post request
app.post("/:artistID/:collection/:trackID/", function (req, res) {
  if (processData.add(req.params.artistID, req.params.collection, req.params.trackID))
	  res.send("Success");
});

// Doesn't work
// Delete a user created song with delete request
app.delete("/:artistID/:collection/:trackID/", function (req, res) {
  if (processData.deleteSong(req.params.artistID, req.params.collection, req.params.trackID))
	  res.send("Success");
});

// deletes artist from database
app.delete("/artist/:artistID", function (req, res) {
  processData.remove(req.params.artistID);
	res.send("Success");
});

// sets a new playlist with post request
app.post("/playlist/:playlist", function (req, res) {
	processData.createPlaylist(req.params.playlist);
	res.send("Success");
});

// update playlist by adding tracks to it
app.put("/playlist/:playlist/:trackID", (req,res) => {
  processData.updatePlay(req.params.playlist, req.params.trackID);
  res.send("Success");
});

// delete playlist entirely
app.delete("/playlist/:playlist", (req, res) => {
  database.ref().child("playlists/" + req.params.playlist).remove();
  res.send("Success");
});

app.post("/signup", (req,res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  firebase.auth().createUserWithEmailAndPassword(req.body.email, req.body.password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log(error.message);
  });

  var user = firebase.auth().currentUser;

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      user.sendEmailVerification().then(function() {
        return res.send("email is sentç")// Email sent.
      }).catch(function(error) {
      // An error happened.
      });
    } else {
      // No user is signed in.
    }
  });

  return res.send('done');
});

/*
app.get("/login", (req,res) => {
  res.sendFile(__dirname + '/frontend/Login.html');
});

app.get("/Playlist", function (req,res) {
  res.sendFile(__dirname + '/frontend/Playlist.html');
});
*/

app.listen(process.env.PORT || 3001, function () {
	console.log('App listening on port 3001!')
});
