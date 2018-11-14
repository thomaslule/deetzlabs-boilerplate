const { Deetzlabs } = require('deetzlabs');
const config = require('./config');

let deetzlabs;

const start = async () => {
  try {
    deetzlabs = new Deetzlabs(config);
    await deetzlabs.start();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

start();

const stop = async () => {
  try {
    await Promise.race([
      deetzlabs.stop(),
      new Promise((resolve, reject) => setTimeout(reject, 3000)),
    ]);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

process.on('SIGINT', stop);
process.on('SIGTERM', stop);
