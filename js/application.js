$(document).ready(function(){
  //debugger;
  var $body = $('.tweet-list');
  //$body.html('');    
  var index = streams.home.length - 1;
  debugger;
  while(index >= 0){
    var tweet = streams.home[index];
    var user = '<span class="user"><strong>' + tweet.user + '</strong></span>';// need to insert a link for a modal for the user
    var messageTime = '<span class="message-time">' + extractTime(tweet.created_at) + '</span>';
    var message = '<div class="message">' + tweet.message + '</div>';
    var tweetContainer = '<div class="tweet-container">' + user + ' ' + messageTime + message + '</div>';
    
    //var $tweet = $('li');
    
    //$tweet.text('@' + user + ': ' + tweet.message + ' at ' + tweet.created_at);


    
    $(tweetContainer).prependTo($body);
    index -= 1;
  }  
});


function extractTime(rawTime) {
  var rawTimeArray = rawTime.toString().split(' ');
  return rawTimeArray[1] + ' ' + rawTimeArray[2] + ' ' + rawTimeArray[4];
//   Thu Sep 17 2015 17:02:53 GMT-0400 (EDT)
}