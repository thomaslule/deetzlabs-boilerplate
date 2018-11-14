module.exports = {

  // we dont want to store messages because of privacy reasons
  // as soon as the message enter the system, it is transformed to an object
  messageToObject: message => ({
    // why "true : undefined"
    // to save space, the message simply wont have the gg property if its not gg
    gg: message.trim().toLowerCase() === 'gg' ? true : undefined,
  }),

  achievements: {

    // An achievement for everyone who gives money
    benefactor: {
      name: 'Benefactor',
      text: 'Thanks for your support %USER%',
      // to see the different events you can react to, visit: https://github.com/thomaslule/deetzlabs/blob/master/src/domain/viewer/events.ts
      distributeWhen: (state, event) => (
        event.type === 'subscribed'
        || event.type === 'gave-sub'
        || event.type === 'cheered'
        || event.type === 'donated'
      ),
    },

    // An achievement for everyone who hosts the channel
    advertiser: {
      name: 'Advertiser',
      text: '%USER% helps us to become famous',
      distributeWhen: (state, event) => event.type === 'hosted' || event.type === 'raided',
    },

    // An achievement for everyone who says gg at least 5 times
    supporter: {
      name: 'Supporter',
      text: '%USER% is a real cheerleader',
      reducer: (count = 0, event) => {
        if (event.type === 'sent-chat-message' && event.message.gg /* see messageToObject above */) {
          return count + 1;
        }
        return count;
      },
      distributeWhen: (state, event) => event.type === 'sent-chat-message' && event.message.gg && state >= 5,
    },

    // Complex example here: an achievement for someone who is present 3 streams in a row
    assiduous: {
      name: 'Assiduous',
      text: '%USER% doesn\'t let us down',
      reducer: (streak = [], event) => {
        if (event.type === 'sent-chat-message' && event.broadcastNo !== undefined) {
          if (streak.length === 0) {
            // begins a streak
            return [event.broadcastNo];
          }
          if (streak[streak.length - 1] === event.broadcastNo) {
            // this broadcast is already in the streak
            return streak;
          }
          if (streak[streak.length - 1] === event.broadcastNo - 1) {
            // new message in broadcast just after the last one, add it to the streak
            return streak.concat(event.broadcastNo);
          }
          // streak broken
          return [];
        }
        return streak;
      },
      distributeWhen: streak => streak.length >= 3,
    },
  },

};
