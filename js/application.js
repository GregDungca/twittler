var $m = $('.main');
var index1, index2;
$(document).ready(function(){ 
  index1 = 0;
  index2 = streams.home.length;
  getNewTweets();

  setInterval(checkNewTweets, 8000);


  $m.find('a.show-more').on('click', function(event) {
    event.preventDefault();
    $m.find('div.show-more').slideUp();//optionally animate this
    getNewTweets();
  });

  $('.tweet-list').on('click', '.user', function(event) {
    var $um = $('#user-modal');
    event.preventDefault();
    $um.modal();
    var userName = $(this).find('a').data('user');
    var uIndex1 = 0;
    var uIndex2 = streams.users[userName].length;
    $um.find('.modal-title').text(userName);
    getNewUserTweets();
    var intervalCheck = setInterval(checkNewUserTweets, 8000);

    $um.find('a.show-more').on('click', function(event) {
      event.preventDefault();
      $um.find('div.show-more').slideUp();//optionally animate this
      getNewUserTweets();
    });

    $um.on('hide.bs.modal', function() {
      console.log('Model is hidden');
      clearInterval(intervalCheck);
      $um.find('.tweet-list').html('');
    });

    function getNewUserTweets() {
      for ( var i = uIndex1; i < uIndex2; i ++ ) {
        var tweet = streams.users[userName][i];
        var user = '<span class="user">' + tweet.user + '</span>';
        var messageTime = '<span class="message-time">' + extractTime(tweet.created_at) + '</span>';
        var message = '<div class="message">' + tweet.message + '</div>';
        var tweetContainer = '<div class="tweet-container">' + user + ' ' + messageTime + message + '</div>';
        $(tweetContainer).prependTo($um.find('.tweet-list'));
      }
      uIndex1 = uIndex2;
    }

    function checkNewUserTweets() {
        uIndex2 = streams.users[userName].length;
        if (uIndex2 > uIndex1) {
          var numNewTweets = uIndex2 - uIndex1;
          if ($um.find('div.show-more').css('display') === 'none') {
            $um.find('div.show-more').slideDown();
          }
          $um.find('#num-new-tweets').text(numNewTweets);
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
    $(tweetContainer).prependTo($m.find('.tweet-list'));
  }
  index1 = index2;
} 

function checkNewTweets() {
  index2 = streams.home.length;
  if (index2 > index1) {
    var numNewTweets = index2 - index1;
    if ($m.find('div.show-more').css('display') === 'none') {
      $m.find('div.show-more').slideDown();
    }
    $m.find('#num-new-tweets').text(numNewTweets);
  }
}


