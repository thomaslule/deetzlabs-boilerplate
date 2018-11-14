module.exports = {
  port: 3100, // port to listen to in your server
  self_url: 'https://url-to-your-server.com',
  channel: 'your_twitch_channel',
  db_url: 'postgresql://postgres:admin@localhost:5432/deetzlabs', // connection string to the database
  client_id: '', // get it by registering a twitch app https://dev.twitch.tv/dashboard/apps/create (Redirect URI is not used)
  client_secret: '', // secret of your registered twitch app
  bot_name: '', // twitch bot login
  bot_token: '', // create your token here https://twitchapps.com/tmi/
  streamlabs_socket_token: '', // get yours here https://streamlabs.com/dashboard#/apisettings in API TOKENS then "your socket API token"
  secret: '', // any random string
  logins: {
    // logins to the admin app
    // key-value username => password
    // password hashed with sha256 (you can use ./hashPassword.js to create your hash)
  },
};
