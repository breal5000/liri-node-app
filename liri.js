console.log("the bot is starting")

require("dotenv").config();

var Twitter = require("twitter");

var Spotify = require("node-spotify-api");

var keys = require("./keys");

var request = require("request");


var spotify = new Spotify(keys.spotify);

// Twitter function
 
var client = new Twitter(keys.twitter
  //consumer_key: 'jroTXU1dgClobCfpETmcasKDq',
  //consumer_secret: 'WspEMxmYddcTS7riGeeOcqXpRSK7qKAOs3Ux6DcW9nIRdatuSG',
  //access_token_key: '991150617845415941-6zGGELNCsctVS9HOKEnpvPc1hBuH9rb',
  //access_token_secret: 'xtBFzFXatJ99rybbaI6JjXTdmfizoGzmPnoS2E3uPUCuz'
);

var getMyTweets = function() {
  //var client = new Twitter(keys.twitter);
  var params = {
    screen_name: "Brandon Frazier", count: 21
  };
  client.get("statuses/user_timeline", params, function(
    error,
    tweets,
    response
  ) {
    if (!error) {
      for (var i = 0; i < tweets.length; i++) {
        console.log(tweets[i].created_at);
        console.log("");
        console.log(tweets[i].text);
      }
    }
  });
}; 

//Spotify function 
var getArtistNames = function(artist) {
  return artist.name;
};

var goToSpotify = function(songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }
  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Error occurred: " + err);
        return;
      }
      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }
    }
  );
};
// Function for running a Movie Search
var goToMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "Commando";
  }
  var urlHit =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";
  request(urlHit, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      var jsonData = JSON.parse(body);
      console.log("Title: " + jsonData.Title);
      console.log("Year: " + jsonData.Year);
      console.log("Rated: " + jsonData.Rated);
      console.log("IMDB Rating: " + jsonData.imdbRating);
      console.log("Country: " + jsonData.Country);
      console.log("Language: " + jsonData.Language);
      console.log("Plot: " + jsonData.Plot);
      console.log("Actors: " + jsonData.Actors);
      console.log("Rotton Tomatoes Rating: " + jsonData.Ratings[1].Value);
    }
  });
};
// Function for running a command based on text file

// Function to determine which one gets used
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "my-tweets":
      getMyTweets();
      break;
    case "spotify-this-song":
      goToSpotify(functionData);
      break;
    case "movie-this":
      goToMovie(functionData);
      break;
    case "do-what-it-says":
      asInstructed();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};
// CLI arguments
var runThis = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

runThis(process.argv[2], process.argv[3]);
