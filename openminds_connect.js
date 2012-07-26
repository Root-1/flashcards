(function() {

window.om = window.om || {};
var om = window.om;

var DEFAULT_OPENMINDS_ROOT = 'http://api.openminds.io';
var DEFAULT_LOGIN_WINDOW_WIDTH = 415;
var DEFAULT_LOGIN_WINDOW_HEIGHT = 300;
var LOGIN_WINDOW_POLL_DURATION = 200;

/**
 * Shows an oAuth popup window to give the app permission to access the
 * OpenMinds API. If the user is not already signed in to OpenMinds in this
 * browser, they will need to sign in. If they have not previously granted
 * permissions to the app, they will need to do so next. Once the app has
 * permissions, OpenMinds will redirect the popup window to the URL specified
 * by the app. The API access token will be provided in the hash fragment of
 * the URL.
 * @param {Object} options The options for the log in call. Valid properties
 *  include:
 *  - appId: The OpenMinds app id.
 *  - apiRoot: The OpenMinds API root. If not specified, the production
 *    default is used.
 *  - redirectUri: The URI that will be loaded in the popup window before and
 *    after redirecting to the OpenMinds oAuth page.
 *  - width: The widh of the popup window (optional).
 *  - height: The widh of the popup window (optional).
 *  - callback: The function called after the popup window closes. The API
 *    access token is passed as the sole argument to the callback. If the user
 *    closes the popup window or does not allow API access to the app, the
 *    access token will be null or undefined.
 */
om.logIn = function(options) {
  var root = options.apiRoot || DEFAULT_OPENMINDS_ROOT;
  var url = root + '/dialog/oauth?';
  if (options.appId) {
    url += 'app_id=' + options.appId;
  }
  if (options.redirectUri) {
    url += '&redirect_uri=' + encodeURIComponent(options.redirectUri);
  }

  var width = options.width || DEFAULT_LOGIN_WINDOW_WIDTH;
  var height = options.height || DEFAULT_LOGIN_WINDOW_HEIGHT;
  var loginWindow = window.open(
      url,
      '_blank',
      'width=' + width + ',height=' + height);
  window.loginWindow = loginWindow;
  var timerId = window.setInterval(function() {
    if (loginWindow.closed || om.windowClosed) {
      window.clearInterval(timerId);
      om.windowClosed = false;
      om.accessToken = window.localStorage.getItem('omAccessToken');
      options.callback && options.callback(om.accessToken);
    }
  }, LOGIN_WINDOW_POLL_DURATION);
};


/**
 * Logs out the currently authenticated OpenMinds user.
 * @param {Function} callback Called once the user is logged out.
 */
om.logOut = function(callback) {
  // We're using an Image with the src URL set to the signout endpoint
  // in OpenMinds. This hack is the easiest way to do a cross-origin
  // request where we don't care about the response.
  var image = new Image();
  image.style.display = 'none';
  image.onload = callback;
  image.onerror = callback;
  image.src = 'http://openminds.io/auth/signout?no_redirect=1';
  document.body.appendChild(image);
  window.localStorage.removeItem('omAccessToken');
};

})();
