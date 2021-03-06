// Before you can make any part of our site work, you need to create an array of strings, each one related to a topic that interests you. Save it to a variable called `topics`.
//    * We chose animals for our theme, but you can make a list to your own liking.

// 2. Your app should take the topics in this array and create buttons in your HTML.
//    * Try using a loop that appends a button for each string in the array.

// 3. When the user clicks on a button, the page should grab 10 static, non-animated gif images from the GIPHY API and place them on the page.

// 4. When the user clicks one of the still GIPHY images, the gif should animate. If the user clicks the gif again, it should stop playing.

// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.

// 7. Deploy your assignment to Github Pages.

// 8. **Rejoice**! You just made something really cool.

// - - -
var characterscomp = ["homer simpson", "marge simpson", "bart simpson", "lisa simpson", "maggie simpson", "abraham simpson", "mona simpson", "patty bouvier", "selma bouvier", "jaqueline bouvier", "herbert powell", "ling bouvier", "ned flanders", "maud flanders", "rod flanders", "todd flanders", "moe szyslak", "barney gumble", "monty burns", "waylon smithers", "lenny leonard", "carl carlson", "seymour skinner", "edna krabappel", "gary chalmers", "miss hoover", "willie", "otto mann", "apu nahasapeemapetilon", "nelson muntz", "milhouse van houten", "martin prince", "ralph wiggum", "timothy lovejoy", "clancy wiggum", "duffman", "krusty the clown", "sideshow bob"];

var topics = [
  "Homer Simpson",
  "Marge Simpson",
  "Bart Simpson",
  "Lisa Simpson",
  "Maggie Simpson"
];




// alert("Check the console for a list of Simpson Characters to choose from");
// console.log(characterscomp);

// create buttons for initial topics
createBtn();
function createBtn() {
  $("#cb").empty();
  for (var i = 0; i < topics.length; i++) {
    var people = $("<button>");
    people.addClass("btn btn-light");
    people.attr("data-person", topics[i]);
    people.text(topics[i]);
    $(".container-button").append(people);

  }
}
// // capture user input and create new button
$("#sbutton").on("click", function (event) {
  event.preventDefault();
  var charactersearch = $("#searchInput").val().trim().toLowerCase();
  console.log(charactersearch);

  if (topics.indexOf(charactersearch) >= 0) {
    // ("#searchInput").val("")
    clearMe()
    alert('Character is already Added')



  }
  else if (topics.indexOf(charactersearch) < 0) {

    if (characterscomp.indexOf(charactersearch) >= 0) {

      topics.push(charactersearch)
      createBtn();
      clearMe()
      console.log(topics);



    } else {
      clearMe()
      alert("This is not a simpsons Character")

    }

  }





});

// click function to call to API for Gifs
//i < 10 to only grab 10 images per brief
// add gifs to html in container

$("button").on("click", function () {
  $("#gifs-appear-here").empty();
  var person = $(this).attr("data-person");
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?q=" +
    person +
    "&api_key=vRYMkt8tI5f2mULNneF5ebG8jemFv7US";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    var results = response.data;
    for (var i = 0; i < 10; i++) {
      var gifDiv = $("<div>");
      var rating = results[i].rating;
      var p = $("<p>").text("Rating: " + rating);
      var personImage = $("<img>");
      personImage.attr("id", "gifs");
      personImage.attr("src", results[i].images.fixed_height_still.url);
      personImage.attr("data-alt", results[i].images.fixed_height.url)
      gifDiv.prepend(p);
      gifDiv.prepend(personImage);
      $("#gifs-appear-here").prepend(gifDiv);
      personImage.on("click", function () {
        var img = $(this);
        var src = img.attr("src");
        var imgAlt = img.attr("data-alt");
        img.attr("src", imgAlt);
        img.attr("data-alt", src);
      });
    }
  });
});
// $("#cb").append(people);


function clearMe() {
  $("#searchInput").val("")

}






