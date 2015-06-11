
window.onload = function WindowLoad(event) {
	Query_Test4()
	//setInterval(function() { Query_Test2(); }, 3000); //REPEAT THE FUNCTION
}

function Query_Test(){
	$(document).ready(function(){
	    $("p").click(function(){
	        //$(this).hide(); //HIDE THE P ELEMENT
	        //$(this).fadeOut(); //FADE THE P ELEMENT OUT
	        //$(this).fadeOut("slow"); //SLOWLY FADE THE P ELEMENT (CAN ALSO USE NUMBER OF FRAMES)
	    	//$(this).addClass("blue"); //ADD A CSS CLASS TO THE P ELEMENT
	    	//$(this).addClass("important"); //ADD A CSS CLASS TO THE P ELEMENT
	    	//$(this).animate({fontSize: '3em'}, "slow"); //INCREASE THE FONT SIZE VIA ANIMATION
	    	//$(this).fadeOut("slow").delay(3000).fadeIn("slow"); //STRING FUNCTIONS TOGETHER, FADE OUT + PAUSE + FADE IN
	    });
	});	
}

function Query_Test2(){
	$(document).ready(function(){
	    //$("p").fadeOut("slow").delay(3000).fadeIn("slow");
	});	
}

function Query_Test3(){
	$(document).ready(function(){
		$("#div1").click(function(){
	    	//$(this).width(400); //SET THE WIDTH OF A DIV
			//$(this).animate({width: '400'}); //ANIMATE THE WIDTH CHANGE OF THE DIV
		});
	});	
}

function Query_Test4(){
	$(document).ready(function(){
		$("#div1").click(function(){
			//$(this).load("demo_test.txt"); //LOAD A FILE WITHOUT REFRESHING THE PAGE (ONLY WORKS ON SERVER)
		});
	});	
}