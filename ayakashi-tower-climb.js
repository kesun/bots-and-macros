// Tower Climbing
var eventID = 67;

var teamInfo = {
    101431: [10472, 10415, 10495, 10416, 10493],
    101432: [10492, 10472, 10181, 17306, 10495],
    101433: [16453, 17579, 17198, 10046, 10495],
    101434: [10181, 10472, 11290, 17225, 17306],
    //101432: [],
    //101433: [],
    //101434: [],
    101435: [],
    111431: [],
    111433: [],
    111434: [],
    111435: [],
    111436: [],
    1014232: [17306, 10415, 10495, 10416, 10493]
};
// 613064 = dora
var battleInfo = {
    101431: 613050,
    101432: 613052, // 53 = win drama
    101433: 613056,
    101434: 613054
};

var staticAdventure = "http://zc2.ayakashi.zynga.com/app.php?_c=extra_quest_event_adventure&evid=";
var staticMonster = "http://zc2.ayakashi.zynga.com/app.php?_c=monster&action=details&inventory_monster_id=";
var staticMonsterList = "http://zc2.ayakashi.zynga.com/app.php?_c=monster&action=list";
var staticBattle1 = "http://zc2.ayakashi.zynga.com/app.php?target_user_id=";
var staticBattle2 = "&evid=" + eventID + "&encounter_battle_mode=1&_c=extra_quest_event_npc_battle&action=exec_battle";
var staticNegotiation = "http://zc2.ayakashi.zynga.com/app.php?encounter_battle_mode=1&evid=" + eventID + "&_c=extra_quest_event_negotiation&action=found";

var newWindow;
var floorNum = 0;
var battleID;
var dramaID;

var adventureURL = staticAdventure + eventID;

function negotiation() {
    console.log('negotiation');
    if(newWindow.document.readyState == 'complete' &&
        newWindow.document.getElementsByTagName('body')[0].innerHTML != "" &&
        !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading') &&
        newWindow.$('#negotiation-page').length > 0) {
        console.log(parseInt(battleID));
        switch(parseInt(battleID)) {
            case 101431:
            case 101432:
            case 101433:
            case 101434:
                var cancelURL = "http://zc2.ayakashi.zynga.com/app.php?_c=extra_quest_event_negotiation&action=resign&evid=" + eventID;
                newWindow.open(cancelURL, '_self'); /////////////////////////////////////////////////////
                break;
        }
        setTimeout(init, 2000);
    }else{
        setTimeout(negotiation, 1000);
    }
}

function checkBattle(state) { // state 0 = during battle, state 1 = after battle, state 2 = win, state 3 = lose
    console.log('checkBattle');
    if(newWindow.document.readyState == 'complete' &&
        newWindow.document.getElementsByTagName('body')[0].innerHTML != "" &&
        !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')) {
        if(state == 0) {
            if($('#battle-page').hasClass('ui-page-active')){
                setTimeout(function(){
                    newWindow.$('.layer').trigger('click'); ////////////////////////////////////////////////////
                    setTimeout(function(){checkBattle(1);}, 1000);
                }, 1000); 
            }else{
                setTimeout(function(){checkBattle(0);}, 1000);
            }
        }else if(state == 1) {
            if(newWindow.$('.results').hasClass('ui-page-active')){
                if(newWindow.$('#extraquest-event-won-page').hasClass('ui-page-active')){
                    setTimeout(function(){checkBattle(2);}, 1000);
                }else{
                    setTimeout(function(){checkBattle(3);}, 1000);
                }
            }else{
                setTimeout(function(){checkBattle(1);}, 1000);
            }
        }else if(state == 2){
            console.log('won!');
            newWindow.open(staticNegotiation, '_self');
            negotiation();
        }else if(state == 3){
            console.log('lost!');
            setTimeout(init, 500);
        }
        
    }else{
        setTimeout(function(){checkBattle(state);}, 1000);
    }
}

function checkDrama() {
    console.log('checkDrama');
    if(newWindow.document.readyState == 'complete' &&
        newWindow.document.getElementsByTagName('body')[0].innerHTML != "" &&
        !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')) {

        if(battleInfo[battleID] == $(newWindow.$('.button')[0]).attr('href').split('&')[0].split('=')[1]){
            newWindow.open(staticBattle1 + battleID + staticBattle2, '_self');
            checkBattle(0);
        }

    }else{
        setTimeout(checkDrama, 1000);
    }
}

function wipeTeam(teamWindow, state, members){ // state 0 = init loading; state 1 = wiping; state 2 = close
    if(teamWindow.document.readyState == 'complete' &&
        teamWindow.document.getElementsByTagName('body')[0].innerHTML != "" &&
        !$(teamWindow.document.getElementsByTagName('html')).hasClass('ui-loading')) {

        if(state == 0){
            $(teamWindow.$('.offense')[0]).click();
            wipeTeam(teamWindow, 1, members);
        }else if(state == 1){
            if(teamWindow.$('.reset-monster').length > 0){
                $(teamWindow.$('.reset-monster')[1]).click();
                wipeTeam(teamWindow, 2, members);
            }else{
                setTimeout(function(){
                    wipeTeam(teamWindow, state, members);
                }, 1000);
            }
            
        }else if(state == 2){
            teamWindow.close();
            updateTeam(members, 1, 0);
        }
    }else{
        setTimeout(function(){
            wipeTeam(teamWindow, state, members);
        }, 1000);
    }
}

function addMember(memberWindow, members, index){
    if(memberWindow.document.readyState == 'complete' &&
        memberWindow.document.getElementsByTagName('body')[0].innerHTML != "" &&
        !$(memberWindow.document.getElementsByTagName('html')).hasClass('ui-loading')) {

        switch(index) {
            case 0:
                memberWindow.$('.change-leader').click();
                break;
            case 1:
            case 2:
            case 3:
            case 4:
                memberWindow.$('.to-offense').click();
                break;
        }
        setTimeout(function(){
            memberWindow.close();
            updateTeam(members, 1, index + 1);
        }, 1000);
    }else{
        setTimeout(function(){
            addMember(memberWindow, members, index);
        }, 1000);
    }
}

function updateTeam(members, state, index){ // state 0 = wipe team, state 1 = add members, state 2 = done
    if(members == ""){
        setTimeout(init, 500);
    }else{
       if(state == 0){ // WIPE TEAM
            var tempWindow = window.open(staticMonsterList, "_blank", "width=10, height=10");
            wipeTeam(tempWindow, 0, members);
        }else if(state == 1){ // ADD MEMBERS
            if(index < 5){
                var monsterURL = staticMonster + members[index];
                var tempWindow = window.open(monsterURL, "_blank", "width=10, height=10");
                addMember(tempWindow, members, index);
            }else{
                updateTeam(members, 2, 0);
            }
        }else if(state == 2){ // TO BATTLE
            console.log('TO BATTLE!');
            checkDrama();
        } 
    }
    
}

function climb(){
    console.log('climb');
    if(newWindow.document.readyState == 'complete' &&
        newWindow.document.getElementsByTagName('body')[0].innerHTML != "" &&
        !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')) {

        if(newWindow.$('#card-acquisition-page').hasClass('ui-page-active') ||
            newWindow.$('#event-point-acquisition-page').hasClass('ui-page-active') ||
            newWindow.$('#treasure-acquisition-page').hasClass('ui-page-active')){
            newWindow.history.back();
            setTimeout(climb, 1000);
        }else if(newWindow.$('#stage-page').hasClass('ui-page-active')){
            floorNum = newWindow.$('#stage-name')[0].innerHTML.split("F")[0];
            newWindow.$('#do-adventure').click();
            setTimeout(climb, 1000);
        }else if(newWindow.$('#npc-battle-confirm-page').hasClass('ui-page-active')){
            battleID = newWindow.location.href.split('&')[0].split('=')[1];
            console.log('ghost encountered: ', battleID);
            updateTeam(teamInfo[battleID], 0, 0);
        }
    }else{
        setTimeout(climb, 1000);
    }
}

function init() {
    if(newWindow.document.readyState == 'complete' &&
        !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')) {
        newWindow.open(adventureURL, "_self");
        setTimeout(climb, 1000);
    }else{
        setTimeout(init, 1000);
    }
}

newWindow = window.open("", "_blank", "width=10, height=10");
init();
