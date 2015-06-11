window.onload = function WindowLoad(event) {
	App_Info()
	//Print_Test()
}

function App_Info()
{
	this.canvas;
	this.jsonData;
}


function Print_Test(loaded_item){

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	var  jsonData = [
		{"ID":0, "red": 0, "amber": 0, "total":0, "amount":0},
		{"ID":30, "red": 10, "amber": 10, "total":80, "amount":0},
		{"ID":60, "red": 15, "amber": 10, "total":160, "amount":0},
		{"ID":90, "red": 30, "amber": 15, "total":340, "amount":0},
		{"ID":120, "red": 0, "amber": 90, "total":210, "amount":0},
		{"ID":150, "red": 5, "amber": 90, "total":200, "amount":0}];

	//console.log(jsonData)
	//console.log( d3.max(jsonData, function(d) { return d.total; }))
	//console.log( d3.max(jsonData, function(d) { return d.ID; }))
	//console.log( d3.max(jsonData, function(d) { return d.red; }))


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

	margin = {top: 10, right: 10, bottom: 15, left: 20},
    //w = 300 - margin.left - margin.right,
    //h = 100 - margin.top - margin.bottom;
    w = 300,
    h = 100;

	//APPLY SCALING, BOUNDS AND AN AXIS TO THE GRAPH

	x = d3.scale.linear()
		.domain(d3.extent(jsonData, function(d) { return d.ID; }))
   		.range([0, w]);

	y = d3.scale.linear()
		.domain([0, d3.max(jsonData, function(d) { return d.total; })])
    	.range([h, 0]);

	//widthScale = d3.scale.linear()
	//	.domain([0, w - 10])
	//	.range([margin, w - margin])

	//heightScale = d3.scale.linear()
	//	.domain([0, h - 10])
	//	.range([margin, h - margin])


	App_Info.canvas = d3.select("#" + loaded_item)
	    .append("svg:svg")
	    .attr("width", w + margin.left + margin.right)
	    .attr("height", h + margin.top + margin.bottom)
	    .style("border","1px solid black")

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	SetGraph(jsonData)
}


function SetGraph(data){

	var xAxis = d3.svg.axis()
	    .scale(x)
	    .orient("bottom")
	    .attr("transform", "translate(0," + h + ")");

	var yAxis = d3.svg.axis()
	    .scale(y)
	    .orient("left")
	    //.ticks(10, "%");


	//CREATE THE GROUP EVERYTHING'S GOING TO BE ADDED T0

	var g = App_Info.canvas.append("svg:g")
		//.attr("transform", "translate(15," + h + ")")

	g.append("svg")
    	.attr("class", "x axis")
      	.call(xAxis)


	g.append("svg")
	    .attr("class", "y axis")
	    .call(yAxis)
		//.append("text")
	    //.attr("transform", "rotate(-90)")
	    //.attr("y", 6)
	    //.attr("dy", ".71em")
	    //.style("text-anchor", "end")
	    //.text("Frequency");

	//g.append("svg").selectAll(".bar")
	//    .data(data)
	//    .enter().append("rect")
	//    .attr("class", "bar")
	//    .attr("x", function(d) { return x(d.ID); })
	//    .attr("width", x.rangeBand())
	//    .attr("y", function(d) { return y(d.total); })
	//    .attr("height", function(d) { return h - y(d.total); });
}
