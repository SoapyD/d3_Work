
function fd_graph(graph)
{
	var width = 500,
	    height = 500;

	var color = d3.scale.category20(); //PROVIDES AND ARRAY OF 20 COLOURS
	var color2 = d3.scale.category10();

	var force = d3.layout.force() //DEFINES FORCE BETWEEN LINKS
	    .charge(-120)
	    .linkDistance(60)
	    .size([width, height]);

	  force
	      .nodes(graph.nodes)
	      .links(graph.links)
	      .start();

	  var link = App_Info.canvas.selectAll(".link")
	      .data(graph.links)
	    .enter().append("line")
	      .attr("class", "link")
	      .style("stroke-width", function(d) { return Math.sqrt(d.value); })
	      .style("stroke", function(d) {return color2(d.relation);})

	  var node = App_Info.canvas.selectAll(".node")
	      .data(graph.nodes)
	    .enter().append("circle")
	      .attr("class", "node")
	      .attr("r", 5)
	      .style("fill", function(d) { return color(d.group); })
	      .call(force.drag);

	  node.append("title")
	      .text(function(d) { return d.name; });

	  force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

	    node.attr("cx", function(d) { return d.x; })
	        .attr("cy", function(d) { return d.y; });
	  });
}
