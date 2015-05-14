
function run_cluster_den()
{
	var width = 960,
    height = 2200;

	var cluster = d3.layout.cluster()
    	.size([height, width - 160]);

	var diagonal = d3.svg.diagonal()
    	.projection(function(d) { return [d.y, d.x]; });

	var svg = d3.select("body").append("svg")
    	.attr("width", width)
    	.attr("height", height)
  		.append("g")
    		.attr("transform", "translate(40,0)");

	d3.json("/d/4063550/flare.json", function(error, root) {
		var nodes = cluster.nodes(root),
    		links = cluster.links(nodes);

  		var link = svg.selectAll(".link")
      		.data(links)
    		.enter().append("path")
      		.attr("class", "link")
      		.attr("d", diagonal);

  		var node = svg.selectAll(".node")
      		.data(nodes)
    		.enter().append("g")
      		.attr("class", "node")
      		.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  		node.append("circle")
      		.attr("r", 4.5);

  		node.append("text")
      		.attr("dx", function(d) { return d.children ? -8 : 8; })
      		.attr("dy", 3)
      		.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      		.text(function(d) { return d.name; });
	});

	d3.select(self.frameElement).style("height", height + "px");
}

function run_cluster_den2(json_data)
{
	var width = 500,
    height = 500;

	var cluster = d3.layout.cluster() //CREATE A CLUSTER
    	.size([height, width - 150]);

	var diagonal = d3.svg.diagonal()
    	.projection(function(d) { return [d.y, d.x]; });

    var group = App_Info.canvas.append("g")
    	group.attr("transform", function(d) {
	  	    return "translate(75,0)"; });

	var nodes = cluster.nodes(json_data),
    	links = cluster.links(nodes);

  	var link = group.selectAll(".link")
      	.data(links)
    	.enter().append("path")
      	.attr("class", "link2")
      	.attr("d", diagonal);

  	var node = group.selectAll(".node")
      	.data(nodes)
    	.enter().append("g")
      	.attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; })

  	node.append("circle") //ADDS A CIRCLE TO THE NODE
  		.attr("class", "node")
      	.attr("r", 4.5);


  	node.append("text")
  		.attr("class", "screen_text")
      	.attr("dx", function(d) { return d.children ? -8 : 8; })
      	.attr("dy", -10)
      	.style("text-anchor", function(d) { return d.children ? "end" : "start"; })
      	.text(function(d) { return d.name; });
	//});

	d3.select(self.frameElement).style("height", height + "px");
}