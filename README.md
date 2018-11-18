# deetzlabs-boilerplate
Add viewer achievements and credits to a twitch stream.

## prerequisites
- node.js
- a postgres database initialized with this schema: https://github.com/thomaslule/deetzlabs/blob/master/src/schema.sql

## install
Fork this repository, clone it, then do `npm install`.

## configure
- `cp config-secret-template.js config-secret.js`
- edit `config-secret.js` to setup your own config
- edit `achievements.js` to customize your own achievements
- edit `commands.js` to customize your own chat commands
- edit `widgets/achievement` and `widgets/credits` to customize the look of your achievements and credits

## use
```bash
npm start
```
It will connect the bot to the twitch channel, begin to monitor events and start an http server.

You can now access those urls:

- `http://localhost:3100/admin` the admin interface
- `http://localhost:3100/widgets/credits` the credits screen
- `http://localhost:3100/widgets/achievement` the achievement alert (credits due to Gus Alaniz https://codepen.io/madebygus/)
- `http://localhost:3100/widgets/followers_goal` a followers goal (I added this because streamlabs didnt work correctly)

(add the widgets to your stream using your stream software, for example with OBS add a "browser source" and enter the url)

You can also type !commands or !achievements in the twitch chat to interact with the bot.

## rebuild
When you add an achievement or update the server you should rebuild the database by doing `npm run rebuild`.

Do it while the server is stopped.

It wont change the viewers acquired achievements but it will run achievements reducers against all the past events. This way, if you decide to add an achievement obtained after sending 500 messages in the chat, viewers who already sent them will get the achievement on their next message.
