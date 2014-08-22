var newWindow;
var wins = 0;
var maxDS = 30; // EDIT THIS ACCORDING TO NEEDS
var desiredWins = 2; // EDIT THIS ACCORDING TO NEEDS

function crawl(playerList){
	if(document.readyState == 'complete' && !$(document.getElementsByTagName('html')).hasClass('ui-loading')){
		var i = 0;
		for(i = 0; i < playerList.length; i++){
			var def = $($(playerList[i]).find('dl').children()[3]).text();
			if(def <= maxDS){
				openBattle(i);
				break;
			}
		}
		if(i == playerList.length){
			setTimeout(init, 100);
		}
	}else{
		setTimeout(function(){crawl(playerList)}, 1000);
	}
}

function openBattle(index){
	console.log('openBattle');
	var addr = "http://zc2.ayakashi.zynga.com" + $($('#opponents-list').find('li')[index]).find('a').attr('href');
	newWindow = window.open(addr, "_blank", "width=400, height=500");
	fight(0);
}

function fight(state){
	console.log('fight');
	if(state == 0){
		if(newWindow.document.readyState == 'complete' && !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')){
			if(newWindow.document.getElementsByTagName('body')[0].childElementCount > 0){
				if(newWindow.$("#battle-confirm").hasClass('ui-page-active')){
					var addr = newWindow.$('#battle-button-panel').find('a').attr('href');
					console.log('FIGHT: ', addr);
					var battleWindow = window.open(addr, "_blank", "width=500, height=500");
					checkFight(battleWindow, 0);
					setTimeout(function(){fight(1)}, 500);
				}else{
					newWindow.close();
					newWindow = undefined;
					setTimeout(init, 300);
				}
			}else{
				setTimeout(function(){fight(0)}, 1000);
			}
		}else{
			setTimeout(function(){fight(0)}, 1000);
		}
	}else{ // done
		newWindow.close();
		newWindow = undefined;
	}
}

function checkFight(battleWindow, state){
	if(state == 0){
		console.log(battleWindow.document);
		battleWindow.document;
		if(battleWindow.document.readyState == 'complete' && battleWindow.document.getElementsByTagName('body')[0].innerHTML != ""){
			if(battleWindow.$('#empty-energy-page').length > 0){
				// deal with empty energy
				console.log('empty energy');
			}else if(battleWindow.$("#battle-page").length > 0){
				// BATTLEZ!
				console.log('WIN!');
				wins++;
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

function getPlayerList(){
	console.log('getPlayerList');
	if(!$(document.getElementsByTagName('html')).hasClass('ui-loading')){
		crawl($('#opponents-list').find('li'));
	}else{
		setTimeout(getPlayerList, 500);
	}
}

function init() {
	if(wins < desiredWins){
	    if(document.readyState == 'complete' && !$(document.getElementsByTagName('html')).hasClass('ui-loading')){
	        $('#update-battle-list').click();
	        setTimeout(getPlayerList, 500);
	    }else{
	    	setTimeout(init, 1000);
	    }
	}else{
		console.log("SUMMARY: " + wins + " stones in the bag.");
	}
    
}

init();
