// Initial array of animals
        var animals = ["cat", "dog", "rabbit", "lion"];

        // Function for displaying animal data
        function renderButtons() {

            $("#buttons-view").empty();
            // Loops through the array of animals
            for (var i = 0; i < animals.length; i++) {

                var a = $("<button>");
                // Adds a class of animal to our button
                a.addClass("animal");
                // Added a data-attribute
                a.attr("data-name", animals[i]);
                // Provided the initial button text
                a.text(animals[i]);
                // Added the button to the buttons-view div
                $("#buttons-view").append(a);
            }
        }

        $("#add-animal").on("click", function(event) {
            event.preventDefault();

            var animal = $("#animal-input").val().trim();

            animals.push(animal);

            renderButtons();

        });

        $(document).on("click", ".animal", displayAnimalInfo);

        renderButtons();

        function displayAnimalInfo() {

            var animal = $(this).attr("data-name");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+" + animal + "&limit=8&api_key=dc6zaTOxFJmzC";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function(response) {

                var results = response.data
                $("#animals-view").empty();
                // Creates a div to hold the animal
                var gifDiv = $("<div>")

                console.log(response);
                // Retrieves the Rating Data
                for (var i = 0; i < results.length; i++) {
                    var animated = results[i].images.fixed_height.url;
                    var still = results[i].images.fixed_height_still.url;

                    var gifImage = $('<img>');
                    gifImage.attr('src', still);
                    gifImage.attr('data-still', still);
                    gifImage.attr('data-animate', animated);
                    gifImage.attr('data-state', 'still')
                    gifImage.addClass('gifImage');
                    gifDiv.append(gifImage)

                    gifDiv.append("<h1> Rating: " + results[i].rating + "</h1>");

                    $("#animals-view").prepend(gifDiv);

                };
                });

                  $(document).on("click", ".gifImage", function() {
                    var state = $(this).attr('data-state');

                    if (state == 'still') {
                        $(this).attr('src', $(this).data('animate'));
                        $(this).attr('data-state', 'animate');
                    } else {
                        $(this).attr('src', $(this).data('still'));
                        $(this).attr('data-state', 'still');
                    }
                  });
                };