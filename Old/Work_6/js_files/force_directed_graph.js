
function fd_graph(graph)
{
	var width = 500,
	    height = 500;

	var color = d3.scale.category20(); //PROVIDES AND ARRAY OF 20 COLOURS
	var color2 = d3.scale.category10();

	var group = App_Info.canvas.append("g")

	var force = d3.layout.force() //DEFINES FORCE BETWEEN LINKS
	    .charge(-120)
	    .linkDistance(60)
	    .size([width, height]);

	force
	    .nodes(graph.nodes)
	    .links(graph.links)
	    .start();

	var link = group.append("g").selectAll(".link") //CREATES AND STYLES THE LINK LINES
	    .data(graph.links)
	    .enter().append("line")
	    	.attr("class", "link")
	   		.style("stroke-width", function(d) { return Math.sqrt(d.value); })
	    	.style("stroke", function(d) {return color2(d.relation);})

	var node = group.selectAll(".node") //ADD NODE GROUPS, WHERE THE NODE DATA WILL SIT
	    .data(graph.nodes)
	    .enter().append("g")
	    	.attr("class", "node")
	    	.style("fill", function(d) { return color(d.group); })
	    	.call(force.drag)

	node.append("circle") //ADD CIRCLES TO THOSE NODE GROUPS
		.attr("r", 10)

	node.append("title") //ADD A TITLE TO THE NODE GROUPS
	    .text(function(d) { return d.name; });


	node.append("text") //ADD TEXT TO THE NODE GROUPS
	    .attr("x", 12)
	    .attr("dy", ".35em")
	    .attr("font-size", "0.5em")
	    .text(function(d) { return d.name; });


	  //THIS IS NEEDED TO POSITION NODES, LINKS AND TEXT
	  force.on("tick", function() {
	    link.attr("x1", function(d) { return d.source.x; })
	        .attr("y1", function(d) { return d.source.y; })
	        .attr("x2", function(d) { return d.target.x; })
	        .attr("y2", function(d) { return d.target.y; });

		node.attr("transform", function(d) { //TRANSLATES THE NODE GROUPS AS WELL AS EVERYTHING ASSOCIATED WITH THEM
	  	    return "translate(" + d.x + "," + d.y + ")"; });
	  });




	  console.log(node[0])
	  console.log(node[0][0])
	  //
}
