

window.onload = function WindowLoad(event) {
	//AmendElements()
	//BindData()
	//Data_to_SVG()
	Print_Test()
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
							.style("border","1px solid black")

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

function Print_Test(){

	var jsonCircles = [
		{ "x_axis": 30, "y_axis": 30, "width": 40, "height": 20, "pulse": 500, "color" : "green"},
		{ "x_axis": 110, "y_axis": 100, "width": 20, "height": 20, "pulse": 1500, "color" : "red"}];

	var jsonLinks = [
		{"source":0,"target":1}];

		//CREATE THE CANVAS
	var bodySelection = d3.select("body");
	var svgSelection = bodySelection.append("svg")
							.attr("width", 500)
							.attr("height", 500)
							.style("border","1px solid black")


	var p = svgSelection.selectAll("rect")
		.data(jsonCircles)
		.enter()
		.append("rect")
		.attr("x", function(d){
			return d.x_axis
		})
		.attr("y", function(d){
			return d.y_axis
		})
		.attr("width", function(d){
			return d.width
		})
		.attr("height", function(d){
			return d.height
		})
		.style("fill", function(d){
			return d.color
		})

	var link = svgSelection.selectAll("line")
	    .data(jsonLinks)
	    .enter()
	    .append("line")
	   	.style("stroke-width", 10)
	    .style("stroke", 1)
	    .attr("x1", function(d){
	    	var val = jsonCircles[d.source].x_axis + jsonCircles[d.source].width / 2
	    	return val;
	    })
	    .attr("y1", function(d){
	    	var val = jsonCircles[d.source].y_axis + jsonCircles[d.source].height / 2
	    	return val;
	    })
	    .attr("x2", function(d){
	    	var val = jsonCircles[d.target].x_axis + jsonCircles[d.target].width / 2
	    	return val;
	    })
	    .attr("y2", function(d){
	    	var val = jsonCircles[d.target].y_axis + jsonCircles[d.target].height / 2
	    	return val;
	    })


	svgSelection
	    .on("click", function() {
	        //alert("CLEEEK")
	        var rects = svgSelection.selectAll("rect")
	        .data(jsonCircles)

	        Inflate(rects)
	    });
}


function Inflate(objects){
	objects.transition()
	.duration(function(d){
		return d.pulse
	})
	.attr("width", 80)
	.attr("height", 40)
	.attr("x", function(d){
		var old_pos = d.x_axis + (d.width / 2)
		var new_offset = d.x_axis + (80 / 2)
		var diff = new_offset - old_pos
		var x = d.x_axis - diff
		return x
	})
	.attr("y", function(d){
		var old_pos = d.y_axis + (d.height / 2)
		var new_offset = d.y_axis + (40 / 2)
		var diff = new_offset - old_pos
		var y = d.y_axis - diff
		return y
	})
	.each("end", function(d, i){
		Deflate(objects)
	})
}

function Deflate(objects){
	objects.transition()
	.duration(function(d){
		return d.pulse
	})
	.attr("x", function(d){
		return d.x_axis
	})
	.attr("y", function(d){
		return d.y_axis
	})
	.attr("width", function(d){
		return d.width
	})
	.attr("height", function(d){
		return d.height
	})
	.each("end", function(d){
	    Inflate(objects)
		//console.log("inflating")
	})

}
