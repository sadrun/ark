const chalk = require('chalk');

exports.log = (msg = '') => {
  console.log(msg);
};

exports.error = (msg = '') => {
  console.error(chalk.red(msg));
};

exports.success = (msg = '') => {
  console.error(chalk.green(msg));
};

exports.info = (msg = '') => {
  console.error(chalk.blue(msg));
};

exports.warn = (msg = '') => {
  console.error(chalk.yellow(msg));
};