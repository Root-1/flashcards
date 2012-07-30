## Flashcards Demo App

This repository contains a bare-bones Flashcards app to demonstrate how to integrate an app with the OpenMinds API. The project will evolve over time to showcase more features of the API and to highlight best practices when integrating with OpenMinds.

A demo of the app is available at [http://root-1.github.com/flashcards/](http://root-1.github.com/flashcards/).

### Installing the App

To run the app yourself, you will need to clone the repository and make the directory available through a web server like Apache.

#### Mac Instructions
1. Clone the repository into the `~/Sites` directory.
3. Open System Preference and click the "Sharing" icon.
4. Turn on "Web Sharing".
5. You can now access the app at `http://localhost/~YOUR_USERNAME/flashcards`, where YOUR_USERNAME is your Mac user name. Note that you will not be able to connect to OpenMinds until completing the steps in "Registering the App".

#### Windows Instructions
1. Install and run a webserver. We'll use Apache for this example.
1a. Your webserver should be able to access a "UserHome" directory. (See detailed instructions here.)
2. Clone the flashcards repository as a sub-directory in your UserHome directory.
3. Restart the webserver (Mandatory after making any config changes)
4. You can now access the app at `http://localhost/~YOUR_USERNAME/flashcards`, where YOUR_USERNAME is your Windows user name. Note that you will not be able to connect to OpenMinds until completing the steps in "Registering the App".

### Registering the App
1. Visit the [Applications Endpoint](http://openminds.io/api_explorer/applications_collection?url=%2Fdeveloper%2Fapps&method=POST) in the OpenMinds API Explorer.
2. In the "JSON Body", enter JSON with the listed properties. In particular, you must supply `name`, `url`, and `formats`.
    - Use your localhost URL above for the url
    - Use `["vocabulary"]` for formats.
3. Click "Submit". The Responses tab should open and show you the id of your app.
4. Copy the app id and paste it as the value of APP_ID in flashcards.js.
5. Replace REDIRECT_URI with your apps URL. Include `/oauth_redirect.html` at the end.
6. You should now be able to connect to OpenMinds and load data through the OpenMinds API.
