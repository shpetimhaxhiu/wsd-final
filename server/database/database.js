const fs = require('fs');

module.exports.allData = function () {
  const data2 = fs.readFileSync(`${__dirname}/data.json`);
  const parsed = JSON.parse(data2);
  // console.log(parsed);
  return parsed;
};

module.exports.lastUpdated = function () {
  const data2 = fs.readFileSync(`${__dirname}/data.json`);
  const parsed = JSON.parse(data2);
  // console.log(parsed.completed_at);
  const date = new Date(parsed.completed_at);
  const dateTime = date.toLocaleString();

  return dateTime;
};
