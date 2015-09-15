$(document).ready(function(){
  debugger;
  var $body = $('.tweetList');
  //$body.html('');    
  var index = streams.home.length - 1;
  while(index >= 0){
    var tweetContainer = '<div></div>';
    var tweet = streams.home[index];
    //var $tweet = $('li');
    var user = tweet.user;// need to insert a link for a modal for the user
    //$tweet.text('@' + user + ': ' + tweet.message + ' at ' + tweet.created_at);
    var message = '<li>' + tweet.message + '</li>';
    $(message).appendTo($body);
    index -= 1;
  }  
});