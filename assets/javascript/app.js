$('document').ready(function() {

    var doggoTypes = ['yellow labrador', 'black labrador', 'chocolate labrador', 'golden retriever', 'huskie', 'border collie', 'german shepherd', 'corgi', 'french bulldog', 'pug'];

    function pupulateButtons() {
        $('#button-div').empty();
        for (var i = 0; i < doggoTypes.length; i++) {
        var doggoButtons = $('<button>');
        doggoButtons.text(doggoTypes[i]);
        doggoButtons.addClass('btn btn-primary doggo-button');
        doggoButtons.attr('breed', doggoTypes[i])
        $('#button-div').append(doggoButtons);
        }
    }

    $('body').on('click', '#add-breed', function (event) {
        event.preventDefault();
        var newBreed = $('#doggo-breed').val().trim();
        doggoTypes.push(newBreed);
        pupulateButtons();
    })

    $('body').on('click', '.doggo-button', function() {
        $('#gif-div').empty();
        var doggoBreed = $(this).attr('breed')
        var limit = '&limit=10';
        var queryURL = 'https://api.giphy.com/v1/gifs/search?q=' + doggoBreed + '&api_key=1mKgBX5wzLEk4GM2mPZFKScDuYqqIOyR' + limit;
        $.ajax({
            url: queryURL,
            method: "GET",
        }).then(function(response) {
            for (var i = 0; i < response.data.length; i++) {
                
            var everyGifDiv = $('<div>');
            everyGifDiv.addClass('pupperGifDiv');

            var everyGif = $('<img>');
            everyGif.attr('src', response.data[i].images.fixed_height_still.url);
            everyGif.data('data-still', response.data[i].images.fixed_height_still.url);
            everyGif.data('data-animate', response.data[i].images.fixed_height.url);
            everyGif.data('data-state', 'still');
            everyGif.addClass('pupperGif');
            everyGif.addClass(response.data[i].slug);
            everyGifDiv.append(everyGif);

            var everyGifRating = $('<div>');
            everyGifRating.html('<h3>Rating: ' + (response.data[i].rating).toUpperCase() + '</h3>');
            everyGifRating.addClass('pupperGifRating');
            everyGifDiv.append(everyGifRating);

            $('#gif-div').append(everyGifDiv);
            }
        });
    });

    $('body').on('click', '.pupperGif', function() {
        var state = $(this).data('data-state');
        if (state === 'still') {
            $(this).attr('src', $(this).data('data-animate'));
            $(this).data('data-state', 'animate');
            state = $(this).data('data-state');
            console.log(state);
        } else {
            $(this).attr('src', $(this).data('data-still'));
            $(this).data('data-state', 'still');
            state = $(this).data('data-state');
            console.log(state);
        }
    })

    pupulateButtons();

});