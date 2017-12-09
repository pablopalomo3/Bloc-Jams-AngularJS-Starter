(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

        /**
        * @desc stores album
        * @type {Object}
        */
        var currentAlbum = Fixtures.getAlbum();

        /**
        * @desc Buzz object audio file
        * @type {Object}
        */
        var currentBuzzObject = null;

        /**
        * @function setSong
        * @desc Stops currently playing song and loads new audio file as currentBuzzObject
        * @param {Object} song
        */

        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            }
            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
         };

         /**
         * @function playSong
         * @desc private function - plays currentBuzzObject
         * @param {Object} song
         */
         var playSong = function(song) {
             if(currentBuzzObject) {
                 currentBuzzObject.play();
                 song.playing = true;
             }
         }

         /**
         * @function stopSong
         * @desc private function - stops currentBuzzObject
         * @param {Object} song
         */
         var stopSong = function(song) {
             if(currentBuzzObject) {
                 currentBuzzObject.stop();
                 song.playing = null;
             }
         }

         /**
         * @function getSongIndex
         * @desc private function - gets index of song.
         * @param {Object} song
         */
         var getSongIndex = function(song) {
             return currentAlbum.songs.indexOf(song);
         };

         /**
         * @desc Active song object from list of songs
         * @type {Object}
         */
         SongPlayer.currentSong = null;

         /**
         * @function play
         * @desc public method - uses setSong & playSong functions to play song.
         * @param {Object} song
         */
         SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (song === null) {
                song = currentAlbum.songs[0];
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }
        };

        /**
        * @function pause
        * @desc public method - pauses playing song.
        * @param {Object} song
        */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

        /**
        * @function previous
        * @desc public method - plays previous song.
        * @param {Object} song
        */
        SongPlayer.previous = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if(currentSongIndex < 0) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        /**
        * @function next
        * @desc public method - plays next song.
        * @param {Object} song
        */
        SongPlayer.next = function() {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if(currentSongIndex > currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };


        return SongPlayer;
    }

    angular
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
