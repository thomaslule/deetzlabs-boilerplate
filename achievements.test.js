const { TestViewer } = require('deetzlabs');
const options = require('./config');

describe('achievements', () => {
  let viewer = new TestViewer(options);

  beforeEach(() => {
    viewer = new TestViewer(options);
  });

  describe('benefactor', () => {
    test('it should be distributed on cheer', async () => {
      await viewer.cheer(100, 'Cheer100 !');
      expect(viewer.hasAchievement('benefactor')).toBeTruthy();
    });

    test('it should be distributed on donation', async () => {
      await viewer.cheer(100, 'Cheer100 !');
      expect(viewer.hasAchievement('benefactor')).toBeTruthy();
    });

    test('it should be distributed on subscribe', async () => {
      await viewer.subscribe();
      expect(viewer.hasAchievement('benefactor')).toBeTruthy();
    });

    test('it should be distributed on resub', async () => {
      await viewer.resub(6);
      expect(viewer.hasAchievement('benefactor')).toBeTruthy();
    });

    test('it should be distributed on sub gift', async () => {
      await viewer.giveSub('some_viewer_id');
      expect(viewer.hasAchievement('benefactor')).toBeTruthy();
    });
  });

  describe('advertiser', () => {
    test('it should be distributed on host', async () => {
      await viewer.host(20);
      expect(viewer.hasAchievement('advertiser')).toBeTruthy();
    });

    test('it should be distributed on raid', async () => {
      await viewer.raid(20);
      expect(viewer.hasAchievement('advertiser')).toBeTruthy();
    });
  });

  describe('supporter', () => {
    test('it should be distributed when viewer says gg 5 times', async () => {
      await viewer.chatMessage('gg');
      await viewer.chatMessage('gg');
      await viewer.chatMessage('gg');
      await viewer.chatMessage('gg');
      expect(viewer.hasAchievement('supporter')).toBeFalsy();
      await viewer.chatMessage('gg');
      expect(viewer.hasAchievement('supporter')).toBeTruthy();
    });
  });

  describe('assiduous', () => {
    test('it should be distributed when viewer is in chat 3 streams in a row', async () => {
      await viewer.chatMessage('yo', 1);
      await viewer.chatMessage('yo', 2);
      await viewer.chatMessage('yo', 3);
      expect(viewer.hasAchievement('assiduous')).toBeTruthy();
    });

    test('it should not be distributed when viewer missed a stream', async () => {
      await viewer.chatMessage('yo', 1);
      await viewer.chatMessage('yo', 2);
      await viewer.chatMessage('yo', 4);
      expect(viewer.hasAchievement('assiduous')).toBeFalsy();
    });

    test('it should not take in account messages sent off-stream', async () => {
      await viewer.chatMessage('yo', 1);
      await viewer.chatMessage('stream is off');
      await viewer.chatMessage('yo', 2);
      await viewer.chatMessage('stream is off');
      await viewer.chatMessage('yo', 3);
      expect(viewer.hasAchievement('assiduous')).toBeTruthy();
    });
  });
});
