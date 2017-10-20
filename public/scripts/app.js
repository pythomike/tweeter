$(function(){

  function renderTweets(tweets) {
    for (let tweet of tweets){
      $('#tweets').prepend(createTweetElement(tweet));
    }
  }
  
  function loadTweets(){
    $.ajax({
      method: 'get',
      url: '/tweets/',
    }).done(function(json) {
    renderTweets(json)  
    })
  }

function createTweetElement(tweet) {
let timeStamp = moment(tweet.created_at).fromNow()
  return $('<article>', {
    'class': 'tweet',
    html: [
      $('<header>', {
        html: [
          $('<img>', {
            'class': 'tweet-logo',
            'src': tweet.user.avatars.regular
          }),
          $('<h3>', {
            text: tweet.user.name
          }),
          $('<p>', {
            'class': 'handle',
            text: tweet.user.handle
          })
        ]
      }),
      $('<p>', {
        text: tweet.content.text
      }),
      $('<footer>', {
        html: [
          $('<div>', {
            'class': 'footer-time',
            html: [
              $('<p>', {
                text: timeStamp
              })
            ]
          }),
          $('<div>', {
            'class': "footer-icons",
            html: [
              $('<i>', {
                'class': "fa fa-fire-extinguisher",
              }),
              $('<i>', {
                'class': "fa fa-retweet",
              }),
              $('<i>', {
                'class': "fa fa-heart",
              })
            ]
          })
        ]
      })
    ]
  });
}

$("#compose").on("click", function() { 
  $(".container").find(".new-tweet").slideToggle()
  $(".container").find('textarea').focus();
})

  $('#new-tweet').on('submit', function (event) {
    event.preventDefault();
    var textArea = this;
    var data = $(this).serialize();
    var charCheck = data.length -5
    
    if (charCheck > 140){
      alert("Please make your tweet 140 characters or fewer")
    } else if (charCheck < 1){
      alert("You need to actually tweet something though...")
    } else {
      $.ajax({
        method: 'post',
        url: '/tweets/',
        data: data
      }).done(function () {
        textArea.reset();
      })
        loadTweets();             //Render tweets no longer works...da fuq?!
    }
  })
    
  loadTweets()

})