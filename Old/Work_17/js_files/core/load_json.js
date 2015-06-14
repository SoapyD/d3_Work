
function Run_JSONload()
{

	$("#submitjson").on("click", function() {
		//THIS CODE CHECKS THAT THE FILE BEING LOADED IS A CSV
		//SPLITS THE FILENAME BY "." TO GET THE FILE EXTENSION
		var ext = $("input#jsonfile").val().split(".").pop().toLowerCase();
		//IF EXT IS NOT CSV, THE FUNCTION ENDS
		if($.inArray(ext, ["json"]) == -1) {
			alert('Upload JSON');
			return false;
		}


		//IF THE FILE ISN'T EMPTY, DO THE FOLLOWING CODE
		if ($("#jsonfile")[0].files != undefined) {
			var reader = new FileReader();
			//var csv_output = []

			reader.onload = function(e) {

				var myData = JSON.parse(e.target.result);

				App_Info.json_info = myData //PASS THE CSV_OUT INFO IN THE GLOBAL APP_iNFO CLASS
				console.log(App_Info.json_info)
				//fd_graph(App_Info.json_info);
			};

			reader.readAsText($("#jsonfile")[0].files.item(0));
		}
		return false;
	});

}