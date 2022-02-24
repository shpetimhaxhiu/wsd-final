const apiCalls = require('../services/api');
const fs = require('fs');

const writeFile = (path, data, opts = 'utf8') =>
  new Promise((resolve, reject) => {
    fs.writeFile(path, data, opts, (err) => {
      if (err) reject(err);
      else resolve();
    });
  });

function wait(ms) {
  const start = new Date().getTime();
  let end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

// Authentication Controller
module.exports.authenticate = async (req, res) => {
  const gToken = await apiCalls
    .getToken()
    .then((response) => response.data.access_token)
    .catch((error) => console.log(error));
  const jobId = await apiCalls.getJobId(gToken).then((response2) => response2.data.job_id);

  return { gToken, jobId };
};

// Controller for delivering all data from API
module.exports.allServicesData = async (req, res) => {
  const gToken = await apiCalls.getToken().then((response) => response.data.access_token);
  const jobId = await apiCalls.getJobId(gToken).then((response2) => response2.data.job_id);
  wait(30000);
  const allData = apiCalls.getServicesList(gToken, jobId).then((response3) => response3);
  return allData;
};

module.exports.importData = async (req, res) => {
  this.allServicesData()
    .then((response) => {
      const run = async () => {
        const jsonData = await writeFile(
          `./server/database/data.json`,
          JSON.stringify(response.data)
        );
      };

      run();
      return true;
    })
    .catch((err) => {
      console.log(err);
    });
};
