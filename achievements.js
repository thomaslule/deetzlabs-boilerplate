module.exports = {

  // we dont want to store messages because of privacy reasons
  // as soon as the message enter the system, it is transformed to an object
  messageToObject: message => ({
    // why "true : undefined"?
    // to save space, the message simply wont have the gg property if its not "gg"
    gg: message.trim().toLowerCase() === 'gg' ? true : undefined,
  }),

  // check achievements.test.js to see how to be sure your achievements work as expected
  achievements: {

    benefactor: {
      name: 'Benefactor',
      text: 'Thanks for your support %USER%',
      // description is only visible in the admin app
      description: 'Distributed to anyone who gives money',
      // to see the different events you can react to, visit: https://github.com/thomaslule/deetzlabs/blob/master/src/domain/viewer/events.ts
      distributeWhen: (state, event) => (
        event.type === 'subscribed'
        || event.type === 'resubscribed'
        || event.type === 'gave-sub'
        || event.type === 'cheered'
        || event.type === 'donated'
      ),
    },

    advertiser: {
      name: 'Advertiser',
      text: '%USER% helps us to become famous',
      description: 'Distributed to anyone who hosts the channel',
      distributeWhen: (state, event) => event.type === 'hosted' || event.type === 'raided',
    },

    supporter: {
      name: 'Supporter',
      text: '%USER% is a real cheerleader',
      description: 'Distributed to anyone who says gg 5 times',
      // reducer will run on each event to let you store a state for this achievement
      // first arg is the previous state, 2nd arg is the event, it must return the new state
      reducer: (state = 0, event) => {
        if (event.type === 'sent-chat-message' && event.message.gg /* see messageToObject above */) {
          return state + 1;
        }
        return state;
      },
      // here, we use the state that we calculated from the viewer's events
      distributeWhen: (state, event) => event.type === 'sent-chat-message' && event.message.gg && state >= 5,
    },

    assiduous: {
      name: 'Assiduous',
      text: '%USER% doesn\'t let us down',
      description: 'Distributed to anyone who is here in chat 3 streams in a row',
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
