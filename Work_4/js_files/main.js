
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


