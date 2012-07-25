// ADD YOUR OPENMINDS APP ID HERE
var APP_ID = '5010837a94d94a5b13000225';
// SPECIFY URL OF YOUR REDIRECT URL HERE
var REDIRECT_URI = 'http://root-1.github.com/flashcards/oauth_redirect.html';

// The OpenMinds API host.
var API_ROOT = 'https://api.openminds.io';
// Id of the list to fetch through the OpenMinds API.
var DEFAULT_LIST_ID = '4ffb717e94d94a744b000796';


/**
 *
 */
function init() {
  if (localStorage.getItem('omAccessToken')) {
    om.accessToken = localStorage.getItem('omAccessToken');
    postLogIn();
    $('#logged-out').hide();
  } else {
    $('#login').show();
    $('#logout').hide();
    $('#app').hide();
  }
}


/**
 * Logs the user in with OpenMinds and stores the API access token
 * in local storage. If the login is successful, start the flashcard app.
 */
function login() {
  om.logIn({
    appId: APP_ID,
    redirectUri: REDIRECT_URI,
    callback: function(accessToken) {
      if (accessToken) {
        postLogIn();
      }
    }
  });
}


/**
 * Logs the user out of OpenMinds and clears the access token from
 * local storage. Shows the logged-out view of the page.
 */
function logout() {
  om.logOut(function() {
    $('#app').hide();
    $('#logout').hide();
    $('#logged-out').show();
    $('#login').show();
  });
}


/**
 * Once we have an access token, fetch a list through the OpenMinds API
 * and start the flashcard app with the list.
 */
function postLogIn() {
  $('#login').hide();
  $('#logout').show();
  $('#logged-out').hide();
  getList(DEFAULT_LIST_ID, function(list) {
    startFlashcards(list);
  });
}


/**
 * Fetches the given list through the OpenMinds API.
 * @param {String} listId the id of the list to fetch from OpenMinds.
 * @param {Function} success The handler to call after fetching the list. The
 *   JSON list data is passed in as the first argument to the handler.
 */
function getList(listId, success) {
  $.ajax({
    url: API_ROOT + '/0/lists/' + listId,
    dataType: 'json',
    data: {
      'sort': 'adaptive',
      },
    headers: {
      'X-OpenMinds-Access-Token': om.accessToken,
      },
    success: success,
  });
}


/**
 * Creates the flashcards app using the given OpenMinds list.
 */
function startFlashcards(list) {
  var currentIndex = 0;

  function showCurrentFlashcard() {
    var item = list.items[currentIndex];
    $('#word').text(item.word);
    $('#defn').text(item.defn);
    $('#index').text((currentIndex+1) + '/' + list.items.length);
  }

  function showNextFlashcard() {
    currentIndex = (currentIndex + 1) % list.items.length;
    showCurrentFlashcard();
  }

  function showPrevFlashcard() {
    currentIndex = (currentIndex == 0) ? list.items.length - 1 : currentIndex - 1;
    showCurrentFlashcard();
  }

  $('#next').click(showNextFlashcard);
  $('#prev').click(showPrevFlashcard);
  $(window).keydown(function(e) {
    if (e.keyCode == 39) {
      showNextFlashcard();
    } else if (e.keyCode ==37) {
      showPrevFlashcard();
    }
  });

  // Render the list title and show the first flashcard.
  $('#title').text(list.title);
  $('#app').show();
  showCurrentFlashcard();
}
