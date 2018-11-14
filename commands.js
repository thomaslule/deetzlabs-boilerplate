module.exports = {

  // we dont want to store messages because of privacy reasons
  // as soon as the message enter the system, it is transformed to an object
  messageToObject: message => ({
    // why "true : undefined"
    // to save space, the message simply wont have the gg property if its not gg
    commandsCommand: message.trim().toLowerCase() === '!commands' ? true : undefined,
    achievementsCommand: message.trim().toLowerCase() === '!achievements' ? true : undefined,
  }),

  commands: [
    {
      // to see the different events you can react to, visit: https://github.com/thomaslule/deetzlabs/blob/master/src/domain/viewer/events.ts
      when: event => event.type === 'got-achievement',

      // this function can use the following args:
      // { event, viewerName, viewerAchievements, options }
      // event: the event that triggered the command
      // viewerName: the viewer's display name
      // viewerAchievements: an array of all the viewers achievements
      // options: the deetzlabs complete configuration (this is the object we used in the constructor + the default options)
      say: ({ event, viewerName, options }) => (
        `${viewerName} just got the achievement ${options.achievements[event.achievement].name}!`
      ),
    },
    {
      when: event => event.type === 'sent-chat-message' && event.message.commandsCommand,
      say: () => 'Say !achievements to see your current achievements',
    },
    {
      when: event => event.type === 'sent-chat-message' && event.message.achievementsCommand,
      say: ({ viewerName, viewerAchievements, options }) => {
        const achievements = viewerAchievements.map(a => options.achievements[a].name).join(', ');
        return viewerAchievements.length === 0
          ? `${viewerName} doesn't have any achievement but their time will come!`
          : `Congratulations ${viewerName} for your achievements: ${achievements}`;
      },
    },
  ],

};
