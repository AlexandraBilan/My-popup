$(function () {

    (function ($) {
        $.fn.popup1 = function (options) {
            if (options === undefined) {
                options = {};
            }
            if (options.width === undefined) {
                options.width = 400;
            }
            if (options.delay === undefined) {
                options.delay = 200;
            }

            this.on("click", {width: options.width}, fPopup);
            let $shadow = $("<div id='popup-shadow'></div>");
            $shadow.on("click", {delay: options.delay}, fClose);

            let $wrapper = $(`<div class='popup' id='popup'>
  <div class='popup-close' data-popup-close>X</div>
  <div class='popup-content' data-popup-content>Сообщение</div>
  </div>`);
            $wrapper.find("[data-popup-close]").on("click", {delay: options.delay}, fClose);
            let $popup = null;
            function fPopup(e) {
                $popup = $($(this).attr("href"));
                $wrapper.find("[data-popup-content]").html("");
                $wrapper.find("[data-popup-content]").append($popup.clone(true));
                $wrapper.width(e.data.width);
                $wrapper.hide();
                $shadow.hide();
                $("body").append($wrapper).append($shadow);
                let windowHeight = $(window).height();
                let windowWidth = $(window).width();
                let popupWidth = $wrapper.width();
                let popupHeight = $wrapper.height();
                let popupPositionLeft = (windowWidth - popupWidth) / 2;
                let popupPositionTop = (windowHeight - popupHeight) / 2;
                let closeLeft = popupWidth+5;
                $wrapper.css({top: popupPositionTop + "px", left: popupPositionLeft + "px",  "z-index": 100, position: "absolute"});
                $wrapper.find("[data-popup-close]").css({top: -25 +"px", left: closeLeft +"px", position: "relative"});
                $shadow.css({top: 0, left: 0, position: "fixed", width: 100+"%", height: 100 +"%", "background-color": "#000","opacity": 0.2, "z-index": 50});
                $wrapper.fadeIn(e.data.delay);
                $shadow.fadeIn(e.data.delay);
            }

            function fClose(e) {
                $wrapper.fadeOut(e.data.delay, $wrapper.detach);
                $shadow.fadeOut(e.data.delay, $shadow.detach);
            }
        };
    })(jQuery);
});
