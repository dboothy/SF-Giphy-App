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
