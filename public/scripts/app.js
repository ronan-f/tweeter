$(document).ready(function(){

  $('.error').hide(); //hide error message on load
  $('.container').hide(); //hide tweet form on load

  function renderTweets(tweets) { //loop through array of objects and pass each one to createTweetElement
    for(let i = 0; i < tweets.length; i ++){
      createTweetElement(tweets[i]).prependTo('#tweetContainer');
    }
  }

  function createTweetElement(tweet){ //Take in a tweet object and convert it to a HTML tweet
    let $tweet = $('<article>').addClass('new-tweet');
    let convertDate = new Date(tweet.created_at);
    let dateString = convertDate.toDateString();
    let timeString = convertDate.toLocaleTimeString();
    let finalDate = `${dateString} ${timeString}`; //convert unix timestamp to readable date

    $tweet.append($("<header>")
            .append($("<img>").attr("src", tweet.user.avatars.small))
            .append($("<h4>").text(tweet.user.name))
            .append($("<h6>").text(tweet.user.handle)))

    $tweet.append($("<p>").addClass("textWrap").text(tweet.content.text))
          .append($("<footer>")
            .append($("<div>").addClass("tweetContainer").text(finalDate))
            .append($("<div>").addClass("iconContainer")
              .append($('<i class="fas fa-flag"></i>').addClass("icons"))
              .append($('<i class="fas fa-heart"></i>').addClass("icons"))
              .append($('<i class="fas fa-retweet"></i>').addClass("icons")))
            )
    return $tweet;
  }

  function loadTweet() { //GET request to load tweets

    $.ajax('/tweets', {
      method: 'GET',
      success: function (data) {
        renderTweets(data)
      }
    })
  }

  loadTweet(); //Ensures stored tweets are loaded when page is opened

  $('.compose').click(function(){ // click compose button to toggle slide on text input
    $('.container').slideToggle('fast');
    $('.textBox').focus();
  })

  $('#submit-new-tweet').submit(function(event) {
    event.preventDefault();

    const $serializedTweet = $(this).serialize();
    const limit = ($(this)[0][0].value.length); //Length of message in textbox

    if(limit === 0 || !ctype_space($serializedTweet)){ //Run validation tests to check if tweets are valid
      $('.error').text('Error: You need to type something...').slideDown('fast');
    } else if (limit > 140){
      $('.error').text('Error: Your message is too long!').slideDown('fast');
    } else {

      $.ajax({ //POST request for adding new tweets
        method: 'POST',
        url: '/tweets',
        data: $serializedTweet,
        success: function(data){
          loadTweet();
          $('#tweetContainer').empty(); //Prevent tweets from being duplicated
          $('.textBox').val('');
          $('.counter').text('140');
        }
      })
    }
  })
})



