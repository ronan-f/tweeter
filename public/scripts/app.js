$(document).ready(function(){
  
  function renderTweets(tweets) {
    for(let i = 0; i < tweets.length; i ++){
      createTweetElement(tweets[i]).prependTo('#tweetContainer');
    }
  }

  function createTweetElement(tweet){
    let $tweet = $('<article>').addClass('new-tweet');

    let x = new Date(tweet.created_at);
    let dateString = x.toDateString();
    let timeString = x.toLocaleTimeString();
    let finalDate = `${dateString} ${timeString}`;

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

  function loadTweet() {
    
    $.ajax('/tweets', {
      method: 'GET',
      success: function (data) {
        renderTweets(data)
      }
    })
  };

  loadTweet();

  $('.compose').click(function(){ // click compose button to toggle slide on text input
    $('.container').slideToggle('fast');
    $('.textBox').focus();
  })

  $('.error').hide(); //hide error message on load
  $('.container').hide(); //hide tweet form on load

  $('#submit-new-tweet').submit(function(event) {
    event.preventDefault();

    const $serializedTweet = $(this).serialize();

    let limit = ($(this)[0][0].value.length);

    if(limit === 0){
      $('.error').text('Error: You need to type something...');
      $('.error').slideDown('fast');
    } else if (limit > 140){
      $('.error').text('Error: Your message is too long!');
      $('.error').slideDown('fast');
    } else {

      $.ajax({
        method: 'POST',
        url: '/tweets',
        data: $serializedTweet,
        success: function(data){
          $('.error').hide();
          loadTweet();
          $('#tweetContainer').empty();

        }
      })
    }
  })
})



