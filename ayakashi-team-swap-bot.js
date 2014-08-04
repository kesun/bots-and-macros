var newWindow;
var counter = 0;
var buttonTemp;

function clearOrig(){

	if(!newWindow){
		newWindow = window.open('http://zc2.ayakashi.zynga.com/app.php?list_type=offense&set_priority=1&is_in_front=true&_c=monster&action=list&tutorial_step=42', '_blank', 'width=400, height=600');
		setTimeout(clearOrig, 1000);
	}else{
		console.log(counter);
	    if(!$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading') && newWindow.document.readyState == 'complete'){
    		$(newWindow.$('.down-priority')[1]).trigger('click');
	    	counter++;
	    	if(counter < 4){
	    		setTimeout(clearOrig, 1000);
	    	}
	    	else{
	    		setTimeout(function(){
	    			newWindow.close();
	    			newWindow = undefined;
	    			swap();
	    		}, 1500);
	    	}
	    }else{
	    	setTimeout(clearOrig, 1000);
	    }
	}

	/*
	console.log(counter);
	if(!newWindow){
		console.log('creating new window');
		newWindow = window.open('http://zc2.ayakashi.zynga.com/app.php?list_type=offense&set_priority=1&is_in_front=true&_c=monster&action=list&tutorial_step=42', '_blank', 'width=400, height=600');
		setTimeout(clearOrig, 1000);
	}else{
	    if(newWindow.document.readyState == 'complete' && !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')){
			console.log('here');
			$(newWindow.$('.reset-monster')[0]).trigger('click'); // Y U NO WORK
			console.log('there');
			setTimeout(function(){
				newWindow.close();
				newWindow = undefined;
				swap();
			}, 1000);
		}else{
			setTimeout(clearOrig, 1000);
		}
	}
	*/
}

function swap(){
	counter = 0;
	console.log('tick');
	var list = $('.monster-list').find('.mini');
	setTimeout(function(){
		swappie(list);
	}, 500);
}

function swappie(list){
	console.log('inside swappie');
	console.log(counter);
	if(counter < 5){
		if(!newWindow){
			console.log('creating new window');
			var url = 'http://zc2.ayakashi.zynga.com/' + $(list[counter]).attr('href');
			newWindow = window.open(url, '_blank', 'width=400, height=600');
			setTimeout(function(){
				swappie(list);
			}, 1000);
		}else{
		    if(newWindow.document.readyState == 'complete' && !$(newWindow.document.getElementsByTagName('html')).hasClass('ui-loading')){
		    	console.log('page finished loading');
				if(counter == 0){
					$(newWindow.$('.change-leader')[0]).trigger('click');
					console.log('clicked leader');
				}else{
					$(newWindow.$('.to-offense')[0]).trigger('click');
					console.log('clicked attack');
				}
	    		counter++;
	    		setTimeout(function(){
	    			newWindow.close();
	    			newWindow = undefined;
	    			swappie(list);
	    		}, 1500);
			}else{
				setTimeout(function(){
					swappie(list);
				}, 1000);
			}
		}
	}
}

clearOrig();