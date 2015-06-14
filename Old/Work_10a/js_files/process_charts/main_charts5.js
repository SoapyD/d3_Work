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

	//TOTAL
	var  jsonData = [
		{"ID":0, "red": 0, "amber": 0, "total":0, "amount":0},
		{"ID":30, "red": 10, "amber": 10, "total":80, "amount":0},
		{"ID":60, "red": 15, "amber": 10, "total":160, "amount":0},
		{"ID":90, "red": 30, "amber": 15, "total":240, "amount":0}];

	var  jsonData1 = [
		{"ID":90, "red": 0, "amber": 90, "total":210, "amount":0},
		{"ID":120, "red": 0, "amber": 90, "total":210, "amount":0},
		{"ID":150, "red": 5, "amber": 90, "total":210, "amount":0},
		{"ID":180, "red": 45, "amber": 90, "total":210, "amount":0}];

	var  jsonData2 = [
		{"ID":150, "red": 0, "amber": 0, "total":0, "amount":0},
		{"ID":400, "red": 50, "amber": 20, "total":165, "amount":0}];

	//COSTS
	var  Costs = [
		{"ID":90, "red": 1562, "amber": 3125, "green":20312, "amount":0},
		{"ID":180, "red": 1515, "amber": 15151, "green":33333, "amount":0},
		{"ID":400, "red": 30303, "amber": 12121, "green":57575, "amount":0}];


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////FRAME
	////////////////////////////////////////////////////////////////////////////////////////////

	var max_height =  d3.max(jsonData, function(d){ return d.ID})

	w = 1000,
	h = 600,
	margin = 20,
	//x = d3.scale.linear().domain([0, 1000]).range([margin,w - margin])
	widthScale = d3.scale.linear()
		.domain([0, 500])
		.range([margin, w - margin])

	heightScale = d3.scale.linear()
		.domain([0, 800])
		.range([margin, h - margin])

	radiusScale = d3.scale.linear()
		.domain([0, 500000])
		.range([0, h])
		//.range([margin, h - margin])
	//y = d3.scale.linear().domain([0, 120]).range([0,h]),


	App_Info.canvas = d3.select("body")
	    .append("svg:svg")
	    .attr("width", w)
	    .attr("height", h)
	    .style("border","1px solid black")


	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////

	SetGraph(jsonData,widthScale, heightScale)
	SetGraph(jsonData1,widthScale, heightScale)
	SetGraph(jsonData2,widthScale, heightScale)

	////////////////////////////////////////////////////////////////////////////////////////////
	//////////////////////////LINE DATA
	////////////////////////////////////////////////////////////////////////////////////////////
	SetCircle(Costs)
	console.log("10000 radius: " + radiusScale(1000000))

/*

*/

}

function SetCircle(data){

	/////////////////////////////////////////////GREEN AREA
	var g = App_Info.canvas.append("svg:g")
	var start_y = 50

	var circleGroup = g.selectAll("circle")
	  .data(data)
	  .enter().append("circle")
	  	.attr("fill",function(d) {
	  		return "green"
	  	})
	    .attr("cx", function(d,i){
	      return widthScale(d.ID);
	    })
	    .attr("cy", function(d,i){
	      return start_y + radiusScale(100000)/ 2 * 5;
	    })
		.attr("r", function(d,i){
	      return radiusScale(d.green / 2);
	    })
	    .style("stroke","black")
	    .style("stroke-width",2)

	/////////////////////////////////////////////AMBER AREA
	var g = App_Info.canvas.append("svg:g")

	var circleGroup = g.selectAll("circle")
	  .data(data)
	  .enter().append("circle")
	  	.attr("fill",function(d) {
	  		return "orange"
	  	})
	    .attr("cx", function(d,i){
	      return widthScale(d.ID);
	    })
	    .attr("cy", function(d,i){
	      return start_y + radiusScale(100000)/ 2 * 3;
	    })
		.attr("r", function(d,i){
	      return radiusScale(d.amber / 2);
	    })
	    .style("stroke","black")
	    .style("stroke-width",2)

	/////////////////////////////////////////////RED AREA
	var g = App_Info.canvas.append("svg:g")

	var circleGroup = g.selectAll("circle")
	  .data(data)
	  .enter().append("circle")
	  	.attr("fill",function(d) {
	  		return "red"
	  	})
	    .attr("cx", function(d,i){
	      return widthScale(d.ID);
	    })
	    .attr("cy", function(d,i){
	      return start_y + radiusScale(100000) / 2;
	    })
		.attr("r", function(d,i){
	      return radiusScale(d.red / 2);
	    })
	    .style("stroke","black")
	    .style("stroke-width",2)

}



function SetGraph(data,x, y){

	var g = App_Info.canvas.append("svg:g")

	var areaLine = d3.svg.area()
	  .x(function(d) { return x(d.ID); })
	  .y0(function(d) { return h - y(d.amount); })
	  .y1(function(d) { return h - y(d.total); })	  
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