//Global Variables//////////////////////////
$(document).ready(function(){

	//start button, search options array
	var sfFilms = ["pursuit of happiness","princess diaries","invasion of the body snatchers","bullitt","vertigo","dirty harry","the rock nicholas cage film","zodiac film","coherence film"]


	/* on click of submit button, grab value from input and add input value to my array, called generate buttons for array after new item is added to the array */
	$("#submit").on("click", function(){
		//console.log("hi")
		// get the text from the input search-input and store it to a variable 
		var search = $("#search-input").val().trim();
		// console.log(search);
		sfFilms.push(search);
		generateButtons();
	})

	/*function empties container before doing anything, then loops through film array and creates buttons for each string, it also adds attributes and classes to buttons before appending to page*/
	function generateButtons(){
		$("#sf-film-button").empty();
		for (var i = 0; i < sfFilms.length; i++) {
			var filmBtn = $("<button>");
		    filmBtn.addClass("movie");
		    filmBtn.attr("data-name",sfFilms[i])
		    filmBtn.text(sfFilms[i]);
		    $("#sf-film-button").append(filmBtn);
		};	
	}

	// call function immediatgely beause we want the buttons to show up when the page loads
	generateButtons();

	/* on click function clears image container before doing anything, grabs attribute value of data name of the button clicked, concatenates the value to the query url. using ajax , make call against giffy api which in the response, call another function and pass response array to that function */ 
	$(document).on("click", ".movie", function(){
		$("#image-container").empty();

		console.log("i clicked a button");


		//clicked buttons attribute value
		var movie = $(this).attr('data-name');
		console.log(movie)

		// //base url + clicked button attribute value and api key and other paramater
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=Lk15PiiU3gyFxD2FrKFM48Q367ab4QwK&limit=10";
		console.log(queryURL)
		$.ajax({
		  url: queryURL,
		  method: "GET"
		}).then(function(response) {
			console.log(response.data)

			var arrayOfAllGifs = response.data;

			//function call that renders results, pass in response array
			appendGifs(arrayOfAllGifs)

		});
	});


	/*loops through results array, create a container to hold our resulting elements, create our result elements and add corresponding attributes append elements to container and append container to page  */
	function appendGifs(arr){
		for(var i=0; i < arr.length; i++ ){
			//console.log(arr[i]);
			var container = $("<div>");
			container.addClass("image-wrapper")
			var image = $("<img>");
			image.attr("src", arr[i].images.fixed_width_still.url);
			image.attr("data-state", "still")
			image.attr("data-animate", arr[i].images.fixed_width.url)
			image.attr("data-still", arr[i].images.fixed_width_still.url )
			var myRating = $("<p>");
			myRating.text("Rating: " + arr[i].rating);
			$(container).append(image, myRating);
			$("#image-container").prepend(container)
		}
	}

	/*on click of image, grab the value of the image clicked attribute, make an evaluation according to what that value is equal*/
	$(document).on("click", "img", function(){
		var state = $(this).attr('data-state');

		if (state === "still") {
	        $(this).attr("src", $(this).attr("data-animate"));
	        $(this).attr("data-state", "animate");
      	} else {
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
      	}
	})

	console.log(sfFilms)
});


// create an input field

