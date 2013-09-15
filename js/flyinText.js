var flyinText = (function (window) {

    var flyinText = function(txtSel, realWidth, wholeWidth) {
        console.log(realWidth);
        console.log(wholeWidth);
        this.timeOut;
        this.realWidth = realWidth;
        this.wholeWidth = wholeWidth;
        this.$txt = $(txtSel);
    }

    flyinText.prototype.animate = function() {
        console.log("animate Func");
        var that = this;
        this.$txt.animate(
            {marginLeft: "-"+(this.wholeWidth-this.realWidth)},
            5000,
            function() {
                clearTimeout(that.timeOut);
                that.timeOut = setTimeout(
                    function() {
                        console.log("timeOut");
                        console.log(that.$txt);
                        that.$txt.animate({marginLeft: 0}, 1000, function() {
                            that.animate();
                        });
                    },
                1500);
            }
        );
    }

    flyinText.prototype.start = function(realWidth, wholeWidth) {
        var that = this;
        wholeWidth = (typeof wholeWidth !== "undefined") ? wholeWidth : that.wholeWidth;
        realWidth = (typeof realWidth !== "undefined") ? realWidth : that.realWidth;

        this.$txt.stop();

        this.wholeWidth = wholeWidth;
        this.realWidth = realWidth;
        this.animate();
    }

    flyinText.prototype.stop = function() {
        clearTimeout(this.timeOut);
        this.$txt.stop();
        this.$txt.css("margin-left", "0px");
    }

    return flyinText;
}(window));
