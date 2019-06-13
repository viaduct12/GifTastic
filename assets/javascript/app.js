var relation = ["single guys", "single ladies", "wholesome guys", "wholesome girls", "rejected guys", "rejected girls", "dating", "friend zone", "long distance", "heartbroken", "RBF"];

$(document).ready(function () {

  $(document).on("click","button" ,function () {
    var love = $(this).attr("data-love");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      love + "&api_key=8F8iR64VM6ToG0vHUFLpyVSvxudfTD2O&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function (response) {
        var results = response.data;

        for (var i = 0; i < results.length; i++) {

          var gifHouse = $("<span>");
          gifHouse.addClass("img-container");

          var gifDiv = $("<img>");
          gifDiv.addClass("gif");
          gifDiv.attr({
            "src": results[i].images.fixed_height_small_still.url,
            "data-still": results[i].images.fixed_height_small_still.url,
            "data-animate": results[i].images.fixed_height_small.url,
            "data-state": "still"
          });

          var rating = results[i].rating;
          // var ratingDiv = $("<span>");
          // ratingDiv.addClass("top-left");

          gifDiv.text("Rating: " + rating.toUpperCase());
          // gifHouse.append(ratingDiv);
          gifHouse.append(gifDiv);
          // gifHouse.append(ratingDiv);

          $("#gifs-appear-here").prepend(gifHouse);
          // $("#gifs-appear-here").append(ratingDiv);
        }
      });
  });

  $(document).on("click", ".gif", function () {
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });


});

function renderButtons() {

  $("#buttons-view").empty();

  for (var i = 0; i < relation.length; i++) {

    var a = $("<button>");
    a.addClass("love-names");
    a.attr("data-love", relation[i]);
    a.text(relation[i]);
    $("#buttons-view").append(a);
  }
}

$("#add-love").on("click", function (event) {
  event.preventDefault();
  var loveLies = $("#love-input").val().trim();

  relation.push(loveLies);

  renderButtons();

});


// $(document).on("click", ".love-names", alertLove);

renderButtons();