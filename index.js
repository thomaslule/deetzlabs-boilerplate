const Deetzlabs = require('deetzlabs').default;
const config = require('./config');
const achievements = require('./achievements');

const start = async () => {
  try {
    const deetzlabs = Deetzlabs({
      ...config,
      achievements,
      widgets_folder: `${__dirname}/widgets`,
    });
    await deetzlabs.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
