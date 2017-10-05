var express = require('express')
var fetch = require('node-fetch');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser.json());

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
  getTopTen(){
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
  }
  //removes artists from database
  remove(artist){
    database.ref().child('artists/' + artist).remove();
  }

  updatePlay(playlist, track){
    var playref = database.ref().child("playlists/" + playlist)
    playref.update({track:track, no:tracknum});
  }
}

var storeData = new StoreData();
var processData = new ProcessData();

storeData.getTopTen();
var topten;
var database = firebase.database();


//retrieves top ten songs
app.get('/', function(req, res){
  res.send(topten);
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


// Add a new song with post request
app.post("/:artistID/:collection/:trackID/", function (req, res) {
  processData.add(req.params.artistID, req.params.collection, req.params.trackID);
  res.send("Success");
});

//deletes artist from database
app.delete("/artist/:artistID", function (req, res) {
  processData.remove(req.params.artistID);
	res.send("Success");
});

// sets a new playlist with post request
app.post("/:playlist", function (req, res) {
	database.ref('playlists/' + req.params.playlist).set({
		playlist: req.params.playlist,
    track: null,
    tracknum: null
	});
	res.send("Success");
});

//update playlist
app.put("/:playlist/:trackID", (req,res) => {
  processData.updatePlay(req.params.playlist, req.params.trackID);
  res.send("Success");
});

//delete playlist
app.delete("/:playlist", (req, res) => {
  database.ref().child("playlists/" + req.params.playlist).remove();
  res.send("Success");
});

app.listen(process.env.PORT || 3000, function () {
	console.log('App listening on port 3000!')
});
