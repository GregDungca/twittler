var $tweetList = $('.tweet-list');
var index1, index2;
$(document).ready(function(){ 
  index1 = 0;
  index2 = streams.home.length;
  getNewTweets();

  setInterval(checkNewTweets, 10000);


  $('button.show-more').on('click', function() {
    $('div.show-more').hide();//optionally animate this
    getNewTweets();
  });

  $('.user').on('click', function(event) {
    var $userTweetList = $('.user-tweet-list');
    event.preventDefault();
    $('#user-modal').modal();
    var userName = $(this).find('a').data('user');
    var uIndex1 = 0;
    var uIndex2 = streams.users[userName].length;
    getNewUserTweets();
    var intervalCheck = setInterval(checkNewUserTweets, 10000);

    $('#user-modal').on('hide.bs.modal', function() {
      console.log('Model is hidden');
      clearInterval(intervalCheck);
    });

    function getNewUserTweets() {
      for ( var i = uIndex1; i < uIndex2; i ++ ) {
        var tweet = streams.users[userName][i];
        var user = '<span class="user">' + tweet.user + '</span>';
        var messageTime = '<span class="message-time">' + extractTime(tweet.created_at) + '</span>';
        var message = '<div class="message">' + tweet.message + '</div>';
        var tweetContainer = '<div class="tweet-container">' + user + ' ' + messageTime + message + '</div>';
        $(tweetContainer).prependTo($userTweetList);
      }
      uIndex1 = uIndex2;
    }

    function checkNewUserTweets() {
        uIndex2 = streams.home.length - 1;
        if (uIndex2 > uIndex1) {
          var numNewTweets = uIndex2 - uIndex1;
          if ($('div.user-show-more').css('display') === 'none') {
            $('div.user-show-more').show();
          }
          $('#num-new-user-tweets').text(numNewTweets);
        }
    }

  });

});


function extractTime(rawTime) {
  var rawTimeArray = rawTime.toString().split(' ');
  return rawTimeArray[1] + ' ' + rawTimeArray[2] + ' ' + rawTimeArray[4];
//   Thu Sep 17 2015 17:02:53 GMT-0400 (EDT)
}

function getNewTweets() {
  for ( var i = index1; i < index2; i ++ ) {
    var tweet = streams.home[i];
    var user = '<span class="user"><a href="#" data-user="' + tweet.user + '"">' + tweet.user + '</a></span>';
    var messageTime = '<span class="message-time">' + extractTime(tweet.created_at) + '</span>';
    var message = '<div class="message">' + tweet.message + '</div>';
    var tweetContainer = '<div class="tweet-container">' + user + ' ' + messageTime + message + '</div>';
    $(tweetContainer).prependTo($tweetList);
  }
  index1 = index2;
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


