$(document).ready(function(){
  //debugger;
  var $body = $('.tweetList');
  //$body.html('');    
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweet = streams.home[index];
    var message = '<div>' + tweet.message + '</div>';
    var user = tweet.user;// need to insert a link for a modal for the user
    var tweetContainer = '<div class="tweet-container">' + message + '</div>';
    
    //var $tweet = $('li');
    
    //$tweet.text('@' + user + ': ' + tweet.message + ' at ' + tweet.created_at);
    
    $(tweetContainer).prependTo($body);
    index -= 1;
  }  
});