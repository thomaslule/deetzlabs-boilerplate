const { viewerEvents, streamEvents } = require('deetzlabs');

const isViewerEvent = event => event.aggregate === 'viewer';
const isStreamEvent = event => event.aggregate === 'stream';

module.exports = {
  // Dont delete this, its used by the "test achievement" button
  testing: {
    name: 'Testing',
    text: 'The admin is testing things',
    reducer: () => ({ distribute: false }),
  },

  // An achievement for everyone who gives money
  benefactor: {
    name: 'Benefactor',
    text: 'Thanks for your support %USER%',
    reducer: (state, event) => {
      if (isViewerEvent(event) && (
        event.type === viewerEvents.subscribed
        || event.type === viewerEvents.cheered
        || event.type === viewerEvents.donated)) {
        return { distribute: true };
      }
      return { distribute: false };
    },
  },

  // An achievement for everyone who hosts the channel
  advertiser: {
    name: 'Advertiser',
    text: '%USER% helps us to become celebrities',
    reducer: (state, event) => {
      if (isViewerEvent(event) && event.type === viewerEvents.hosted) {
        return { distribute: true };
      }
      return { distribute: false };
    },
  },

  // An achievement for everyone who says gg at least 5 times
  supporter: {
    name: 'Supporter',
    text: '%USER% is a real cheerleader',
    reducer: (state = { distribute: false, count: 0 }, event) => {
      if (isViewerEvent(event)
      && event.type === viewerEvents.sentChatMessage
      && event.message.trim().toLowerCase() === 'gg') {
        return {
          count: state.count + 1,
          distribute: state.count + 1 >= 5,
        };
      }
      return { ...state, distribute: false };
    },
  },

  // Complex example here: an achievement for someone who is present 3 streams in a row
  assiduous: {
    name: 'Assiduous',
    text: '%USER% don\'t let us down',
    reducer: (state = {
      distribute: false, streak: 0, broadcasting: false, wasHere: false,
    }, event) => {
      if (isStreamEvent(event) && event.type === streamEvents.begun) {
        return {
          ...state,
          distribute: false,
          wasHere: false,
          broadcasting: true,
        };
      }
      if (isStreamEvent(event) && event.type === streamEvents.ended) {
        return {
          ...state,
          distribute: false,
          broadcasting: false,
          streak: state.wasHere ? state.streak + 1 : 0,
        };
      }
      if (isViewerEvent(event)
        && event.type === viewerEvents.sentChatMessage
        && state.broadcasting) {
        return {
          ...state,
          wasHere: true,
          distribute: state.streak + 1 >= 3,
        };
      }
      return { ...state, distribute: false };
    },
  },
};
