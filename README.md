# **San Francisco Giphy App**

San Francisco Giphy App is an app game where users can click buttons 

![Demo](assets/images/sfgifapp.gif)

## **Motivation**
Learning how to call APIs and incorporate data into app.


## **Libraries** 

**jQuery, Bootstrap**


## **Installation** 

Find the latest versions of jQuery and Bootstrap libraries
- [jQuery](https://code.jquery.com/)
- [Bootstrap](https://getbootstrap.com/docs/4.3/getting-started/introduction/)

Copy and paste the Bootstrap CSS CDN link within the `<head>` tags of an HTML document
Copy and paste the Bootstrap JS CDN link and the minified jQuery JS CDN link above the `</body>` tag

## **Getting Started**
In the HTML file, set up the elements needed for the app

### **HTML**
**Button Container** <br>
``` HTML
<div id="sf-film-button"></div>
```
**Image Container**
``` HTML
<div id="image-container"></div>
```
**Search Container**
``` HTML
<div class="search-container">
	<input type="text" name="search" id="search-input" placeholder="SF Films">
	<button id="submit">SF Films</button>
</div>
```
### **JavaScript**

**Initialize jQuery button functions When DOM loads**<br>
Wrap button functions in $( document ).ready() function   
``` JavaScript
$(document).ready(function (){}); 
```
**Generate buttons**<br>
``` JavaScript
function generateButtons(){
	$("#sf-film-button").empty();
	for (var i = 0; i < sfFilms.length; i++) {
		var filmBtn = $("<button>");
	    filmBtn.addClass("movie");
	    filmBtn.addClass("btn btn-lg btn-success")
	    filmBtn.attr("data-name",sfFilms[i])
	    filmBtn.text(sfFilms[i]);
	    $("#sf-film-button").append(filmBtn);
	};	
}
```




**Button Array**<br>
Assign an array of strings to include as default buttons for querying giphs.
``` JavaScript
var sfFilms = ["pursuit of happiness will smith","princess diaries","invasion of the body snatchers","bullitt","vertigo","dirty harry","the rock alcatraz film","zodiac film","coherence film"]
```




**Submit Button (SF Films)**<br>
Clicking the submit button will capture the string value and push the string the button array.
``` JavaScript
$("#submit").on("click", function(){
	var search = $("#search-input").val().trim();
	sfFilms.push(search);
	generateButtons();
})
```
**Ajax Call to Giphy API**<br>
``` JavaScript
$(document).on("click", ".movie", function(){
/*empty image container upon each click of button to clear previous appendages */
	$("#image-container").empty();

	// console.log("i clicked a button");


	//clicked buttons attribute value
	var movie = $(this).attr('data-name');
	console.log(movie)

	// //base url + clicked button attribute value and api key and other paramater
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&limit=10" + "&api_key=";
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

```

**Append Giphs**
``` JavaScript
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

		myRating.addClass("label label-info")
// add text to html including the data from response that holds the rating
		myRating.text("Rating: " + arr[i].rating);
// append response image holder and rating holder to the dom
		$(container).append(image, myRating);
// prepend image container so the response results list down
		$("#image-container").prepend(container)
	}
}

```




