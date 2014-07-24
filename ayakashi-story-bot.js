var current = 0;
var max = 30;
var continueClick = true;
function click() {
    var delay = 1000;
        if ($("#card-acquisition-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#pvp-event-encounter-page").hasClass("ui-page-active")) {
            delay = 2000;
            location.href = "http://zc2.ayakashi.zynga.com/app.php?_c=adventure&action=currentStage";
        } else if ($("#parts-complete-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#npc-battle-confirm-page").hasClass("ui-page-active")) {
            delay = 2000;
            $link = $('a:first');
            $link[0].click();
        } else if ($(".results").hasClass("ui-page-active")) {
            $link = $('a:first');
            $link[0].click();
        } else if ($("#negotiation-failed-page").hasClass("ui-page-active")) {
            delay = 2000;
            location.href = "http://zc2.ayakashi.zynga.com/app.php?_c=adventure&action=currentStage";
        } else if ($("#negotiation-page").hasClass("ui-page-active")) {
            $link = $('a:first');
            $link[0].click();
        } else if ($("#drama-page").hasClass("ui-page-active")) {
            var str = window.location.search;
            str = str.substr(str.indexOf("http"));
            str = str.substr(0, str.indexOf("&"));
            location.href = unescape(str);
            delay = 2000;
        } else if ($("#battle-page").hasClass("ui-page-active")) {
            $("#node-7").trigger("click");
        } else if ($("#treasure-acquisition-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#level-up-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#encounter-other-player-page").hasClass("ui-page-active")) {
            window.history.back();
        } else if ($("#parts-pvp-acquisition-page").hasClass("ui-page-active")) {
            window.history.back();
        } else {
            if (!($("#do-adventure").hasClass("loading"))) {
                if (current < max) {
                    $("#do-adventure").trigger("click");
                } else {
                    continueClick = false;
                }
            } else {
            }
        }
    if (continueClick)
        window.setTimeout(click, delay);
}
click();
