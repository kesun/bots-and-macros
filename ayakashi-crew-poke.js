// Scroll all the way down till the last crew is visible in the browser
var crewList = $('.button-list');
var i = 0;
console.log(crewList.length);
function poke(){
	if(i < crewList.length){
		var button = $(crewList[i].getElementsByTagName('li')[0].getElementsByTagName('button')[0]);
		console.log('button: ', button);
		if(!button.hasClass('locked')){
			console.log('poke ' + i);
			button.click();
		}
		i++;
		setTimeout(poke, 1000);
	}
}
poke();
