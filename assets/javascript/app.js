//Global Variables//////////////////////////
$(document).ready(function(){

	//start button, search options array
	var sfFilms = ["pursuit of happiness will smith","princess diaries","invasion of the body snatchers","bullitt","vertigo","dirty harry","the rock alcatraz film","zodiac film","coherence film"]


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
	/* .keeps current buttons from duplicating upon pressing submit button*/
		for (var i = 0; i < sfFilms.length; i++) {
	/*iterates through each element in array to execute below*/
			var filmBtn = $("<button>");
	/* button assigned  */
		    filmBtn.addClass("movie");
	/* assigns class of 'movie' assigned */
		    filmBtn.addClass("btn btn-lg btn-success")
	// 
		    filmBtn.attr("data-name",sfFilms[i])
	/* assigns attribute 'data-name' and iterates through array to provide according names to buttons  */
		    filmBtn.text(sfFilms[i]);
	/* text on buttons displayed according to interation */
		    $("#sf-film-button").append(filmBtn);
		};	
	}

	// call function immediately because we want the buttons to show up when the page loads
	generateButtons();

	/* on click function clears image container before doing anything, grabs attribute value of data name of the button clicked, concatenates the value to the query url. using ajax , make call against giffy api which in the response, call another function and pass response array to that function */ 
	$(document).on("click", ".movie", function(){
	/*empty image container upon each click of button to clear previous appendages */
		$("#image-container").empty();

		// console.log("i clicked a button");


		//clicked buttons attribute value
		var movie = $(this).attr('data-name');
		console.log(movie)

		// //base url + clicked button attribute value and api key and other paramater
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=10" + apiKey;
		console.log(queryURL)
		$.ajax({
		  url: queryURL,
		  method: "GET"
		// ajax call and response from giffy api
		}).then(function(response) {
			console.log(response.data)
		// assign variable to the response of api object and delve into the data key
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
	//create div iterating through array to places for images
			container.addClass("image-wrapper")
	// add a class to the div
			var image = $("<img>");
	// create an image tag to hold the images
			image.attr("src", arr[i].images.fixed_width_still.url);
	// add src attribute to link images in the divs
			image.attr("data-state", "still")
	// add attributes for the date states for when animation/still
			image.attr("data-animate", arr[i].images.fixed_width.url)
			image.attr("data-still", arr[i].images.fixed_width_still.url )
	// create a p tag for text		
			var myRating = $("<p>");
	// add text to html including the data from response that holds the rating
			myRating.text("Rating: " + arr[i].rating);
	// append response image holder and rating holder to the dom
			$(container).append(image, myRating);
	// prepend image container so the response results list down
			$("#image-container").prepend(container)
		}
	}

	/*on click of image, grab the value of the image clicked attribute, make an evaluation according to what that value is equal*/
	$(document).on("click", "img", function(){
	// on click of image sets condition for data-state attribute
		var state = $(this).attr('data-state');
	// image click attribute data state
		if (state === "still") {
	// if data-state is still
	        $(this).attr("src", $(this).attr("data-animate"));
	//attribute src is set to attribute data animate on click
	        $(this).attr("data-state", "animate");
      	} else {
    // if it is not still, the image src will change to the still image and change from
    // animate to still
	        $(this).attr("src", $(this).attr("data-still"));
	        $(this).attr("data-state", "still");
      	}
	})

	console.log(sfFilms)
});


// create an input field

