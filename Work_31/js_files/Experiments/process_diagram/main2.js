

window.onload = function WindowLoad(event) {
	App_Info()
	Print_Test()
}

function App_Info()
{
	this.canvas;
	this.jsonData;
}


function Print_Test(){

	var jsonCircles = [
		{ "x_axis": 30, "y_axis": 30, "width": 40, "height": 20, "pulse": 500, "color" : "green", "load" : 100, "id" : 0, "end" : 1},
		{ "x_axis": 110, "y_axis": 100, "width": 20, "height": 20, "pulse": 1500, "color" : "red", "load" : 0, "id" : 1, "end" : 2},
		{ "x_axis": 110, "y_axis": 200, "width": 20, "height": 20, "pulse": 1000, "color" : "blue", "load" : 0, "id" : 2, "end" : -1}];

	var jsonLinks = [
		{"source":0,"target":1},
		{"source":1,"target":2}];

	App_Info.jsonData = jsonCircles

	//CREATE THE CANVAS
	var bodySelection = d3.select("body");
	App_Info.canvas = bodySelection.append("svg")
							.attr("width", 500)
							.attr("height", 500)
							.style("border","1px solid black")

	//CREATE THE LINK LINES
	var link = App_Info.canvas.selectAll("line")
	    .data(jsonLinks)
	    .enter()
	    .append("line")
	   	.style("stroke-width", 10)
	    .style("stroke", 1)
	    .attr("x1", function(d){
	    	var val = App_Info.jsonData[d.source].x_axis + App_Info.jsonData[d.source].width / 2
	    	return val;
	    })
	    .attr("y1", function(d){
	    	var val = App_Info.jsonData[d.source].y_axis + App_Info.jsonData[d.source].height / 2
	    	return val;
	    })
	    .attr("x2", function(d){
	    	var val = App_Info.jsonData[d.target].x_axis + App_Info.jsonData[d.target].width / 2
	    	return val;
	    })
	    .attr("y2", function(d){
	    	var val = App_Info.jsonData[d.target].y_axis + App_Info.jsonData[d.target].height / 2
	    	return val;
	    })


	//CREATE THE PROCESS RECTANGLES, POPULATING THEM EN MASSE WITH POS/SIZE/SHAPE/COLOUR DATA
	var p = App_Info.canvas.selectAll("rect")
		.data(App_Info.jsonData)
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


	App_Info.canvas
	    .on("click", function() {

	        var rects = App_Info.canvas.selectAll("rect")
			.each(function(d){
			    Inflate(this, d)
			})
	    });
}


function Inflate(object, data_info){

	if (data_info.load != 0){
		d3.select(object).transition()
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
		.each("end", function(d){
			CreateCircle(d)
			Deflate(this, d)
		})

	}
	//else {
	//	data_info.load = 100
	//	Inflate(object, data_info)
	//}

}

function Deflate(object, data_info){
	d3.select(object).transition()
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
	    Inflate(this, d)
	})

}

function CreateCircle(data_info){

	if (data_info.end != -1) {
		var circle = App_Info.canvas.append("circle")
			.attr("cx",data_info.x_axis + (data_info.width / 2))
			.attr("cy",data_info.y_axis+ (data_info.height / 2))
			.attr("r",5)
			.style("fill","yellow")
		
		var end_point = App_Info.jsonData[data_info.end]

		circle.transition()
			.duration(1500)
			.attr("cx", end_point.x_axis + (end_point.width / 2))
			.attr("cy", end_point.y_axis+ (end_point.height / 2))
			.each("end",function(){

				var saved_load = end_point.load

				end_point.load = 100
				//Inflate(object, end_point)
				var rects = App_Info.canvas.selectAll("rect")
				.each(function(d, i){

					if (end_point.id == i & saved_load == 0) {
						Inflate(this, d)
					}
				    
				})

			})
			.remove()
	}
}