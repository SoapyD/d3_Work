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

	var  jsonData = [
		{"ID":1},
		{"ID":2},
		{"ID":8}];

	var max_height =  d3.max(jsonData, function(d){
							return d.ID
						})

	w = 400,
	h = 200,
	margin = 20,
	y = d3.scale.linear().domain([0, max_height]).range([0 + margin, h - margin]),
	x = d3.scale.linear().domain([0, jsonData.length - 1]).range([0 + margin, w - margin])

	var vis = d3.select("body")
	    .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("border","1px solid black")
	 
	var g = vis.append("svg:g")
	    .attr("transform", "translate(0, 200)");


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////
/*

var area = d3.svg.area()
    .x(function(d) { return x(d.date); })
    .y0(height)
    .y1(function(d) { return y(d.close); });

*/

	var line = d3.svg.line()
	    .x(function(d,i) { return x(i); })
	    .y(function(d) { return -1 * y(d.ID); })

	g.append("svg:path").attr("d", line(jsonData));



	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////AXIS
	////////////////////////////////////////////////////////////////////////////////////////////

	//X-AXIS LABELS
	g.selectAll(".xLabel")
	    .data(x.ticks(3))
	    .enter().append("svg:text")
	    .attr("class", "xLabel")
	    .text(String)
	    .attr("x", function(d) { 
	    	console.log(d)
	    	return x(d) })
	    .attr("y", 0)
	    .attr("text-anchor", "middle")
	 
	//Y-AXIS LABELS
	g.selectAll(".yLabel")
	    .data(y.ticks(4))
	    .enter().append("svg:text")
	    .attr("class", "yLabel")
	    .text(String)
	    .attr("x", 0)
	    .attr("y", function(d) { 
	    	return -1 * y(d) 
	    })
	    .attr("text-anchor", "right")
	    .attr("dy", 4)

	//X-AXIS LINE
	g.append("svg:line")
	    .attr("x1", x(0))
	    .attr("y1", -1 * y(0))
	    .attr("x2", x(w))
	    .attr("y2", -1 * y(0))
	

	//Y-AXIS LINE
	g.append("svg:line")
	    .attr("x1", x(0))
	    .attr("y1", -1 * y(0))
	    .attr("x2", x(0))
	    .attr("y2", -1 * y(max_height))

/*

*/

}