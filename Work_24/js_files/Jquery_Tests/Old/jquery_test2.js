
window.onload = function WindowLoad(event) {
	Query_Test4()
	//setInterval(function() { Query_Test2(); }, 3000); //REPEAT THE FUNCTION
}

function Query_Test4(){
	$(document).ready(function(){
		$("#field_1").click(function(){
			//$(this).load("demo_test.txt"); //LOAD A FILE WITHOUT REFRESHING THE PAGE (ONLY WORKS ON SERVER)
			$(this).val("WORKING");
			//console.log("worked")
		});
	});	
}