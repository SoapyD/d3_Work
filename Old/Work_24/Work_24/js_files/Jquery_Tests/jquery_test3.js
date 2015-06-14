
$(function() {
	$( "#catalog" ).accordion();
    //$( "#catalog li" ).draggable({
    //  appendTo: "body",
    //  helper: "clone",
    //  cursor: "move",
    //  cursorAt: { top: 0, left: 0 }
    //});
	//$('.sortable').append($('<div>').load("test_html.html"))
	//$('.test').append($('.sortable').load("test_html.html"))

    $( "#li_1" ).on('click', function() {

        $('.sortable').append($('<div  class="portlet span-1">').load("loader_files/test_html.html"))
	});
    $( "#li_2" ).on('click', function() {

        $('.sortable').append($('<div  class="portlet span-2">').load("loader_files/test_html2.html"))
	});
});


function Query_Test4(loaded_item){
	$(document).ready(function(){
		//$('.sortable').sortable();
		//console.log(loaded_item);
        var element = document.getElementById(loaded_item);
        var wantedDiv = element.parentNode;

	    $(wantedDiv)
	      .addClass( "ui-widget ui-widget-content ui-corner-all" )
	      .find( ".portlet-header" )
	        .addClass( "ui-widget-header ui-corner-all" )
	        .prepend( "<span class='ui-icon ui-icon-minusthick'></span>");

		//$('.portlet-header .ui-icon').on('click', function() {
		$(wantedDiv)
		.find('.portlet-header .ui-icon').on('click', function() {
		    $(this).toggleClass('ui-icon-minusthick ui-icon-plusthick');
		    $(this).closest('.portlet').toggleClass('portlet-minimized');
		});

		//$( ".column" ).disableSelection
	});
}