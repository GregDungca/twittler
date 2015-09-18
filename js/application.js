var $body = $('.tweet-list');
var index1, index2;
$(document).ready(function(){
  //$body.html('');    
  index1 = 0;
  index2 = streams.home.length - 1;
  getNewTweets();

  setInterval(checkNewTweets, 15000);
  $('button.show-more').on('click', function() {
    $('div.show-more').hide();//optionally animate this
    getNewTweets();
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

function getNewTweets() {
  for ( var i = index1; i < index2; i ++ ) {
    var tweet = streams.home[i];
    var user = '<span class="user"><strong>' + tweet.user + '</strong></span>';// need to insert a link for a modal for the user
    var messageTime = '<span class="message-time">' + extractTime(tweet.created_at) + '</span>';
    var message = '<div class="message">' + tweet.message + '</div>';
    var tweetContainer = '<div class="tweet-container">' + user + ' ' + messageTime + message + '</div>';
    $(tweetContainer).prependTo($body);
  }

  index1 = index2;
  // while(index >= updatedIndex){
  //   var tweet = streams.home[index];
  //   var user = '<span class="user"><strong>' + tweet.user + '</strong></span>';// need to insert a link for a modal for the user
  //   var messageTime = '<span class="message-time">' + extractTime(tweet.created_at) + '</span>';
  //   var message = '<div class="message">' + tweet.message + '</div>';
  //   var tweetContainer = '<div class="tweet-container">' + user + ' ' + messageTime + message + '</div>';
  //   $(tweetContainer).prependTo($body);
  //   index -= 1;
  // }

} 

function checkNewTweets() {
  
  index2 = streams.home.length - 1;
  if (index2 > index1) {
    var numNewTweets = index2 - index1;
    if ($('div.show-more').css('display') === 'none') {
      $('div.show-more').show();
      
    }
    $('#num-new-tweets').text(numNewTweets);
  }
}
