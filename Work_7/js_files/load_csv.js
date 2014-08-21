
function Run_CSVload()
{

	$("#submitbutton").on("click", function() {
		//THIS CODE CHECKS THAT THE FILE BEING LOADED IS A CSV
		//SPLITS THE FILENAME BY "." TO GET THE FILE EXTENSION
		var ext = $("input#csvfile").val().split(".").pop().toLowerCase();
		//IF EXT IS NOT CSV, THE FUNCTION ENDS
		if($.inArray(ext, ["csv"]) == -1) {
			alert('Upload CSV');
			return false;
		}

		//IF THE FILE ISN'T EMPTY, DO THE FOLLOWING CODE
		if ($("#csvfile")[0].files != undefined) {
			var reader = new FileReader();
			var csv_output = []

			reader.onload = function(e) {
				var csvval=e.target.result.split("\n"); //DISSECT THE CSV BY LINE BREAK, CREATE AN ARRAY

				//CYCLE THROUGH THE DEVIDED LINES
				for (var n=0;n<csvval.length;n++)
				{
					var csvvalue=csvval[n].split(",");//SPLIT THOSE LINES BY "," TO DIVIDE UP THE DATA
					csv_output[n] = csvvalue;
				}
				App_Info.csv_info = csv_output //PASS THE CSV_OUT INFO IN THE GLOBAL APP_iNFO CLASS
				TestFunction()
			};

			reader.readAsText($("#csvfile")[0].files.item(0));
		}
		return false;
	});

}

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

