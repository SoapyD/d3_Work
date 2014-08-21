
function Test1()
{

	//var groups = [];
	//var group = App_Info.canvas.append("g")

	for (i=0;i<5;i++)
	{
		var group = App_Info.canvas.append("g" + i)
	}

	var node = group.selectAll(".node") //ADD NODE GROUPS, WHERE THE NODE DATA WILL SIT
	    .data(graph.nodes)
	    .enter().append("g")
	    	.attr("class", "node")
	    	.style("fill", function(d) { return color(d.group); })
	    	.call(force.drag)

selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x1.rangeBand())
      .attr("x", function(d) { return x1(d.name); })
      .attr("y", function(d) { return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .style("fill", function(d) { return color(d.name); });

}