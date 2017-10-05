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


// Classes for Song and Album. Not really necessary
class Song {
    constructor(name, album, length, tPrice) {
        this.songname = name;
        this.songlength = length;
        this.collectionName = album;
        this.songprice = tPrice;
    }
}

class Album {
    constructor(name) {
        this.name = name;
    }
}

let results;
let eminem;
let royce;

// Classes for StoreData and ProcessData as defined in project specs
class StoreData {
	getData(){
	// Promise to gather data from provider
    Promise.all([fetch("https://itunes.apple.com/search?term=eminem&limit=100"),
        fetch("https://itunes.apple.com/search?term=royce+da&limit=100")])
	.then((res) => {
        return Promise.all([res[0].json(), res[1].json()]);
    })
	// Stores json from promise into two arrays
	.then((json) => {
            eminem = json[0].results;
            royce = json[1].results;
    })
	// Logs error if caught
	.catch(function (e){
		console.log(e.message);
	});
	}
}

class ProcessData {
	// Taken from homework 1
	// Converts JSON data into a shorter version of JSON data to make more readable
	songsInSec(d) {
        var x;
        var y;
        var z = [];
        var i = 0;
        for (x in d) {
            if (d[x].kind == "song") {
                y = new Song(d[x].trackName, d[x].collectionName, d[x].trackTimeMillis/1000, d[x].trackPrice);
                z[i] = y;
                i++;
            }
        }
        return z;
	}

	// Gets all albums from the datastore
	getAlbums(d) {
		var albums = [];
		var i = 0;
		var check = false;
		for (var x in d) {
			for (var y in albums) {
				// Store new album names in an array and compare album names with names in array
				if (d[x].collectionName == albums[y].name)
					check = true;
			}
			if (check == false) {
				var z = new Album(d[x].collectionName);
				albums[i] = z;
				i++;
			}
			check = false;
		}
		return albums;
	}

	// Copied function from above with different return value
	getAlbumNum(d) {
		var albums = [];
		var i = 0;
		var check = false;
		for (var x in d) {
			for (var y in albums) {
				if (d[x].collectionName == albums[y].name)
					check = true;
			}
			if (check == false) {
				var z = new Album(d[x].collectionName);
				albums[i] = z;
				i++;
			}
			check = false;
		}
    	return i;
	}

	// Function returns a specific song when given a name
	specificSong(d, songName) {
		for (var x in d) {
			if (d[x].trackName === songName) {
				return d[x];
			}
		}
		return -1;
	}

	// Update the name of a song
	// Returns 0 (success) or -1 (song DNE)
	// Iterate through datastore to find song name match and update name
	updateSong(d, oldName, newName) {
		for(var x in d) {
			if(d[x].trackName === oldName) {
				d[x].trackName = newName;
				return 0;
			}
		}
		return -1;
	}

	// Function to delete all tracks that are apart of the album
	// Finds index in datastore then splices accordingly
	deleteAlbum(d, albumName) {
		var index = -1;
		for (var x in d) {
			if (d[x].collectionName === albumName) {
				index = d.indexOf(d[x]);
				d.splice(index, 1);
			}
		}
		return index;
	}

	// Function to find longest song in datastore
	longestSong(d) {
		var max = 0;
		var name;
		for (var x in d) {
			if (max < d[x].trackTimeMillis){
				name = d[x].trackName;
				max = d[x].trackTimeMillis;
			}
		}
		return name;
	}

	// Function to update the price
	// Checks to see if requested song is in datastore, then updates
	updatePrice(d, songName, price) {
		for (var x in d) {
			if (d[x].trackName === songName) {
				d[x].trackPrice = price;
				return 0;
			}
		}
		return -1;
	}
}


// Variables to create new datastore and processdata instances
var storeData = new StoreData();
var processData = new ProcessData();

// Timer interval to fetch new data
// Refreshes data every 500 ms
const intv = setInterval(()	=>	{	
	storeData.getData();
},	500);


let database = firebase.database();

// Add a new song with post request
app.post("/:trackID/:collection/:artistID/", function (req, res) {
	database.ref('artists/' + req.params.artistID + '/' + req.params.collection + '/' + 'songs/').set({
		name: req.params.trackID,
		artist: req.params.artistID,
		collection: req.params.collection
	});
	res.send("Success");
});

// haven't done yet
app.get("/:trackID", function (req, res) {
	database.ref('songs/' + req.params.songname).set({
		name: req.params.songname,
		artist: req.params.artist,
		collection: req.params.albumname
	});
	res.send("Success");
});

// doesn't work yet
app.delete("/:songname", function (req, res) {
	database.ref.remove();
	res.send("Success");
});

// Add a new song with post request
app.post("/:playlist", function (req, res) {
	database.ref('playlists/' + req.params.playlist).set({
		name: req.params.playlist
	});
	res.send("Success");
});


/*
// Takes all songs from an artist and converts the time of each track to milliseconds
// Sends back a cleaner JSON dataset
app.get("/:artist", function (req, res) {
	if (req.params.artist == "eminem" || req.params.artist == "Eminem")
		res.send(processData.songsInSec(eminem));
	else if (req.params.artist == "royce" || req.params.artist == "Royce")
		res.send(processData.songsInSec(royce));
	else
		res.sendStatus(404);
});


// All Songs
app.get("/", function (req, res) {

  var all = new Promise(function(resolve, reject){
    if(eminem != null){
      var arr1 = processData.songsInSec(eminem);
      resolve(arr1);
    }
    else {
      reject("Data not available");
    }
  });

  all.then(function(resolve){
    var arr2 = processData.songsInSec(royce);
    return results = resolve.concat(arr2);
  })
  .catch(function(error){
    console.log("Failed to retrieve all songs");
  });
  res.send(results);
});

// All Albums
app.get("/:artist/allAlbums/", function (req, res) {
	// Requires that artist is a valid parameter
	// Uses a promise so that if the artist is invalid, send an error status
	// If the promise is fulfilled, then get data
	let p = new Promise(function(resolve, reject){
		if (req.params.artist == "eminem" || req.params.artist == "Eminem")
			resolve(req.params.artist)
		else if (req.params.artist == "royce" || req.params.artist == "Royce")
			resolve(req.params.artist);
		else
			reject(res.sendStatus(404));
	}).then(function(resolve){
		if (resolve == "eminem" || resolve == "Eminem")
			res.send(processData.getAlbums(eminem));
		else
			res.send(processData.getAlbums(royce));
	}).catch(function(reject){
		console.log("Artist does not exist");
	});
});

// Number of albums
app.get("/:artist/allAlbums/number", function (req, res) {
	if (req.params.artist == "eminem" || req.params.artist == "Eminem")
		res.send(`${processData.getAlbumNum(eminem)} albums`);
	else if (req.params.artist == "royce" || req.params.artist == "Royce")
		res.send(`${processData.getAlbumNum(royce)} albums`);
	else
		res.status(500).send("Error 500 - Artist does not exist");
});

// Get a specific song. Sends an error if DNE
app.get("/:artist/:songname", function (req, res) {
	if (req.params.artist == "eminem" || req.params.artist == "Eminem") {
		if (processData.specificSong(eminem, req.params.songname) == -1)
			res.status(404).send("Error 404 - Not found");
		else
			res.send(processData.specificSong(eminem, req.params.songname));
	} else if (req.params.artist == "royce" || req.params.artist == "Royce") {
		if (processData.specificSong(royce, req.params.songname) == -1)
			res.status(404).send("Error 404 - Not found");
		else
			res.send(processData.specificSong(royce, req.params.songname));
	} else
		res.status(500).send("Error 500 - Artist does not exist");
});

// Find longest song
app.get("/:artist/songs/longestSong/", function (req, res) {
	if (req.params.artist == "eminem" || req.params.artist == "Eminem")
		res.send(processData.longestSong(eminem));
	else if (req.params.artist == "royce" || req.params.artist == "Royce")
		res.send(processData.longestSong(royce));
	else
		res.status(500).send("Error 500 - Artist does not exist");
});

// Put update of renaming songs. Sends an error if DNE
// Stops interval timer to fetch new data since data is being updated
app.put("/:artist/:songname/:newName", function (req, res) {
	clearInterval(intv);
	if (req.params.artist == "eminem" || req.params.artist == "Eminem") {
		if (processData.updateSong(eminem, req.params.songname, req.params.newName) == 0)
			res.send(`PUT Success! Song ${req.params.songname} renamed to ${req.params.newName}!`);
		else
			res.status(500).send("Song name doesn't exist!");
	} else if (req.params.artist == "royce" || req.params.artist == "Royce") {
		if (processData.updateSong(royce, req.params.songname, req.params.newName) == 0)
			res.send(`PUT Success! Song ${req.params.songname} renamed to ${req.params.newName}!`);
		else
			res.status(500).send("Song name doesn't exist!");
	}
	else
		res.status(500).send("Error 500 - Artist does not exist");
});

// Post update for price of song. Sends an error if DNE
// Stops interval timer to fetch new data since data is being updated
app.post("/:artist/:songname/:price", function (req, res) {
	clearInterval(intv);
	if (req.params.artist == "eminem" || req.params.artist == "Eminem") {
		if (processData.updatePrice(eminem, req.params.songname, req.params.price) == 0)
			res.send("POST Success! Price has been changed!");
		else
			res.status(500).send("Song name doesn't exist");
	} else if (req.params.artist == "royce" || req.params.artist == "Royce") {
		if (processData.updatePrice(royce, req.params.songname, req.params.price) == 0)
			res.send("POST Success! Price has been changed!");
		else
			res.status(500).send("Song name doesn't exist");
	}
	else
		res.status(500).send("Error 500 - Artist does not exist");
});

// Delete request. Deletes an entire album and all songs in the album.
// Returns an error is DNE
// Stops interval timer to fetch new data since data is being updated
app.delete("/:artist/allAlbums/:albumName", function(req, res){
	clearInterval(intv);
	if (req.params.artist == "eminem" || req.params.artist == "Eminem") {
		var r = processData.deleteAlbum(eminem, req.params.albumName);
		if (r == -1) {
			res.status(500).send("Album name doesn't exist!");
			allSongs = processData.songsInSec();
			allAlbums = processData.getAlbums();
		}
		else
			res.send("DELETE Success!");
	} else if (req.params.artist == "royce" || req.params.artist == "Royce") {
		var r = processData.deleteAlbum(royce, req.params.albumName);
		if (r == -1) {
			res.status(500).send("Album name doesn't exist!");
			allSongs = processData.songsInSec();
			allAlbums = processData.getAlbums();
		}
		else
			res.send("DELETE Success!");
	} else
		res.status(500).send("Error 500 - Artist does not exist");

});
*/
app.listen(process.env.PORT || 3000, function () {
	console.log('App listening on port 3000!')
});
