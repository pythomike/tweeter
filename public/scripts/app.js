//var db = require('../server/lib/in-memory-db.js')(db)
var data = [
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
      "text": "<script>alert('uh oh!')</script>"
    },
    "created_at": 1461113796368
  }
];
 
$(function(){

  function renderTweets(tweets) {
    for (let tweet of tweets){
      $('#tweets').prepend(createTweetElement(tweet));
    }
  }
  
  function getTweets(){
    $.ajax({
      method: 'get',
      url: '/tweets/',
    }).done(function(json) {
    renderTweets(json)
    })
  }

function createTweetElement(tweet) {
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
                text: tweet.created_at
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

  $('#new-tweet').on('submit', function (event) {
    event.preventDefault();
    var textArea = this;
    console.log(this)
    var mdata = $(this).serialize();
    console.log(mdata)
    $.ajax({
      method: 'post',
      url: '/tweets/',
      data: mdata
    }).done(function () {
      textArea.reset();

      renderTweets(data);
    });
  })

  // Why does renderTweets error out when it is in the event handler for the form submission?
  // There isn't enough info in here, where am I calling the data-helpers functions
  
  
  getTweets()

})