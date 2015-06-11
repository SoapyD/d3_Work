
function Run_CSVload()
{

	$("#submitcsv").on("click", function() {
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
			};

			reader.readAsText($("#csvfile")[0].files.item(0));
		}
		return false;
	});

}
