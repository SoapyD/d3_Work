
function App_Info()
{
	this.csv_info = []
	this.json_info = []
	this.canvas;
	this.canvas_width;
	this.canvas_height;
	this.widthScale;
	this.group;
}


window.onload = function WindowLoad(event) {
	App_Info();
    Run_Canvas();

    //RUN THE FUNCTIONS ASSOCIATED WITH LOADING DATA
    Run_JSONload();
    Run_CSVload();
    Run_FDGraph();
}
