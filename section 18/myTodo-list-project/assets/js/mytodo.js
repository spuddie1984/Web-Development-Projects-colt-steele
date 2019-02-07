
// Add a fade effect to the input element when displaying and hiding
$(".add-todos").on("click", function () {
		// toggle input show with the + button
		$("#todo-input").fadeToggle(800, "linear");
	});

// listen for the enter keypress in the input element and take its value and append to the list element
$("#todo-input").on("keypress", function (event) {
	if( event.which === 13 ) {
		$("ul").append("<li><span class ='far fa-trash-alt fa-xs delete'></span>" + $(this).val() + "</li>");
		$(this).val("");
	}
});


$("body").on("click", "li", function () {
	$(this).toggleClass("done");
})

$("body").on("click", ".delete", function (event) {
	
	$(this).parent("li").fadeOut(400, function () {
		$(this).parent("li").remove();
	});
	event.stopPropagation();
});
