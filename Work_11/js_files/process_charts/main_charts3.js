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

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	//GREEN
	var  jsonData = [
		{"ID":0, "open": 0, "close":0},
		{"ID":30, "open": 0, "close":40},
		{"ID":60, "open": 0, "close":80},
		{"ID":90, "open": 0, "close":120}];

	//AMBER
	var  jsonData1 = [
		{"ID":0, "open": 0, "close":0},
		{"ID":30, "open": 10, "close":0},
		{"ID":60, "open": 10, "close":0},
		{"ID":90, "open": 15, "close":0}];

	//RED
	var  jsonData2 = [
		{"ID":0, "open": 0, "close":0},
		{"ID":30, "open": 10, "close":0},
		{"ID":60, "open": 15, "close":0},
		{"ID":90, "open": 30, "close":0}];


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

	var max_height =  d3.max(jsonData, function(d){ return d.ID})

	 w = 600,
	 h = 400,
	 margin = 20,
	 //y = d3.scale.linear().domain([0, max_height]).range([0 + margin, h - margin]),
	// x = d3.scale.linear().domain([0, jsonData.length - 1]).range([0 + margin, w - margin])


	App_Info.canvas = d3.select("body")
	    .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("border","1px solid black")
	 
	var g = App_Info.canvas.append("svg:g")


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	var areaLine = d3.svg.area()
	  .x(function(d) { return d.ID; })
	  .y0(function(d) { return h - d.open; })
	  .y1(function(d) { return h - d.close; })
	  .interpolate("linear");

	/////////////////////////////////////////////GREEN AREA
	g.append("svg:path")
	  .attr("d", areaLine(jsonData))
	  .attr("class", "area")
	  .attr({style: 'fill: green'})

	/////////////////////////////////////////////AMBER AREA
    var resources = jsonData1;
    for (var i = 0; i < resources.length; i++) {
        var obj = resources[i]
        obj.close = jsonData[i].close
        obj.open = obj.close - obj.open - jsonData2[i].open
    }   

	g.append("svg:path")
	  .attr("d", areaLine(jsonData1))
	  .attr("class", "area")
	  .attr({style: 'fill: orange'})


	/////////////////////////////////////////////RED AREA
    var resources = jsonData2;
    for (var i = 0; i < resources.length; i++) {
        var obj = resources[i]
        //for (var key in obj) {
        //    console.log(key+"="+obj[key]);
        //}
        //console.log("open: " + obj.open + ", close: " + obj.close)
        obj.close = jsonData[i].close
        obj.open = obj.close - obj.open
    }   

	g.append("svg:path")
	  .attr("d", areaLine(jsonData2))
	  .attr("class", "area")
	  .attr({style: 'fill: red'})



/*

	g.append("svg:path")
	  .attr("d", areaLine(jsonData2))
	  .attr("class", "area")
	  .attr({style: 'fill: orange'})

	g.append("svg:path")
	  .attr("d", areaLine(jsonData))
	  .attr("class", "area")
	  .attr({style: 'fill: red'})
*/

}