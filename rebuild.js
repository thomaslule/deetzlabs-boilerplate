const { Deetzlabs } = require('deetzlabs');
const config = require('./config');

const start = async () => {
  try {
    const deetzlabs = new Deetzlabs(config);
    await deetzlabs.rebuild();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();
