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
	//TOTAL
	var  jsonData = [
		{"ID":0, "red": 0, "amber": 0, "total":0, "amount":0},
		{"ID":30, "red": 10, "amber": 10, "total":80, "amount":0},
		{"ID":60, "red": 15, "amber": 10, "total":160, "amount":0},
		{"ID":90, "red": 30, "amber": 15, "total":240, "amount":0},
		{"ID":120, "red": 0, "amber": 90, "total":210, "amount":0},
		{"ID":150, "red": 5, "amber": 90, "total":200, "amount":0},
		{"ID":180, "red": 45, "amber": 90, "total":180, "amount":0},
		{"ID":210, "red": 0, "amber": 30, "total":210, "amount":0},
		{"ID":240, "red": 15, "amber": 20, "total":80, "amount":0},];

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

	var x = d3.time.scale()
   		.range([0, w]);

	var y = d3.scale.linear()
    	.range([h, 0]);

	x.domain(d3.extent(data, function(d) { return d.ID; }));
	y.domain([0, d3.max(data, function(d) { return d.total; })]);

	var g = App_Info.canvas.append("svg:g")

	var areaLine = d3.svg.area()
	  .x(function(d) { return x(d.ID); })  
	  .y0(function(d) { return y(d.amount); })
	  .y1(function(d) { return y(d.total); })	  
	  .interpolate("linear");

	/////////////////////////////////////////////GREEN AREA
	g.append("svg:path")
	  .attr("d", areaLine(data))
	  .attr("class", "area")
	  .attr({style: 'fill: green'})

	/////////////////////////////////////////////AMBER AREA
  
	SetAmount(data, 1)
	g.append("svg:path")
	  .attr("d", areaLine(data))
	  .attr("class", "area")
	  .attr({style: 'fill: orange'})

	/////////////////////////////////////////////RED AREA
	SetAmount(data, 2)
	g.append("svg:path")
	  .attr("d", areaLine(data))
	  .attr("class", "area")
	  .attr({style: 'fill: red'})
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