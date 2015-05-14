
function App_Info()
{
	this.csv_info = []
	this.json_info = []
	this.canvas;
	this.widthScale;
	this.group;
}


window.onload = function WindowLoad(event) {
	App_Info();
    Run_Canvas();
    Run_JSONload();
    CheckHide();
    //run_cluster_den2()
    //Test1();
}
