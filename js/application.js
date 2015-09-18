var $body = $('.tweet-list');
var index, updatedIndex;
$(document).ready(function(){
  //$body.html('');    
  index = streams.home.length - 1;
 
  index = getNewTweets(0);
  debugger;
  setInterval(checkNewTweets(index), 1500);
  $('button.show-more').on('click', function() {
    $('div.show-more').hide();//optionally animate this
    index = getNewTweets(updatedIndex, index);
  });

  // var showMore = '<div class="tweet-container">' + '<button class="show-more">Show more</button>' + '</div>';
  // $(showMore).prependTo($body);
  // $('.show-more').on('click', function() {
  //   getNewTweets(index);
  // })
});


function extractTime(rawTime) {
  var rawTimeArray = rawTime.toString().split(' ');
  return rawTimeArray[1] + ' ' + rawTimeArray[2] + ' ' + rawTimeArray[4];
//   Thu Sep 17 2015 17:02:53 GMT-0400 (EDT)
}

function getNewTweets(endIndex) {
  while(index >= endIndex){
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
  return streams.home.length - 1;

} 

function checkNewTweets(index) {
  console.log('checkNewTweets');
  var updatedIndex = streams.home.length - 1;
  if (updatedIndex > index) {
    var numNewTweets = updatedIndex - index;
    if ($('div.show-more').css('display') === 'none') {
      $('div.show-more').show();
      $('.num-new-tweets').text(numNewTweets);
    }
  }

}