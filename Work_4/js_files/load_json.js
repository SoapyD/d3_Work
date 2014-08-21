
function Run_JSONload()
{

	$("#submitbutton").on("click", function() {
		//THIS CODE CHECKS THAT THE FILE BEING LOADED IS A CSV
		//SPLITS THE FILENAME BY "." TO GET THE FILE EXTENSION
		var ext = $("input#csvfile").val().split(".").pop().toLowerCase();
		//IF EXT IS NOT CSV, THE FUNCTION ENDS
		if($.inArray(ext, ["json"]) == -1) {
			alert('Upload JSON');
			return false;
		}


		//IF THE FILE ISN'T EMPTY, DO THE FOLLOWING CODE
		if ($("#csvfile")[0].files != undefined) {
			var reader = new FileReader();
			//var csv_output = []

			reader.onload = function(e) {

				var myData = JSON.parse(e.target.result);

				App_Info.json_info = myData //PASS THE CSV_OUT INFO IN THE GLOBAL APP_iNFO CLASS
				fd_graph(App_Info.json_info)
			};

			reader.readAsText($("#csvfile")[0].files.item(0));
		}
		return false;
	});

}