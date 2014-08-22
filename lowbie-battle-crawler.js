var newWindow;

function crawl(playerList){
	console.log('crawl');
	if(document.readyState == 'complete' && !$(document.getElementsByTagName('html')).hasClass('ui-loading')){
		for(var i = 0; i < playerList.length; i++){
			var def = $(playerList[i]).children()[3];
			if(def <= 30){
				openBattle(i);
			}
		}
		setTimeout(init, 100);
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
		if(newWindow.document.readyState == 'complete'){
			var addr = newWindow.$('#battle-button-panel').find('a').attr('href');
			console.log('FIGHT: ', addr);
			alert('I FOUND ONE MOFO!');
			//newWindow.open(addr);
			setTimeout(function(){fight(1)}, 2000);
		}else{
			setTimeout(function(){fight(0)}, 1000);
		}
	}else{
		newWindow.close();
		newWindow = undefined;
		setTimeout(init, 500);
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
    console.log('init');
    if(document.readyState == 'complete' && !$(document.getElementsByTagName('html')).hasClass('ui-loading')){
        $('#update-battle-list').click();
        setTimeout(getPlayerList, 500);
    }else{
    	setTimeout(init, 1000);
    }
}

init();
