const authorize = require('./lib/authorization');
const requestGenerator = require('./lib/request-generator');
const google = require('googleapis');
const Song = require('./model/song');
authorize().then(start);

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/album');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("db connection successful");
});

async function start(auth) {
  //  for (let year = 1950; year < 2016; year += 5) {
        const songs = await Song.find({ year: 2015 }).limit(1)
        for (const song of songs) {
           let response =  await processSongs(auth, song.artist + " - " + song.name, song);
            console.log("added: " + song.artist + " - " + song.name)
        }
   // }
}

function processSongs(auth, query, song) {
    console.log("in process songs");
    const request = requestGenerator.createSearchRequest(auth, query);
    const service = google.youtube('v3');
    return new Promise((resolve, reject) => {
        service.search.list(request, (err, response) => {
            err ? reject(err)
                : addSongToPlaylist(auth, response.data.items[0].id.videoId, song)
                    .then(resolve)
                    .catch(reject)
        });
    });
}

function addSongToPlaylist(auth, videoId, song) {
    console.log("addingsongs");
    updateSongWithId(videoId, song);
    const request = requestGenerator.createPlaylistInsertRequest(auth, videoId)
    const service = google.youtube('v3');
    return new Promise((resolve, reject) => {
        service.playlistItems.insert(request, (err, response) => {
            err ? reject(err)
                : resolve(response)
        })
    })
}

function updateSongWithId(videoId, song){
    let query = {artist: song.artist,
    name: song.name,
    year: song.year}
    Song.findOneAndUpdate(query, {videoId: videoId});
}