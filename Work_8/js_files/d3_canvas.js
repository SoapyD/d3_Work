
function Run_Canvas()
{

	App_Info.canvas_width = 1000
	App_Info.canvas_height = 1000

	App_Info.canvas = d3.select("body")
					.append("svg")
					.attr("width",App_Info.canvas_width )
					.attr("height",App_Info.canvas_height)
					.attr("class", "svg_info");


	App_Info.widthScale = d3.scale.linear()
							.domain([0, 60])
							.range([0, App_Info.canvas_width])

}