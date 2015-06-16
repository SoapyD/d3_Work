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
	var  jsonData = Call_Data()

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

	margin = {top: 10, right: 10, bottom: 40, left: 20},
    w = 300 - margin.left - margin.right,
    h = 150 - margin.top - margin.bottom;

	//APPLY SCALING, BOUNDS AND AN AXIS TO THE GRAPH

	var nest = d3.nest()
				.key(function (d){
					return d.region;
				})
				.entries(jsonData)

	console.log(nest)
	console.log(nest[1].values)

	widthScale = d3.scale.ordinal()
	    .domain(jsonData.map(function(d) { return d.region; }))
	    //.rangeBands([0, width]);
	    .rangeBands([0,w]);	

	heightScale = d3.scale.linear()
		.domain([0, d3.max(jsonData, function(d) { return d.total; })])
    	.range([0, h]);

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

	var text_offset = (widthScale.rangeBand()/2)

  	svg.append("g")
      	.attr("class", "x axis")
      	.attr("transform", "translate(0" + "," + h + ")")
      	.call(xAxis)
		.selectAll("text")	
			.attr("dx", "-10")
			.attr("dy", "-5")
            .style("text-anchor", "end")
            .attr("transform", "rotate(-90)");   	

	var rect_box = svg.selectAll("div")
		.data(data)
  		.enter().append("rect")
  			.attr("class", "bar")
			.attr("x", function(d) { return widthScale(d.region); })
			.attr("y", function(d) { return h - heightScale(d.total); })
			.attr("height",0)
			.transition().duration(300)
			.delay(function (d, i) { return i*100; })
			.attr("height", function(d) { return heightScale(d.total); })
			.attr("width", widthScale.rangeBand())
			.style("stroke", "black")
			.style("stroke-width", "1px")
}	
