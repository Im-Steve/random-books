const fs = require('fs-extra');

const source = 'build/index.html';
const destination = 'build/404.html';

fs.copySync(source, destination, { overwrite: true });

// eslint-disable-next-line no-console
console.log(`${source} was copied to ${destination}.`);
