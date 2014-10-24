var current = 0;
var max = 30;
var continueClick = true;
var curURL = document.URL;
var newWindow = window.open(curURL, "_blank", "width=50, height=50");
var heartBeat = 1000;
var autoRefill = 1;
var refillCount = 0;
var maxRefill = 5;

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
            heartBeat = 3000;
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
            heartBeat = 1000;
        } else if (newWindow.$("#gacha-list-page").hasClass("ui-page-active") ||
                newWindow.$("#event-promotion-page").hasClass("ui-page-active") ||
                newWindow.$("#item-use-page").hasClass("ui-page-active")) {
            newWindow.open(curURL, "_self")
            heartBeat = 3000;
        } else if (newWindow.$("#stage-page").hasClass("ui-page-active")) {
            //console.log('SOME WEIRD STATE');
            heartBeat = 1000;
            newWindow.$("#do-adventure").trigger("click");
        } else if (newWindow.$("#empty-energy-page").hasClass("ui-page-active")) {
            if(autoRefill == 1 && refillCount < maxRefill){
                newWindow.open("http://zc2.ayakashi.zynga.com/app.php?_c=item&action=use&item_id=4", "_self");
                refillCount++;
                heartBeat = 5000;
            }else{
                continueClick = false;
                console.log("OUT OF ENERGY");
            }
        }
        if(continueClick){
            setTimeout(init, heartBeat);
        }
    }else{
        setTimeout(init, heartBeat);
    }
}

function start(){
    setTimeout(init, 2000);
}

start();
