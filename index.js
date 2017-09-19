var express = require('express')
var fetch = require('node-fetch');
var app = express();
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());



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
 
let data;
let results;

// Classes for StoreData and ProcessData as defined in project specs
class StoreData {
	getData(){
	//gets the json data from top 100 eminem tracks
		fetch("https://itunes.apple.com/search?term=eminem&limit=100")
		.then(function(res) {
			return res.json();
		})
		.then(function(json) {
			data = json;
			// Cuts off the unimportant part of the JSON taken from the fetch
			results = data.results;
		});
	}
}

class ProcessData {
	// Taken from homework 1
	// Converts JSON data into a shorter version of JSON data to make more readable
	songsInSec() {
        var x;
        var y;
        var z = [];
        var i = 0;
        for (x in results) {
            if (results[x].kind == "song") {
                y = new Song(results[x].trackName, results[x].collectionName, results[x].trackTimeMillis/1000, results[x].trackPrice);
                z[i] = y;
                i++;
            }
        }
        return z;
	}

	// Gets all albums from the datastore
	getAlbums() {
		var albums = [];
		var i = 0;
		var check = false;
		for (var x in results) {
			for (var y in albums) {
				// Store new album names in an array and compare album names with names in array
				if (results[x].collectionName == albums[y].name)
					check = true;
			}
			if (check == false) {
				var z = new Album(results[x].collectionName);
				albums[i] = z;
				i++;
			}
			check = false;
		}
		return albums;
	}

	// Copied function from above with different return value
	getAlbumNum() {
		var albums = [];
		var i = 0;
		var check = false;
		for (var x in results) {
			for (var y in albums) {
				if (results[x].collectionName == albums[y].name)
					check = true;
			}
			if (check == false) {
				var z = new Album(results[x].collectionName);
				albums[i] = z;
				i++;
			}
			check = false;
		}
    	return i;
	}
	
	//function returns a specific song when given a name
	specificSong(name) {
		for (var x in results) {
			if (results[x].trackName === name) {
				return results[x];
			}
		}
		return -1;
	}

	// Update the name of a song
	// Returns 0 (success) or -1 (song DNE)
	// Iterate through datastore to find song name match and update name
	updateSong(oldName, newName) {
		for(var x in results) {
			if(results[x].trackName === oldName) {
				results[x].trackName = newName;
				return 0;
			}
		}
		return -1;
	}

	// Function to delete all tracks that are apart of the album
	// Finds index in datastore then splices accordingly
	deleteAlbum(name) {
		var index = -1;
		for (var x in results) {
			if (results[x].collectionName === name) {
				index = results.indexOf(results[x]);
				results.splice(index, 1);
			}
		}
		return index;
	}

	// Function to find longest song in datastore
	longestSong() {
		var max = 0;
		var name;
		for (x in results) {
			if (max < results[x].trackTimeMillis){
				name = results[x].trackName;
				max = results[x].trackTimeMillis;
			}
		}
		return name;
	}

	// Function to update the price
	// Checks to see if requested song is in datastore, then updates
	updatePrice(name, price) {
		for (var x in results) {
			if (results[x].trackName === name) {
				results[x].trackPrice = price;
				return 0;
			}
		}
		return -1;
	}
}
 

// Variables to create new datastore and processdata instances
var storeData = new StoreData();
var processData = new ProcessData();

// Fetch
storeData.getData();
 
// All Songs
app.get("/", function (req, res) {
	res.send(processData.songsInSec());
});

// All Albums
app.get("/allAlbums/", function (req, res) {
	res.send(processData.getAlbums());
});

// Number of albums
app.get("/allAlbums/number", function (req, res) {
	res.send(`${processData.getAlbumNum()} albums`);
});

// Get a specific song. Sends an error if DNE
app.get("/:songname", function (req, res) {
	if (processData.specificSong(req.params.songname) == -1)
		res.status(404).send("Error 404 - Not found");
	else
		res.send(processData.specificSong(req.params.songname));
});

// Find longest song
app.get("/allSongs/longestSong/", function (req, res) {
	res.send(processData.longestSong());
});
 
// Put update of renaming songs. Sends an error if DNE
app.put("/allSongs/:songname/:newName", function (req, res) {
	if (processData.updateSong(req.params.songname, req.params.newName) == 0)
		res.send(`PUT Success! Song ${req.params.songname} renamed to ${req.params.newName}!`);
	else
		res.status(500).send("Song name doesn't exist!");
});
 
// Post update for price of song. Sends an error if DNE
app.post("/:songname/:price", function (req, res) {
	if (processData.updatePrice(req.params.songname, req.params.price) == 0)
		res.send("POST Success! Price has been changed!");
	else
		res.status(500).send("Song name doesn't exist");
});

// Delete request. Deletes an entire album and all songs in the album. 
// Returns an error is DNE
app.delete("/allAlbums/:albumName", function(req, res){
	var r = processData.deleteAlbum(req.params.albumName);
	if (r == -1) {
		res.status(500).send("Album name doesn't exist!");
		allSongs = processData.songsInSec();
		allAlbums = processData.getAlbums();
	}
	else
		res.send("DELETE Success!");
});
 
app.listen(3000, function () {
	console.log('Eminem app listening on port 3000!')
});