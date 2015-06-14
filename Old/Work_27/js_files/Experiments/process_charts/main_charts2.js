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

/*


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



	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	var line = d3.svg.line()
	    .x(function(d,i) { return x(i); })
	    .y(function(d) { return -1 * y(d.ID); })

	g.append("svg:path").attr("d", line(jsonData));

var area = d3.svg.area()
    .x(function(d) { return x(d.ID); })
    .y0(h)
    .y1(function(d) { return y(d.close); });

	g.append("svg:path").attr("d", area(jsonData));

*/

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

var data = [
  {date: new Date(2011, 0, 1), sunrise: [7, 51], sunset: [16, 42]},
  {date: new Date(2011, 0, 15), sunrise: [7, 48], sunset: [16, 58]},
  {date: new Date(2011, 1, 1), sunrise: [7, 33], sunset: [17, 21]},
  {date: new Date(2011, 1, 15), sunrise: [7, 14], sunset: [17, 41]},
  {date: new Date(2011, 2, 1), sunrise: [6, 51], sunset: [18, 0]},
  {date: new Date(2011, 2, 12), sunrise: [6, 32], sunset: [18, 15]}, // dst - 1 day
  {date: new Date(2011, 2, 13), sunrise: [7, 30], sunset: [19, 16]}, // dst
  {date: new Date(2011, 2, 14), sunrise: [7, 28], sunset: [19, 18]}, // dst + 1 day
  {date: new Date(2011, 2, 14), sunrise: [7, 26], sunset: [19, 19]},
  {date: new Date(2011, 11, 31), sunrise: [7, 51], sunset: [16, 41]}
];

	var  jsonData = [
		{"ID":0, "close":0},
		{"ID":30, "close":40},
		{"ID":60, "close":80},
		{"ID":90, "close":120}];

	var max_height =  d3.max(jsonData, function(d){ return d.ID})

	 w = 400,
	 h = 200,
	 margin = 20,
	 //y = d3.scale.linear().domain([0, max_height]).range([0 + margin, h - margin]),
	// x = d3.scale.linear().domain([0, jsonData.length - 1]).range([0 + margin, w - margin])


	App_Info.canvas = d3.select("body")
	    .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("border","1px solid black")
	 
	var g = App_Info.canvas.append("svg:g")

	g.append("svg:rect").
	  attr("x", 0).
	  attr("y", 0).
	  attr("height", h).
	  attr("width", w).
	  attr("fill", "lightyellow");


	var sunriseLine = d3.svg.area()
	  .x(function(d) { return d.ID; })
	  //.y0(h)
	  .y0(function(d) { return h - d.close + 40; })
	  .y1(function(d) { return h - d.close; })
	  .interpolate("linear");

	g.append("svg:path")
	  .attr("d", sunriseLine(jsonData))
	  .attr("fill", "red")
	  .attr("class", "area")

/*




	y = d3.time.scale().domain([new Date(2011, 0, 1), new Date(2011, 0, 1, 23, 59)]).range([0, h]);
	x = d3.time.scale().domain([new Date(2011, 0, 1), new Date(2011, 11, 31)]).range([0, w]);

	var sunriseLine = d3.svg.area()
	  .x(function(d) { return x(d.date); })
	  //.y0(h)
	  .y1(function(d) { return y(new Date(2011, 0, 1, d.sunrise[0], d.sunrise[1])); })
	  .interpolate("linear");

	g.append("svg:path")
	  .attr("d", sunriseLine(data))
	  .attr("fill", "steelblue");
*/

}