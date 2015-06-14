

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
	{"name":"programme creation","x_axis":100,"y_axis":150,"s_width":80,"s_height":40,"width":80,"height":40,"pulse":1000,"load":650,"output":500,"color":"red","id":0,"end":1},
	{"name":"contractor","x_axis":200,"y_axis":150,"s_width":80,"s_height":40,"width":80,"height":40,"pulse":200,"load":0,"output":1,"color":"orange","id":1,"end":2},
	{"name":"technical assistants","x_axis":300,"y_axis":150,"s_width":80,"s_height":40,"width":80,"height":40,"pulse":1500,"load":0,"output":0,"color":"red","id":2,"end":-1}
		];

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

	var group = App_Info.canvas.append("g")

	//CREATE THE LINK LINES
	var link = group.append("g").selectAll("line")
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
	var p = group.append("g").selectAll("rect")
		.data(App_Info.jsonData)
		.enter().append("g")

		p.append("rect") //THESE ARE THE PROCESS RECTANGLES
		.attr("x", function(d){
			arr = d.name.split(" ")
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

		p.append("text") //ADD TEXT TO THE PROCESSES
	    //.attr("x", function(d){return d.x_axis + (d.width / 2)})
	    //.attr("y", function(d){return d.y_axis+ (d.height / 2)})
	    .attr("type", "process")
	    //.style("text-anchor", "middle")
	    //.text(function(d) { 
	    //	var arr = d.name.split(" ");
	    //	console.log(arr)
	    //	return d.name; })
		.each(function(d){
			var arr = d.name.split(" ");
	        if (arr != undefined) {
	            for (i = 0; i < arr.length; i++) {
	                d3.select(this).append("tspan")
	                    .text(arr[i])
	                    .attr("dy", i ? "1.2em" : 0)
	                    .attr("x", function(d){return d.x_axis + (d.width / 2)})
	                    .attr("y", function(d){return d.y_axis+ (d.height / 2)})
	                    .attr("text-anchor", "middle")
	                    .attr("class", "tspan" + i);
	            }
	        }
		})

		p.append("rect") //THESE ARE THE NUMBERS RECTANGLES
		.attr("x", function(d){
			return d.x_axis
		})
		.attr("y", function(d){
			return d.y_axis - 50
		})
		.attr("width", function(d){
			return 40
		})
		.attr("height", function(d){
			return 40
		})
		.style("fill", function(d){
			return "white"
		})
		.style("stroke","black")
		.style("stroke-width",5)

		p.append("text") //ADD TEXT TO THE NODE GROUPS
	    .attr("x", function(d){return d.x_axis + 20})
	    .attr("y", function(d){return d.y_axis - 30})
	    .attr("type", "load")
	    .style("text-anchor", "middle")
	    .text(function(d) { 
	    	return d.load; })

	App_Info.canvas
	    .on("click", function() {

			var groups = App_Info.canvas.selectAll("g") //SELECT ALL GROUPS
			.each(function(d, i){ //LOOP THROUGH THOSE GROUPS

				var used_group = this

				if (d != undefined) { //IF GROUP DATA ISN'T UNDEFINED
					if (d.id != undefined){ //AND END POINT ID EQUALS THE DATA ID

						var selection = d3.select(this).select("rect")
						.each(function(d){
							Inflate(used_group, this, d)

						})
					}
				}
			})
	    });
}


function Inflate(used_group, object, data_info){

	if (data_info.load != 0){

		//CREATE A 'PULSE' THAT WE'LL USE TO SEND OUT PACKETS OF WORK DATA
		var selection = d3.select(object).transition()
		.duration(function(d){
			return d.pulse
		})
		//SEND THE PACKETS OF DATA FROM THE PULSE
		.each("end", function(d){

			if (d.load > 0) {

				if (data_info.end != -1) {
					//var text = d3.select(used_group).select("text") //UPDATE THE TEXT
					//	.text(function(d) { 
					//		var output_amount = d.output
					//		if (output_amount > d.load){
					//			output_amount = d.load
					//		}
					//		d.packet = output_amount
					//		d.load = d.load - output_amount
					//		return d.load; 
					//	});		
					var output_amount = 0
					var text = d3.select(used_group).selectAll("text") //UPDATE THE TEXT
						.each(function(d){
							var type = d3.select(this).attr("type")
							if (type == "load"){
								var txt_field = d3.select(this)
								.text(function(d) { 
									output_amount = d.output
									if (output_amount > d.load){
										output_amount = d.load
									}
									//d.packet = output_amount
									d.load = d.load - output_amount
									return d.load; 
								});
							}									
						})
					CreateCircle(d, output_amount)
					Inflate(used_group, this, d)
				}
			
			}

		})
	}
}

//function Deflate(object, data_info){
//	var selection = d3.select(object).transition()
//	.each("end", function(d){
//	    Inflate(this, d)
//	})

//	if (data_info.end != -1) {
	//	Run_Deflate(selection, data_info)
//	}	
//}



function CreateCircle(data_info, output_amount){

	if (data_info.end != -1) {
		var circle = App_Info.canvas.append("circle")
			.attr("cx",data_info.x_axis + (data_info.s_width / 2))
			.attr("cy",data_info.y_axis + (data_info.s_height / 2))
			.attr("r",5)
			.attr("load", output_amount)
			.style("fill","yellow")

		var end_point = App_Info.jsonData[data_info.end]

		circle.transition()
			.duration(1500)
			.attr("cx", end_point.x_axis + (end_point.s_width / 2))
			.attr("cy", end_point.y_axis + (end_point.s_height / 2))
			.each("end",function(){

				var saved_load = end_point.load
				//end_point.load = end_point.load + 1
				var circle_load = parseFloat(d3.select(this).attr("load"))

				var groups = App_Info.canvas.selectAll("g") //SELECT ALL GROUPS
				.each(function(d, i){ //LOOP THROUGH THOSE GROUPS

					var used_group = this
					if (d != undefined) { //IF GROUP DATA ISN'T UNDEFINED
						if (end_point.id == d.id){ //AND END POINT ID EQUALS THE DATA ID
							//var text = d3.select(this).select("text") //UPDATE THE TEXT
							//.text(function(d) {
							//	d.load = d.load + circle_load
							//	return d.load; 
							//});

							var text = d3.select(this).selectAll("text") //UPDATE THE TEXT
								.each(function(d){

									var type = d3.select(this).attr("type")
									if (type == "load"){
										var txt_field = d3.select(this)
										.text(function(d) { 
											d.load = d.load + circle_load
											return d.load; 
										});
									}									
								})



							if (saved_load == 0) { //INITIALISE THE LOADING METHOD IF THERE WAS NO LOAD BEFORE
								Inflate(used_group, this, d)
							}

							var selection = d3.select(this).select("rect") //.transition()
							//Run_Inflate(selection, d)		
						}					
					}
				})
			})
			.remove()
	}
}



function Run_Inflate(selection, data_info){

	data_info.width = data_info.width + 2 //SCALE THE WIDTH
	data_info.height = data_info.height + 2 //SCALE THE HEIGHT
	var new_width = data_info.width //DEFINE THE NEW WIDTH AS VARIABLE
	var new_height = data_info.height //DEFINE THE NEW HEIGHT AS A VARIABLE
	selection.attr("width", new_width)
	selection.attr("height", new_height)

	selection.attr("x", function(d){
		var old_pos = d.x_axis + (data_info.s_width / 2)
		var new_offset = d.x_axis + (new_width / 2)
		var diff = new_offset - old_pos
		var x = d.x_axis - diff
		return x
	})
	selection.attr("y", function(d){
		var old_pos = d.y_axis + (data_info.s_height / 2)
		var new_offset = d.y_axis + (new_height / 2)
		var diff = new_offset - old_pos
		var y = d.y_axis - diff
		return y
	})
}

function Run_Deflate(selection, data_info){

	data_info.width = data_info.width - 2 //SCALE THE WIDTH
	data_info.height = data_info.height - 2 //SCALE THE HEIGHT
	var new_width = data_info.width //DEFINE THE NEW WIDTH AS VARIABLE
	var new_height = data_info.height //DEFINE THE NEW HEIGHT AS A VARIABLE
	

	if (new_width > 0 & new_height > 0) {
		selection.attr("width", new_width)
		selection.attr("height", new_height)

		selection.attr("x", function(d){
			var old_pos = d.x_axis + (data_info.s_width / 2)
			var new_offset = d.x_axis + (new_width / 2)
			var diff = new_offset - old_pos
			var x = d.x_axis - diff
			return x
		})
		selection.attr("y", function(d){
			var old_pos = d.y_axis + (data_info.s_height / 2)
			var new_offset = d.y_axis + (new_height / 2)
			var diff = new_offset - old_pos
			var y = d.y_axis - diff
			return y
		})	
	}

}