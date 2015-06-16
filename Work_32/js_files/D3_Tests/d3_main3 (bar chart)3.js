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

	App_Info.canvas = d3.select("#" + loaded_item);
	var svg = App_Info.canvas.append("svg:svg")
	    	.attr("width", w + margin.left + margin.right)
	    	.attr("height", h + margin.top + margin.bottom)
	    	.style("border","1px solid black")

	//CREATE A NEST OF VALUES, LISTING VALUES BY REGION NAME
	var nest = d3.nest()
				.key(function (d){
					return d.region;
				})
                    .rollup(function(leaves) {
                        return d3.sum(leaves, function(d) {
                            return parseFloat(d.total);
                        });
                    })
				.entries(jsonData)

	//SORT THE NEST OF VALUES, SORT THEM BY ASCENDING ORDER
	nest.sort(
		function(a,b) { 
				return d3.ascending(a.key, b.key)
			});


	//APPLY SCALING, BOUNDS AND AN AXIS TO THE GRAPH
	widthScale = d3.scale.ordinal()
	    .domain(nest.map(function(d) { return d.key; }))
	    //.rangeBands([0, width]);
	    .rangeBands([0,w]);	

	heightScale = d3.scale.linear()
		.domain([0, d3.max(nest, function(d) { return d.values; })])
    	.range([0, h]);

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////
	//Set_BarGraph(jsonData, svg)
	Set_BarGraph3(nest, svg)
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

function Set_BarGraph2(data, svg){

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
			.attr("x", function(d) { return widthScale(d.key); })
			.attr("y", function(d) { return h - heightScale(d.values); })
			.attr("height",0)
			.transition().duration(300)
			.delay(function (d, i) { return i*100; })
			.attr("height", function(d) { return heightScale(d.values); })
			.attr("width", widthScale.rangeBand())
			.style("stroke", "black")
			.style("stroke-width", "1px")
}

function Set_BarGraph3(data, svg){

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
			.attr("x", function(d) { return widthScale(d.key); })
			.attr("y", function(d) { return h; })
			.attr("height",0)
			.transition().duration(1000)
			.delay(function (d, i) { return i*100; })
			.attr("height", function(d) { return heightScale(d.values); })
			.attr("y", function(d) { return h - heightScale(d.values); })
			.attr("width", widthScale.rangeBand())
			.style("stroke", "black")
			.style("stroke-width", "1px")
}