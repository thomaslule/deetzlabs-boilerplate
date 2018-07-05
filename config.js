module.exports = {
  port: 3100,
  db_url: 'postgresql://postgres:admin@localhost:5432/deetzlabs',
  channel: 'some_twitch_channel',
  client_id: '', // get it by registering a twitch app https://dev.twitch.tv/dashboard/apps/create (Redirect URI is not used)
  client_secret: '', // secret of your registered twitch app
  streamer_token: '', // create your token here https://twitchapps.com/tmi/
  bot_name: '', // twitch bot login
  bot_token: '', // create your token here https://twitchapps.com/tmi/
  streamlabs_socket_token: '', // get yours here https://streamlabs.com/dashboard#/apisettings in API TOKENS then "your socket API token"
  self_url: '', // url to your app
  secret: '', // any random string
  achievements_command: { // the command to see your own achievements
    isCommand: message => message === '!achievements',
    answer: 'Congratulations %USER% for your achievements: %ACHIEVEMENTS%',
    answer_none: '%USER% doesn\'t have any achievement but their time will come!',
  },
  commands_command: { // the command to list the bot's commands
    isCommand: message => message === '!commands',
    answer: 'Say !achievements to see your current achievements',
  },
  logins: {
    // key-value username => password
    // password hashed with sha256 (you can use ./hashPassword.js to create your hash)
  },
  log_to_console: true,
  log_to_file: true,
};
