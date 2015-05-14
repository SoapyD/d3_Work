
function TestFunction()
{

	var max = 0;
	for( i=0;i<App_Info.csv_info.length;i++) //FIND THE MAX VALUE IN THE ARRAY
	{
		if (max < App_Info.csv_info[i][1])
		{
			max = App_Info.csv_info[i][1]
		}
	}

	//USE THAT MAX VALUE TO SET THE SCALER AND COLOUR GRADIANT DEFINER
	var colour = d3.scale.linear() <!--Allows you to set a width = this colour gradiant-->
		.domain([0,max])
		.range(["red","blue"]) <!--Smallest items red, largest items blue-->

	App_Info.widthScale = d3.scale.linear()
							.domain([0, (Number(max) + (max * 0.1))])
							.range([0, 50])



	var g = App_Info.canvas.append("g")
		.attr("transform","translate(100,100)")

	var circleGroup = g.selectAll("circle")
	  .data(App_Info.csv_info)
	  .enter().append("circle")
	  	.attr("fill",function(d) {
	  		return colour(d[1])
	  	})
	    .attr("cx", function(d,i){
	      return 0;
	    })
	    .attr("cy", function(d,i){
	      return i * 100;
	    })
	    //.attr("r", function(d){
	    //  return App_Info.widthScale(d[1]);
	    //})
		.attr("r",0)

	var circleGroup = g.selectAll("circle")
	    .transition()
		.duration(1500)	    
	    .attr("r", function(d){
	      return App_Info.widthScale(d[1]);
	    })
}

