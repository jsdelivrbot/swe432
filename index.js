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

var topten;
let database = firebase.database();

//retrieves top ten songs
app.get('/', function(req, res){
  fetch("https://rss.itunes.apple.com/api/v1/us/apple-music/hot-tracks/all/10/explicit.json")
  .then(res => {return res.json()})
  .then(json => {
    topten = json.feed.results;
  })
  res.send(topten);
})

// Add a new song with post request
app.post("/:trackID/:collection/:artistID/", function (req, res) {
	database.ref('artists/' + req.params.artistID + '/' + req.params.collection + '/' + 'songs/').set({
		name: req.params.trackID,
		artist: req.params.artistID,
		collection: req.params.collection
	});
	res.send("Success");
});

// doesn't work yet
app.delete("/:songname", function (req, res) {
	firebase.database().ref().child('artists/' + req.params.songname).remove();
	res.send("Success");
});

// Add a new song with post request
app.post("/:playlist", function (req, res) {
	database.ref('playlists/' + req.params.playlist).set({
		name: req.params.playlist
	});
	res.send("Success");
});

app.listen(process.env.PORT || 3000, function () {
	console.log('App listening on port 3000!')
});
