const ld = require('lodash');
const where = require('lodash.where');
const db = require('../database/database');

exports.servicesByStatus = (request, response) => {
  const theId = parseInt(request.params.code, 10);
  const results = where(db.allData().service_reports, { status_code: theId });
  response.setHeader('Content-Type', 'application/json');
  response.json(results);
};

exports.allServicesByStatus = (request, response) => {
  const allservices = db.allData().service_reports;
  const results = ld.countBy(allservices, 'status_code');

  response.setHeader('Content-Type', 'application/json');
  response.send(results);
};
