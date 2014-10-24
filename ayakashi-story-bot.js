var current = 0;
var max = 30;
var continueClick = true;
var curURL = document.URL;
var newWindow = window.open(curURL, "_blank", "width=400, height=500");
var heartBeat = 1000;

function init() {
    if(newWindow.document.readyState == 'complete' && newWindow.$('.ui-loading').length == 0){
        if (newWindow.$("#card-acquisition-page").hasClass("ui-page-active") ||
                newWindow.$("#pvp-event-encounter-page").hasClass("ui-page-active") ||
                newWindow.$("#parts-complete-page").hasClass("ui-page-active") ||
                newWindow.$("#level-up-page").hasClass("ui-page-active") ||
                newWindow.$("#encounter-other-player-page").hasClass("ui-page-active") ||
                newWindow.$("#parts-pvp-acquisition-page").hasClass("ui-page-active") ||
                newWindow.$("#treasure-acquisition-page").hasClass("ui-page-active") ||
                newWindow.$("#adventure-timeout").hasClass("ui-page-active")) {
            newWindow.history.back();
        } else if (newWindow.$("#npc-battle-confirm-page").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#won").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#negotiation-failed-page").hasClass("ui-page-active")) {
            newWindow.location.href = curURL;
        } else if (newWindow.$("#negotiation-page").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#drama-page").hasClass("ui-page-active")) {
            newWindow.location.href = unescape(newWindow.$('base').attr('href').split('&')[1]).split('next_url=')[1];
        } else if (newWindow.$("#won").hasClass("ui-page-active")) { //ISSUE
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#negotiation-page").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#drama-page").hasClass("ui-page-active")) { //ISSUE
            var str = newWindow.location.search;
            str = str.substr(str.indexOf("http"));
            str = str.substr(0, str.indexOf("&"));
            str = unescape(str);
            newWindow.location.href = str;
        } else if (newWindow.$("#battle-page").hasClass("ui-page-active")) {
            newWindow.$("#node-7").trigger("click");
        } else if (newWindow.$("#gacha-list-page").hasClass("ui-page-active")) {
            newWindow.open(curURL, "_self")
        } else if (newWindow.$("#stage-page").hasClass("ui-page-active")) {
            //console.log('SOME WEIRD STATE');
            newWindow.$("#do-adventure").trigger("click");
        }
        setTimeout(init, heartBeat);
    }else{
        setTimeout(init, heartBeat);
    }
}

function start(){
    setTimeout(init, 2000);
}

start();
