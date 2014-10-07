// ---------------------- Editable Starts ----------------------
// -------------------------------------------------------------
var reloadTime = 14 // when the game is slow, increase this number as needed. Time in sec = reloadTime / 2.
var maxDS = 30; // defence spirit cap of the target
var targetType = 0; // 0 for stock maga, 1 for event maga

// For event (only matters if targetType == 1)
var eventID = 67 // event ID

// For static maga (only matters if targetType == 0)
var staticMagaID = 1438; // 66 = kaguya, 68 = hare
var staticMagaTargetState = 0; // 0 if for auto complete maga set, 1 for repeating on the same stone
var staticMagaTarget = 5; // 1~6, indicate the target stone colour (only matters if staticMagaTargetState == 1)
// -------------------------------------------------------------
// ----------------------- Editable Ends -----------------------

var staticURLBase = "http://zc2.ayakashi.zynga.com/app.php?";
var staticMaga = staticURLBase + "_c=parts&action=list";
var staticNormalBattle = staticURLBase + "_c=battle&action=exec_battle";
var staticEventBattle = staticURLBase + "_c=parts_pvp_event&action=exec_battle";
var staticEventStone = staticURLBase + "_c=parts_pvp_event&action=battle_list";
var staticEventEntry = staticURLBase + "_c=parts_pvp_event&action=entry";
//var staticGhostIndex = staticMagaID - 64 - 1; // this formula only works for the first half of the ghosts
var staticGhostIndex = 0;

var newWindow;
var curItem;

function openBattle(item, player){
    var addr;
    var battleWindow;
    if(targetType == 0){
        if(staticMagaTargetState == 0){
            addr = staticNormalBattle + "&target_user_id=" + player + "&target_parts_id=" + staticMagaID + item + "&from_battle_tab=&ref=undefined";
        }else{
            addr = staticNormalBattle + "&target_user_id=" + player + "&target_parts_id=" + staticMagaID + staticMagaTarget + "&from_battle_tab=&ref=undefined";
        }
    }else{
        addr = staticEventBattle + "&target_user_id=" + player + "&target_item_id=" + item + "&evid=" + eventID;
    }
    battleWindow = window.open(addr, "_blank", "width=10, height=10");
    checkFight(battleWindow, 0);
}

function checkFight(battleWindow, state){
    if(state == 0){
        if(battleWindow.document.readyState == 'complete' && battleWindow.document.getElementsByTagName('body')[0].innerHTML != ""){
            if(battleWindow.$('.alert').length > 0){
                // alert page occurs
                setTimeout(function(){checkFight(battleWindow, 1)}, 500);
            }else if(battleWindow.$('#empty-energy-page').length > 0){
                // deal with empty energy
                var drink = battleWindow.$('.guts-recovery').attr("href");
                battleWindow.open(drink, "_self");
                setTimeout(function(){checkFight(battleWindow, 1)}, 1000);
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

function crawl(counter){
    if(newWindow.document.readyState == 'complete' && !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading') && newWindow.$('.defense-kiai').length > 0){
        var urlSplit = newWindow.location.href.split("&");
        if(urlSplit.length >= 2 && (urlSplit[1] == "action=battle_list" || urlSplit[3] == "action=battle_list")){
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
                setTimeout(function(){crawl(0)}, 500);
            }
        }else{
            setTimeout(init, 1000);
        }
        
    }else{
        var count = 0;
        if(counter == reloadTime){
            newWindow.location.reload(true);
        }else{
            count = counter + 1;
        }
        setTimeout(function(){crawl(count)}, 500);
    }
}

function getMaga(){
    if(newWindow.document.readyState == 'complete' && $('#parts-reward-accept-page').hasClass('ui-page-active')){
        console.log('got a maga!');
        setTimeout(init, 1000);
    }else{
        setTimeout(getMaga, 1000);
    }
}

function openNewWindow(state, stoneList){
    if(newWindow.document.readyState == 'complete' && newWindow.document.getElementsByTagName('body')[0].innerHTML != "" && newWindow.$('.parts').length > 0){
        if (state == 0){
            if(targetType == 0){
                console.log("staticGhostIndex", staticGhostIndex);
                var claim = newWindow.$('.parts-list')[staticGhostIndex].getElementsByTagName('input')[3];
                if(newWindow.$('.accept-reward').length > 0){
                    console.log(newWindow.$('.accept-reward'));
                    $(newWindow.$('.accept-reward')[0].getElementsByClassName('button')).trigger('click');
                    getMaga();
                }else{
                    openNewWindow(1, newWindow.$('.parts-selector')[staticGhostIndex].getElementsByClassName('parts'));   
                }
            }else{
                openNewWindow(1, newWindow.$('.parts'));
            }
        }else{
            var index = 0;
            //console.log(stoneList[index].getElementsByTagName('span')[0].getAttribute('style') == null);
            while(stoneList[index].getElementsByTagName('span')[0].getAttribute('style') != ""){
                index++;
            }
            console.log('index', index);
            curItem = index + 1;
            var stoneURL;
            if(targetType == 0){
                if(staticMagaTargetState == 0)
                    stoneURL = staticURLBase + "target_parts_id=" + staticMagaID + curItem + "&from_where=stone&_c=battle&action=battle_list&tutorial_step=41";
                else{
                    stoneURL = staticURLBase + "target_parts_id=" + staticMagaID + staticMagaTarget + "&from_where=stone&_c=battle&action=battle_list&tutorial_step=41"
                }
            }else{
                stoneURL = staticEventStone + "&evid=" + eventID + "&target_item_id=" + curItem;

            }
            newWindow.open(stoneURL, "_self");
            crawl(0);
        }
    }else{
        setTimeout(function(){openNewWindow(state, stoneList)}, 1000);
    }
}

function init() {
    if(targetType == 0){
        newWindow.open(staticMaga, "_self");
    }else{
        // var summaryURL = "http://zc2.ayakashi.zynga.com/app.php?_c=parts_pvp_event&action=parts_list&evid=" + eventID;
        var summaryURL = staticEventEntry + "&evid=66";
        newWindow.open(summaryURL, "_self");
    }
    openNewWindow(0, null);
}

newWindow = window.open("", "_blank", "width=10, height=10");
init();
