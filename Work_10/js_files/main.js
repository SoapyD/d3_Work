

window.onload = function WindowLoad(event) {
	//AmendElements()
	//BindData()
	Data_to_SVG()
}



function AmendElements(){
	d3.select("body").append("p_inner")
	d3.select("p_inner").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");
	
	d3.select("body").append("p_inner1")
	d3.select("p_inner1").append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");

	//d3.select("p_inner1").select("circle").style("fill","red")	
	d3.select("body").selectAll("circle").style("fill","red")
}


function BindData(){
	//THIS PRODUCES 4 HTML ELEMENTS, EACH CONTAINING THE WORD "HELLO"
	var theData = [1,2,3]
	var p = d3.select("body").selectAll("p")
		.data(theData)
		.enter()
		.append("p")
		//.append("svg").attr("width", 50).attr("height", 50).append("circle").attr("cx", 25).attr("cy", 25).attr("r", 25).style("fill", "purple");
		//.text("Hello ");	
		.text( function (d, i) {
			return "i = " + i + " d = "+d;
		})
		console.log(d3.selectAll("p"))
		//d3.select("body").selectAll("circle").style("fill","red")
}


function Data_to_SVG(){

	var circleRadii = [40,20,10];

	var bodySelection = d3.select("body");
	var svgSelection = bodySelection.append("svg")
							.attr("width", 150)
							.attr("height", 150)

	//var p = bodySelection.selectAll("p")
	//	.data(circleRadii)
	//	.enter()
	//	.append("p")
	//	console.log(d3.selectAll("p"))

	//var circleSelection = svgSelection.append("circle")
	//						.attr("cx", 25)
	//						.attr("cy", 25)
	//						.attr("r", 25)
	//						.style("fill", "purple")


	var p = svgSelection.selectAll("circle")
		.data(circleRadii)
		.enter()
		.append("circle")
		.attr("cx", 75)
		.attr("cy", 75)
		.attr("r", function(d){
			return d
		})
		.style("fill", function(d){
			var returnColour;
			if (d=== 40){ returnColour = "green";
			} else if (d === 20) {returnColour = "purple";
			} else if (d === 10) {returnColour = "red";}
			return returnColour
		})
		console.log(d3.selectAll("circle"))
	
}



