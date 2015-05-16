
$(function() {
	$( "#catalog" ).accordion();
    //$( "#catalog li" ).draggable({
    //  appendTo: "body",
    //  helper: "clone",
    //  cursor: "move",
    //  cursorAt: { top: 0, left: 0 }
    //});
    $( "#catalog li" ).on('click', function() {
        //var newCo = $('<div class="portlet span-3"></div>');
        //$('.sortable').append(newCo);

        $('.sortable').append($('<div>').load("test_html.html"));
        //Query_Test4();
        //$('.sortable').append($('<div>').append($('<p>').load('demo_test.txt')));

	});


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