function AppCtrl($rootScope, $scope, Player) {

    /****** debug stuff *******/
    $rootScope.debug = true;
    $rootScope.log = function(text) {
        if ($rootScope.debug)
            console.log(text);
    }

    /****** global vars *******/
    $scope.title = "AngularJS - MP3 Player";
    $scope.theme = "Dark";

    $scope.tracks = [];
    $scope.trackCurrent = 0;

    /***** Resize Event *****/
    function stretchBody () {
        $("body").height($(window).height());
    }
    setTimeout(stretchBody(),1000);

    $(window).resize(stretchBody);

    /***** Sliders ******/
    var $volumeSlider = $(".slider.volume");
    var $timeSlider = $(".slider.time");

    $scope.volumeSlider = new components.HSlider({
        view:$volumeSlider,
        min:parseFloat($volumeSlider.attr("data-min")),
        max:parseFloat($volumeSlider.attr("data-max")),
        value:parseFloat($volumeSlider.attr("data-value"))
    });

    $scope.timeSlider = new components.HSlider({
        view:$timeSlider,
        min:parseFloat($timeSlider.attr("data-min")),
        max:parseFloat($timeSlider.attr("data-max")),
        value:parseFloat($timeSlider.attr("data-value"))
    });


    /***** load tracklist *****/
    $.getJSON("tracklist.json", function(data) {
        var i = 0;
        var tracks = [];
        data.tracks.forEach(function(data) {
            tracks.push({
                id: i++,
                artist: data.artist,
                title: data.title,
                album: data.album,
                genre: data.genre,
                url: data.url,
                loaded: false,
                duration: ""
            });
        });
        $scope.tracks = tracks;
        $scope.$apply();
        $(".playaView1").hide(0).show(0);
        Player.init($scope.tracks);
    });
}

function ButtonCtrl($rootScope, $scope, Display, Player) {
    window.buttons = $scope.buttons = {
        prev: false,
        play: false,
        pause: false,
        stop: false,
        next: false
    }

    function disableAllButtons() {
        $scope.buttons.prev = false;
        $scope.buttons.play = false;
        $scope.buttons.pause = false;
        $scope.buttons.stop = false;
        $scope.buttons.next = false;
    }

    $scope.prev = function() {
        $scope.log("prev");
        if ($scope.buttons.prev)
            return
        disableAllButtons();
        $scope.buttons.prev = true;
    }

    $scope.play = function() {
        $scope.log("play");
        if ($scope.buttons.play)
            return
        disableAllButtons();
        $scope.buttons.play = true;
    }

    $scope.pause = function() {
        $scope.log("pause");
        if ($scope.buttons.pause)
            return
        disableAllButtons();
        $scope.buttons.pause = true;
    }

    $scope.stop = function() {
        $scope.log("stop");
        if ($scope.buttons.stop)
            return
        disableAllButtons();
        $scope.buttons.stop = true;
    }

    $scope.next = function() {
        $scope.log("next");
        if ($scope.buttons.next)
            return
        disableAllButtons();
        $scope.buttons.next = true;
        Display.setText("asdfasdfasdfasdfasdfasdfasdfasdfadsfasfasdfasdfasdfasdf");
    }


    window.root = $rootScope;
    window.scope = $scope;
}

function TimeCtrl($scope) {
}

function DisplayCtrl($scope, Display) {
    $scope.Display = Display.getText();
    $scope.Album = Display.getAlbum();
    $scope.Genre = Display.getGenre();

    $scope.$watch(function() {return Display.getText()}, function(newVal, oldVal) {
        if (newVal && newVal != oldVal)
            $scope.Display = newVal;
    });
    $scope.$watch(function() {return Display.getAlbum()}, function(newVal, oldVal) {
        if (newVal && newVal != oldVal)
            $scope.Album = newVal;
    });
    $scope.$watch(function() {return Display.getGenre()}, function(newVal, oldVal) {
        if (newVal && newVal != oldVal)
            $scope.Genre = newVal;
    });
}

function VolumeCtrl($scope) {
}