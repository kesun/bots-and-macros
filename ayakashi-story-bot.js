var current = 0;
var max = 30;
var continueClick = true;
var curURL = document.URL;
<<<<<<< HEAD
var newWindow = window.open(curURL, "_blank", "width=400, height=500");
=======
var newWindow = window.open(curURL, "_blank", "width=350, height=500");
>>>>>>> 278f8b7b0b46746fe40e5761071f5c57aaccc8d2
var delay = 1000;

function init() {
    delay = 1000;
    console.log('tick');
    if(newWindow.document.readyState == 'complete'){
        if (newWindow.$("#card-acquisition-page").hasClass("ui-page-active")) {
            newWindow.history.back();
        } else if (newWindow.$("#pvp-event-encounter-page").hasClass("ui-page-active")) {
            newWindow.location.href = curURL;
        } else if (newWindow.$("#parts-complete-page").hasClass("ui-page-active")) {
            newWindow.history.back();
        } else if (newWindow.$("#npc-battle-confirm-page").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
<<<<<<< HEAD
        } else if (newWindow.$("#won").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            //$link[0].click();
        } else if (newWindow.$("#negotiation-failed-page").hasClass("ui-page-active")) {
            newWindow.location.href = curURL;
        } else if (newWindow.$("#negotiation-page").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#drama-page").hasClass("ui-page-active")) {
            newWindow.location.href = "http://zc2.ayakashi.zynga.com/app.php?hid=last&encounter_battle_mode=1&_c=npc_battle&action=battle_scene";
=======
        } else if (newWindow.$("#won").hasClass("ui-page-active")) { //ISSUE
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#negotiation-failed-page").hasClass("ui-page-active")) {
            newWindow.location.href = curURL;
        } else if (newWindow.$("#negotiation-page").hasClass("ui-page-active")) {
            $link = newWindow.$('a:first');
            $link[0].click();
        } else if (newWindow.$("#drama-page").hasClass("ui-page-active")) { //ISSUE
            var str = newWindow.location.search;
            str = str.substr(str.indexOf("http"));
            str = str.substr(0, str.indexOf("&"));
            str = unescape(str);
            newWindow.location.href = str;
>>>>>>> 278f8b7b0b46746fe40e5761071f5c57aaccc8d2
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
<<<<<<< HEAD
=======
                console.log('if loading');
>>>>>>> 278f8b7b0b46746fe40e5761071f5c57aaccc8d2
                if (current < max) {
                    newWindow.$("#do-adventure").trigger("click");
                } else {
                    continueClick = false;
                }
            } else {
            }
        }
    }
<<<<<<< HEAD
    setTimeout(init, delay);
}

function start(){
    setTimeout(init, 2000);
}

start();
=======

    setTimeout(init, delay);
}

function start(){
    setTimeout(init, 2000);
}

start();
>>>>>>> 278f8b7b0b46746fe40e5761071f5c57aaccc8d2
