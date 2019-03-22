"use strict";

module.exports = function makeDataHelpers(db) {
  return { 
    saveTweet: function(newTweet, callback) { // Saves a tweet to `db`
      db.collection("tweets").insertOne(newTweet);
        callback(null, true);        
    },
     getTweets: function (callback) {
      db.collection("tweets").find().toArray((err, tweets) => {
        if (err) {
          return callback(err);
        }
        callback(null, tweets);
      })
    }
  }
}
