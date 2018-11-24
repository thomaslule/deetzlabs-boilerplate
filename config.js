const secretConfig = require('./config-secret');
const achievements = require('./achievements');
const commands = require('./commands');

module.exports = {
  ...secretConfig,
  log_to_console: false,
  log_to_file: true,
  widgets_folder: `${__dirname}/widgets`,
  commands: commands.commands,
  achievements: achievements.achievements,
  messageToObject: msg => ({
    ...commands.messageToObject(msg),
    ...achievements.messageToObject(msg),
  }),
};
