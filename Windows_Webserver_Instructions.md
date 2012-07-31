## Running the Flashcards Demo App from your Windows machine.

### Get a Webserver running.

You can use any webserver that you are familiar with, but Apache is a good choice.
* 1. Download and install Apache. (Here are the instructions)
* 2. You have to configure your Webserver.


### Instructions for downloading and running Apache on your machine
* 1. http://webdesign.about.com/cs/apache/a/aainstapachewin.htm is a good place to start.
* 2. http://www.thesitewizard.com/apache/install-apache-2-windows.shtml


### Configuring the Apache Webserver
* 1. Go to your Apache directory.
* 2. `cd` into the conf directory.
* 3. Look for the httpd.conf file. This is where you make changes to your webserver configuration.
Uncomment the line `#LoadModule userdir_module modules/mod_userdir.so` by removing the `#` at the front.

`LoadModule userdir_module modules/mod_userdir.so`

* 4. Uncomment the line #Include conf/extra/httpd-userdir.conf. This allows you to set a home directory in your webserver.

`# User home directories`

`Include conf/extra/httpd-userdir.conf`

* 5. `cd` to the extra directory, and open the file http-userdir.conf for editing. (Notepad or any text editor will do, but don't use MS-Word.)
**  5a. Uncomment the line #UserDir "My Documents/My Website" and tell it which directory you'd like to be your UserDir
**  5b. Change the line <Directory "C:/Documents and Settings/*/My Documents/My Website"> to point to your UserDir

* 6. Test that the webserver is picking up the index.html placed in your UserDir correctly.

* 7. If you are able to see the flashcards page, (under your home directory) then your webserver is configured correctly. Follow the instructions in README to register your App and to modify flashcards.js