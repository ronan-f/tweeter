const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];
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




renderTweets(data);

})











