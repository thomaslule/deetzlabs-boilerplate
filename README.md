# deetzlabs-boilerplate
Add viewer achievements and credits to a twitch stream.

## prerequisites
- node.js
- a postgres database initialized with this schema: https://github.com/thomaslule/deetzlabs/blob/master/db/schema.sql

## install
```bash
git clone https://github.com/thomaslule/deetzlabs-boilerplate.git
npm install
```

## configure
- edit `config.js` to setup your own config
- edit `achievements.js` to customize your own achievements
- edit `widgets/achievement` and `widgets/credits` to customize the look of your achievements and credits

## use
```bash
npm start
```
It will connect the bot to the twitch channel, begin to monitor events and start an http server.

You can now access those urls:

- `http://localhost:3100/admin` the admin interface
- `http://localhost:3100/widgets/credits` the credits screen
- `http://localhost:3100/widgets/achievement` the achievement alert
- `http://localhost:3100/widgets/followers_goal` a followers goal (I added this because streamlabs didnt work correctly)

(add the widgets to your stream using your stream software, for example with OBS add a "browser source" and enter the url)

You can also type !commands or !achievements in the twitch chat to interact with the bot.
