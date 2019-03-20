$(document).ready(function(){
function renderTweets(tweets) {
  for(let i = 0; i < tweets.length; i ++){
    createTweetElement(tweets[i]).prependTo('#tweetContainer');
  }
}

function createTweetElement(tweet){
  let $tweet = $('<article>').addClass('new-tweet');

  $tweet.append($("<header>")
        .append($("<img>").attr("src", tweet.user.avatars.small))
        .append($("<h4>").text(tweet.user.name))
        .append($("<h6>").text(tweet.user.handle)))

  $tweet.append($("<p>").text(tweet.content.text))
        .append($("<footer>")
        .append($("<div>").addClass("tweetContainer").text(tweet.created_at))
        .append($("<div>").addClass("iconContainer")
          .append($("<img>").addClass("icons").attr("src", "https://cdn3.iconfinder.com/data/icons/nautical-icons/512/Flag-512.png"))
          .append($("<img>").addClass("icons").attr("src", "https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/heart-outline-512.png"))
          .append($("<img>").addClass("icons").attr("src", "https://cdn2.iconfinder.com/data/icons/flat-and-simple-pack-3/512/2_Arrow_circle_history_refresh-512.png")))

        )
  return $tweet;
};

$('#submit-new-tweet').submit(function(event) {
  event.preventDefault(); 

  const $serializedTweet = $(this).serialize();

  let limit = ($(this)[0][0].value.length);

  if(limit === 0){
    alert("Please enter some text");
  } else if (limit > 140){
    alert("Your tweet is too long!!!");
  } else {
    $.ajax({
      method: 'POST',
      url: '/tweets',
      data: $serializedTweet
    })
  }
})

function loadTweets() {
  $.get("/tweets", function(data){
    renderTweets(data);
  })
}
loadTweets();

})



