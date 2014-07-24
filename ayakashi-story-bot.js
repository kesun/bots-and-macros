var current = 0;
var max = 30;
var continueClick = true;
var curURL = document.URL;
var newWindow = window.open(curURL, "_blank", "width=100, height=100");
var isReady = false;
var delay = 1000;

function loaded() {
    isReady = true;
}

function init() {
    console.log('tick');
    if (newWindow.$("#card-acquisition-page").hasClass("ui-page-active")) {
        newWindow.history.back();
    } else if (newWindow.$("#pvp-event-encounter-page").hasClass("ui-page-active")) {
        delay = 2000;
        newWindow.location.href = curURL;
    } else if (newWindow.$("#parts-complete-page").hasClass("ui-page-active")) {
        newWindow.history.back();
    } else if (newWindow.$("#npc-battle-confirm-page").hasClass("ui-page-active")) {
        delay = 2000;
        $link = newWindow.$('a:first');
        $link[0].click();
    } else if (newWindow.$(".results").hasClass("ui-page-active")) {
        $link = newWindow.$('a:first');
        $link[0].click();
    } else if (newWindow.$("#negotiation-failed-page").hasClass("ui-page-active")) {
        delay = 2000;
        newWindow.location.href = curURL;
    } else if (newWindow.$("#negotiation-page").hasClass("ui-page-active")) {
        $link = newWindow.$('a:first');
        $link[0].click();
    } else if (newWindow.$("#drama-page").hasClass("ui-page-active")) {
        var str = newWindow.location.search;
        str = str.substr(str.indexOf("http"));
        str = str.substr(0, str.indexOf("&"));
        newWindow.location.href = unescape(str);
        delay = 2000;
    } else if (newWindow.$("#battle-page").hasClass("ui-page-active")) {
        newWindow.$("#node-7").trigger("click");
    } else if (newWindow.$("#treasure-acquisition-page").hasClass("ui-page-active")) {
        newWindow.history.back();
    } else if (newWindow.$("#level-up-page").hasClass("ui-page-active")) {
        newWindow.history.back();
    } else if (newWindow.$("#encounter-other-player-page").hasClass("ui-page-active")) {
        newWindow.history.back();
    } else if (newWindow.$("#parts-pvp-acquisition-page").hasClass("ui-page-active")) {
        newWindow.history.back();
    } else {
        if (!(newWindow.$("#do-adventure").hasClass("loading"))) {
            console.log('if loading');
            if (current < max) {
                newWindow.$("#do-adventure").trigger("click");
            } else {
                continueClick = false;
            }
        } else {
        }
    }
    if (continueClick)
        setTimeout(init, delay);
}

newWindow.onload = function() {
    isReady = true
};

function start(){
    setTimeout(init, 2000);
}

start();
