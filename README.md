# TwitchIRC
This is a basic twitch chat client made in NodeJS, under heavy development.


#HOW TO INSTALL
TwitchIRC requires a few NodeJS packages, as well as NodeJS itself. you can get NodeJS from https://nodejs.org/
Then, install the following package names using Command Prompt, or whatever mac / linux uses:

npm i tmi.js

npm i prompt

npm i strsplit


#HOW TO USE
  1. To use TwitchIRC, you first must get your oauth token from twitch, to do so, log into your twitch account through the main      page, then go here: https://twitchapps.com/tmi Click "connect with twitch" and accept. Then, copy the oauth token it gives       you (INCLUDING "oauth:") and paste it in the configuration part of the TwitchIRC.js file (at the top)
  2. Then, put your twitch username in all lowercase in the username section of the config.
  3. Finally, go into command prompt (or whatever mac / linux uses) and go to whatever folder you put the file into using cd         (mine is on my desktop) then type (without quotes): node twitchirc <the streamer's name>
