$(document).ready(function(){
  
  function renderTweets(tweets) { //loop through array of objects and pass each one to createTweetElement
    for(let i = 0; i < tweets.length; i ++){
      createTweetElement(tweets[i]).prependTo('#tweetContainer');
    }
  }

  function createTweetElement(tweet){ //Take in a tweet object and convert it to a HTML tweet
    let $tweet = $('<article>').addClass('new-tweet');

    let x = new Date(tweet.created_at);
    let dateString = x.toDateString();
    let timeString = x.toLocaleTimeString();
    let finalDate = `${dateString} ${timeString}`; //convert unix timestamp to readable date

    $tweet.append($("<header>")
          .append($("<img>").attr("src", tweet.user.avatars.small))
          .append($("<h4>").text(tweet.user.name))
          .append($("<h6>").text(tweet.user.handle)))

    $tweet.append($("<p>").addClass("textWrap").text(tweet.content.text))
          .append($("<footer>")
          .append($("<div>").addClass("tweetContainer").text(finalDate))
          .append($("<div>").addClass("iconContainer")
            .append($("<img>").addClass("icons").attr("src", "https://cdn3.iconfinder.com/data/icons/nautical-icons/512/Flag-512.png"))
            .append($("<img>").addClass("icons").attr("src", "https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/heart-outline-512.png"))
            .append($("<img>").addClass("icons").attr("src", "https://cdn2.iconfinder.com/data/icons/flat-and-simple-pack-3/512/2_Arrow_circle_history_refresh-512.png")))
          )
    return $tweet;
  };

  function loadTweet() { //GET request to load tweets
    
    $.ajax('/tweets', {
      method: 'GET',
      success: function (data) {
        renderTweets(data)
      }
    })
  };

  loadTweet(); //Ensures stored tweets are loaded when page is opened

  $('.compose').click(function(){ // click compose button to toggle slide on text input
    $('.container').slideToggle('fast');
    $('.textBox').focus();
  })

  $('.error').hide(); //hide error message on load
  $('.container').hide(); //hide tweet form on load

  $('#submit-new-tweet').submit(function(event) { 
    event.preventDefault(); 

    const $serializedTweet = $(this).serialize();

    let limit = ($(this)[0][0].value.length); //Length of message in textbox

    if(limit === 0){ //Run validation tests to check if tweets are valid
      $('.error').text('Error: You need to type something...');
      $('.error').slideDown('fast');
    } else if (limit > 140){
      $('.error').text('Error: Your message is too long!');
      $('.error').slideDown('fast');
    } else {

      $.ajax({ //POST request for adding new tweets
        method: 'POST',
        url: '/tweets',
        data: $serializedTweet,
        success: function(data){
          $('.error').hide(); //Hide error message when user resumes typing
          loadTweet();
          $('#tweetContainer').empty(); //Prevent tweets from being duplicated
          $('.textBox').val('');

        }
      })
    }
  })
})



