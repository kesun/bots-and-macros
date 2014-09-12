var newWindow;
var staticMaga = "http://zc2.ayakashi.zynga.com/app.php?_c=parts&action=list";
var staticGhostIndex = staticMagaID - 64 - 1; // this formula only works for the first half of the ghosts
var curItem;

// ---------------------- Editable Starts ----------------------
// -------------------------------------------------------------
var maxDS = 30; // defence spirit cap of the target
var targetType = 0; // 0 for stock maga, 1 for event maga

// For event (only matters if targetType == 1)
var eventID = 63 // event ID

// For static maga (only matters if targetType == 0)
var staticMagaID = 68; // 66 = kaguya, 68 = hare
var staticMagaTargetState = 0; // 0 if for auto complete maga set, 1 for repeating on the same stone
var staticMagaTarget = 5; // 1~6, indicate the target stone colour (only matters if staticMagaTargetState == 1)
// -------------------------------------------------------------
// ----------------------- Editable Ends -----------------------

function openBattle(item, player){
    console.log('openBattle');
    var addr;
    var battleWindow;
    if(targetType == 0){
        if(staticMagaTargetState == 0){
            addr = "http://zc2.ayakashi.zynga.com/app.php?_c=battle&action=exec_battle&target_user_id=" + player + "&target_parts_id=" + staticMagaID + item + "&from_battle_tab=&ref=undefined";
        }else{
            addr = "http://zc2.ayakashi.zynga.com/app.php?_c=battle&action=exec_battle&target_user_id=" + player + "&target_parts_id=" + staticMagaID + staticMagaTarget + "&from_battle_tab=&ref=undefined";
        }
    }else{
        addr = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=exec_battle&target_user_id=" + player + "&target_item_id=" + staticMagaID + item + "&evid=" + eventID;
    }
    battleWindow = window.open(addr, "_blank", "width=400, height=500");
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
                //openBattle(curItem, zid);
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

function getMaga(){
    if(newWindow.document.readyState == 'complete' && newWindow.document.getElementsByTagName('body')[0].innerHTML != "" && newWindow.$('.parts').length > 0){
        console.log('Getting a maga!');
        setTimeout(init, 1000);
    }else{
        setTimeout(getMaga, 1000);
    }
}

function openNewWindow(){
    console.log('openNewWindow');
    if(newWindow.document.readyState == 'complete' && newWindow.document.getElementsByTagName('body')[0].innerHTML != "" && newWindow.$('.parts').length > 0){
        var stoneList;
        if(targetType == 0){
            var claim = newWindow.$('.parts-list')[staticGhostIndex].getElementsByTagName('input')[3];
            if(claim == undefined){
                claim = newWindow.$('.parts-list')[staticGhostIndex].getElementsByTagName('button')[0];
            }
            console.log(newWindow.$('.parts-list')[staticGhostIndex]);
            if(!$(claim).hasClass('disabled')){
                $(claim).click();
                getMaga();
            }
            stoneList = newWindow.$('.parts-selector')[staticGhostIndex].getElementsByClassName('parts');
        }else{
            stoneList = newWindow.$('.parts');
        }
        var index = 0;
        while(stoneList[index].getElementsByTagName('span')[0].getAttribute('style') != ""){
            console.log(stoneList[index].getElementsByTagName('span')[0].getAttribute('style'));
            index++;
        }
        curItem = index + 1;
        var stoneURL;
        if(targetType == 0){
            if(staticMagaTargetState == 0)
                stoneURL = "http://zc2.ayakashi.zynga.com/app.php?target_parts_id=" + staticMagaID + curItem + "&from_where=stone&_c=battle&action=battle_list&tutorial_step=41";
            else{
                stoneURL = "http://zc2.ayakashi.zynga.com/app.php?target_parts_id=" + staticMagaID + staticMagaTarget + "&from_where=stone&_c=battle&action=battle_list&tutorial_step=41"
            }
        }else{
            stoneURL = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=battle_list&evid=" + eventID + "&target_item_id=" + curItem;

        }
        newWindow.open(stoneURL, "_self");
        console.log('going to getPlayerList');
        crawl();
    }else{
        setTimeout(openNewWindow, 1000);
    }
}

function init() {
    console.log('init');
    if(targetType == 0){
        newWindow.open(staticMaga, "_self");
    }else{
        var summaryURL = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=parts_list&evid=" + eventID;
        newWindow.open(summaryURL, "_self");
    }
    console.log('going to openNewWindow');
    openNewWindow();
}

newWindow = window.open("", "_blank", "width=400, height=500");
init();
