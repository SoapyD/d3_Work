
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

    $( "#catalog li" ).on('click', function() {

        $('.sortable').append($('<div  class="portlet span-1">').load("test_html2.html"))
	});


    Query_Test4();
});


function Query_Test4(){
	$(document).ready(function(){
		$('.sortable').sortable();

	    $( ".portlet" )
	      .addClass( "ui-widget ui-widget-content ui-corner-all" )
	      .find( ".portlet-header" )
	        .addClass( "ui-widget-header ui-corner-all" )
	        .prepend( "<span class='ui-icon ui-icon-minusthick'></span>");

		$('.portlet-header .ui-icon').on('click', function() {
		    $(this).toggleClass('ui-icon-minusthick ui-icon-plusthick');
		    $(this).closest('.portlet').toggleClass('portlet-minimized');
		});
	});
}