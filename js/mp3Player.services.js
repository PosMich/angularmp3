var services = angular.module("mp3Player.services", []);

services.service("Display", function($rootScope) {
    var txt = "txt";
    var album = "album";
    var genre = "genre";

    var started = false;
    var valChanged = false;
    var SongText = "";
    var display = {};
    display.song = $(".display .song");

    function Animation() {
        if (started && !valChanged)
            return;

        console.log("start");
        started = true;
        valChanged = false;
        display.song.css("position", "absolute");
        var width = display.song.width();
        display.song.css("position", "relative");

        SongText = new flyinText(".song", display.song.width(), width);
        SongText.start();
        console.log($rootScope);
    }

    return {
        setText: function(t) {
            valChanged = true;
            txt = t;
        },
        setAlbum: function(a) {
            valChanged = true;
            album = a;
        },
        setGenre: function(g) {
            valChanged = true;
            genre = g;
        },

        getText: function() {
            Animation();
            return txt;
        },
        getAlbum: function() {
            return album;
        },
        getGenre: function() {
            return genre;
        }
    }
});

services.service("Player", function($http) {
    var init = false;
    var trackBuffer = [];
    var FilesLoaded = [];
    var ctx = new webkitAudioContext();

    return {
        init: function(tracks) {
            for (var i=0; i<tracks.length; i++)
                FilesLoaded[i] = false;

            tracks.forEach(function(val) {
                /*$http.get(val.url, {responseType: "arraybuffer"}).success(function(data) {

                })*/

                var req = new XMLHttpRequest();
                req.open("GET", val.url, true);
                req.responseType = "arraybuffer";
                req.onload = function() {
                    ctx.decodeAudioData(req.response, function(b) {
                        $("#loadicon"+val.id).loadicon("stop");
                        $("#loadicon"+val.id).remove();
                        for (var i=0; i<scope.$parent.tracks.length; i++) {
                            if (scope.$parent.tracks[i].id == val.id) {
                                scope.$parent.tracks[i].loaded = true;
                                scope.$parent.tracks[i].duration = b.duration;
                                scope.$apply();
                            }
                        }
                        trackBuffer[val.id] = b;
                        FilesLoaded[val.id] = true;
                    }, function(err) {console.log("ERROR DECODING AUDIO");});
                };
                req.onerror = function() {
                    console.log("ERROR WHILE GETTING AUDIO FILES");
                }
                req.send();

            });
        },
        getFilesLoaded: function() {
            return FilesLoaded;
        }
    }
});

// Object.setProperty($scope, ...)