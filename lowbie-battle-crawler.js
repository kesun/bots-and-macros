var newWindow;
var maxDS = 30; // EDIT THIS ACCORDING TO NEEDS
var eventID = 63 // EDIT THIS ACCORDING TO NEEDS
var curItem;

function openBattle(item, player){

    console.log('openBattle');
    var addr = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=exec_battle&target_user_id=" + player + "&target_item_id=" + item + "&evid=" + eventID;
    var battleWindow = window.open(addr, "_blank", "width=400, height=500");
    checkFight(battleWindow, 0);
}

function checkFight(battleWindow, state){
    if(state == 0){
        if(battleWindow.document.readyState == 'complete' && battleWindow.document.getElementsByTagName('body')[0].innerHTML != ""){
            if(battleWindow.$('#empty-energy-page').length > 0){
                // deal with empty energy
                console.log('empty energy');
            }else if(battleWindow.$("#battle-page").length > 0){
                // BATTLEZ!
                console.log('WIN!');
                setTimeout(function(){checkFight(battleWindow, 1)}, 100);
            }else if(battleWindow.$("#parts-pvp-battle-no-item").length > 0){
                // stone is already gone
                console.log('stone is gone...');
                setTimeout(function(){checkFight(battleWindow, 1)}, 100);
            }
        }else{
            setTimeout(function(){checkFight(battleWindow, 0)}, 500);
        }
    }else{ // done
        battleWindow.close();
        battleWindow = undefined;
        setTimeout(init, 300);
    }
    
}

function crawl(){
    console.log('');
    if(newWindow.document.readyState == 'complete' && !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading') && newWindow.$('.defense-kiai').length > 0){
        var playerList = newWindow.$('#opponents-list').find('li');
        var i = 0;
        for(i = 0; i < playerList.length; i++){
            var player = $(playerList[i]);
            var def = $(player.find('dl').children()[3]).text();
            if(def <= maxDS){
                var zid = player.find('a').attr('href').split('&')[2].split('=')[1]
                openBattle(curItem, zid);
                break;
            }
        }
        if(i == playerList.length){
            newWindow.$('#update-battle-list').click();
            setTimeout(crawl, 500);
        }
    }else{
        setTimeout(crawl, 500);
    }
}

function openNewWindow(){
    console.log('openNewWindow');
    if(newWindow.document.readyState == 'complete' && newWindow.document.getElementsByTagName('body')[0].innerHTML != "" && newWindow.$('.parts').length > 0){
        var stoneList = newWindow.$('.parts');
        var index = 0;
        while(stoneList[index].getElementsByTagName('span')[0].getAttribute('style') != null){
            index++;
        }
        curItem = index + 1;
        var stoneURL = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=battle_list&evid=" + eventID + "&target_item_id=" + curItem;
        newWindow.open(stoneURL, "_self");
        console.log('going to getPlayerList');
        crawl();
    }else{
        setTimeout(openNewWindow, 1000);
    }
}

function init() {
    console.log('init');
    var summaryURL = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=parts_list&evid=" + eventID;
    newWindow.open(summaryURL, "_self");
    console.log('going to openNewWindow');
    openNewWindow();
}

newWindow = window.open("", "_blank", "width=400, height=500");
init();
