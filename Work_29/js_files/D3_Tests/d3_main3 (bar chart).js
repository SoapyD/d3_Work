window.onload = function WindowLoad(event) {
	App_Info()
}

function App_Info()
{
	this.canvas;
	this.jsonData;
}


function Print_Bar(loaded_item){

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	var  jsonData = [
		{"ID":30, "red": 10, "amber": 10, "total":80, "amount":0},
		{"ID":60, "red": 15, "amber": 10, "total":160, "amount":0},
		{"ID":90, "red": 30, "amber": 15, "total":340, "amount":0},
		{"ID":120, "red": 0, "amber": 90, "total":210, "amount":0},
		{"ID":150, "red": 5, "amber": 90, "total":200, "amount":0}];


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

	margin = {top: 10, right: 10, bottom: 15, left: 20},
    w = 300 - margin.left - margin.right,
    h = 100 - margin.top - margin.bottom;

	//APPLY SCALING, BOUNDS AND AN AXIS TO THE GRAPH

	widthScale = d3.scale.linear()
		.domain([0, d3.max(jsonData, function(d) { return d.ID; }) + 30])
   		.range([0, w]);

	heightScale = d3.scale.linear()
		.domain([0, d3.max(jsonData, function(d) { return d.total; })])
    	.range([0, h]);


	//App_Info.canvas = d3.select("#" + loaded_item)
	//    .append("svg:svg")
	//    .attr("width", w + margin.left + margin.right)
	//    .attr("height", h + margin.top + margin.bottom)
	//    .style("border","1px solid black")


	App_Info.canvas = d3.select("#" + loaded_item);
	var svg = App_Info.canvas.append("svg:svg")
	    	.attr("width", w + margin.left + margin.right)
	    	.attr("height", h + margin.top + margin.bottom)
	    	.style("border","1px solid black")

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	Set_BarGraph(jsonData, svg)
}


function Set_BarGraph(data, svg){

	var xAxis = d3.svg.axis()
	    .scale(widthScale)
	    .ticks(12)
	    .orient("bottom");

	//var yAxis = d3.svg.axis()
	//    .scale(heightScale)
	//    .orient("left");


	//App_Info.canvas.selectAll("div")
	//	.data(data)
  	//	.enter().append("div")
    //		.style("width", function(d) { return heightScale(d.total) + "px"; })
    //		.text(function(d) { return d.total; });

  	svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0," + h + ")")
      	.call(xAxis);

	svg.selectAll("div")
		.data(data)
  		.enter().append("rect")
  			.attr("class", "bar")
			.attr("x", function(d) { return widthScale(d.ID) - 10; })
			.attr("y", function(d) { return h - heightScale(d.total); })
			.attr("height", function(d) { return heightScale(d.total); })
			.attr("width", 20)

}	
