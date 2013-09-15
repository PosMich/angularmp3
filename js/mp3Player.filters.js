var filters = angular.module("mp3Player.filters", []);

filters.filter("titleLength", function() {
    return function(input) {
        if (input.length < 22)
            return input;
        return input.substring(0,23)+"...";
    }
})

filters.filter("formatTime", function() {
    return function(time) {
        if (time == "")
            return "";

        var minutes = Math.floor(time/60);
        var seconds = Math.floor(time - minutes*60);
        if (seconds < 10)
            seconds = "0"+seconds

        return minutes+":"+seconds;
    }
})