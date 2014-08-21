
function Run_Canvas()
{

	App_Info.canvas = d3.select("body")
					.append("svg")
					.attr("width",500)
					.attr("height",500)
					.attr("class", "svg_info");


	App_Info.widthScale = d3.scale.linear()
							.domain([0, 60])
							.range([0, 500])

}