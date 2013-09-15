var directives = angular.module("mp3Player.directives", []);

directives.directive("loadIcon", function() {
    return {
        restrict: "E",
        template: "<span class=\"right\">{{track.duration | formatTime}}<canvas class=\"loadicon\" id=\"loadicon{{track.id}}\" width=\"17\" height=\"17\"></canvas></span>",
        replace: true,
        link: function(scope, element, attrs) {
            var icon = element.find(".loadicon")
            icon.loadicon();
            icon.loadicon("start");
        }
    }
})