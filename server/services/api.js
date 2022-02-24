const axios = require('axios');
const qs = require('qs');

async function getToken() {
  const data = qs.stringify({
    grant_type: 'client_credentials',
    client_id: 'coding_test',
    client_secret: 'bwZm5XC6HTlr3fcdzRnD',
  });
  const config2 = {
    method: 'post',
    url: 'https://staging-authentication.wallstreetdocs.com/oauth/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data,
  };

  return axios(config2);
}

async function getJobId(authToken) {
  const config = {
    method: 'post',
    url: 'https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios(config);
}

async function getServicesList(authToken, jobId) {
  const config3 = {
    method: 'get',
    url: `https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service/${jobId}`,
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Bearer ${authToken}`,
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    },
  };

  return axios(config3);
}

async function remakeRequest(authToken, jobId) {
  const config3 = {
    method: 'get',
    url: `https://staging-gateway.priipcloud.com/api/v2.0/gateway/reports/status/service/${jobId}`,
    headers: {
      Accept: 'application/json, text/plain, */*',
      Authorization: `Bearer ${authToken}`,
      'Accept-Encoding': 'gzip, deflate, br',
      Connection: 'keep-alive',
    },
  };

  return axios(config3);
}

module.exports.getToken = getToken;
module.exports.getJobId = getJobId;
module.exports.getServicesList = getServicesList;
module.exports.remakeRequest = remakeRequest;
