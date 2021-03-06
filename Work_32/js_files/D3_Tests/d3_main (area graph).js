window.onload = function WindowLoad(event) {
	App_Info()
	//Print_Test()
}

function App_Info()
{
	this.canvas;
	this.jsonData;
}


function Print_Area(loaded_item){

	App_Info()

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////DATA
	////////////////////////////////////////////////////////////////////////////////////////////
		var  jsonData = Call_Data()

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

	w = 750,
	h = 240,
	margin = 20,

	widthScale = d3.scale.linear()
		.domain([0, w - 10])
		.range([margin, w - margin])

	heightScale = d3.scale.linear()
		.domain([0, h - 10])
		.range([margin, h - margin])


	App_Info.canvas = d3.select("#" + loaded_item)
	    .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("border","1px solid black")

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	Set_AreaGraph(jsonData,widthScale, heightScale)
}


function Set_AreaGraph(data,x, y){

	var filtered_data = data
	filtered_data.sort(function(a,b) { return +a.date_id - +b.date_id; })


	//filtered_data = filtered_data.filter(function(d) { return d.date_id < 500})
	//filtered_data = filtered_data.filter(function(d) { return d.region === "Nottingham"})
	console.log(filtered_data)
	var x = d3.time.scale()
   		.range([0, w]);

	var y = d3.scale.linear()
    	.range([h, 0]);

	x.domain(d3.extent(filtered_data, function(d) { return d.date_id; }));
	y.domain([0, d3.max(filtered_data, function(d) { return d.total; })]);

	var g = App_Info.canvas.append("svg:g")

	var areaLine = d3.svg.area()
	 	.x((filtered_data, function(d) { return x(d.date_id); }))  
	 	.y0((filtered_data, function(d) { return y(d.amount); }))
		.y1((filtered_data, function(d) { return y(d.total); }))
		.interpolate("linear");

	/////////////////////////////////////////////RED AREA
	g.append("svg:path")
		.attr("d", areaLine(filtered_data))
	  	.attr("class", "area")
		.attr({style: 'fill: red'})

	/////////////////////////////////////////////AMBER AREA
	SetAmount(filtered_data, 1)
	g.append("svg:path")
	  	.attr("d", areaLine(filtered_data))
	  	.attr("class", "area")
	  	.attr({style: 'fill: orange'})

	/////////////////////////////////////////////GREEN AREA
	SetAmount(filtered_data, 2)
	g.append("svg:path")
	 	.attr("d", areaLine(filtered_data))
	 	.attr("class", "area")
		.attr({style: 'fill: green'})
}

function SetAmount(data, set_type){
    for (var i = 0; i < data.length; i++) {
        var obj = data[i]

        var offset = 0
        if (set_type == 1){
        	offset = obj.red + obj.amber
        }
        if (set_type == 2){
        	offset = obj.red
        }

        obj.amount = obj.total - offset
    }   	
}