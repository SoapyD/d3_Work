
function App_Info()
{
	this.csv_info = []
	this.json_info = []
	this.canvas;
	this.widthScale;
}


window.onload = function WindowLoad(event) {
	App_Info()
    Run_Canvas();
    Run_JSONload();
    //FD_graph();
}


function SelectNode()
{

	var group = App_Info.canvas.append("g")
	var node = group.selectAll(".node")

	console.log(node[0].r)
}