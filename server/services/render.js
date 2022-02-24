const { groupBy } = require('lodash');
const where = require('lodash.where');
const servicesController = require('../controller/controller');
const db = require('../database/database');
const apiCalls = require('./api');

// Dashboard
exports.dashboard = (property, response) => {
  const allServices = db.allData().service_reports;
  const running = where(allServices, { host: { enabled: true } });
  const notRunning = where(allServices, { host: { enabled: false } });
  const status200 = where(allServices, { status_text: 'OK' });
  const ok = where(allServices, { status_text: 'OK' });
  const implemented = where(ok, {
    nodes: [
      {
        status_code: 200,
      },
    ],
  });
  const notImplemented = where(allServices, { status_code: 501 });

  response.render('dashboard', {
    layout: 'index',
    foo: '123123',
    title: 'Dashboard',
    allServices: db.allData(),
    path: 'dashboard',
    dashboard: true,
    helpers: {
      toggle(bl) {
        if (bl) {
          return '<span class="badge badge-success">Yes</span>';
        }
        return '<span class="badge badge-danger">No</span>';
      },
      status(s) {
        switch (s) {
          case 'OK':
            return '<span class="badge badge-success p-1">Ok</span>';
          case 'Not Implemented':
            return '<span class="badge badge-warning p-1">Not Implemented</span>';
          case 'Forbidden. Forbidden hostname.':
            return '<span class="badge badge-secondary p-1">Forbidden</span>';
          case 'No web hosts registered.':
            return '<span class="badge badge-info p-1">No web hosts</span>';
          default:
            return '<span class="badge badge-danger p-1">Internal Problem</span>';
        }
      },
      haveNodes(node) {
        if (node > 0) {
          return true;
        }
        return false;
      },
      nodeCheck(state) {
        switch (state) {
          case 'red':
            return '<span class="badge badge-danger">Danger</span>';
          case 'green':
            return '<span class="badge badge-success">Okay</span>';
          case 'yellow':
            return '<span class="badge badge-warning">Warning</span>';
          default:
            return `<span class="badge badge-info">${state}</span>`;
        }
      },
      isOk(s) {
        if (s == 'OK') {
          return true;
        }
        return false;
      },
    },
    services: db.allData().service_reports,
    status200,
    running,
    notRunning,
    implemented,
    notImplemented,
  });
};

// Refresher
exports.refresh = async (request, response) => {
  servicesController.importData().then((res) => {
    response.render('refresh', {
      layout: false,
    });
  });
};

// Services List
exports.services_list = (request, response) => {
  response.render('services/list', {
    title: 'List of all Services',
    layout: 'index',
    servicesListLink: true,
    allServices: db.allData(),
    helpers: {
      toggle(bl) {
        if (bl) {
          return '<span class="badge badge-success">Yes</span>';
        }
        return '<span class="badge badge-danger">No</span>';
      },
      status(s) {
        switch (s) {
          case 'OK':
            return '<span class="badge badge-success p-1">Ok</span>';
          case 'Not Implemented':
            return '<span class="badge badge-warning p-1">Not Implemented</span>';
          case 'Forbidden. Forbidden hostname.':
            return '<span class="badge badge-secondary p-1">Forbidden</span>';
          case 'No web hosts registered.':
            return '<span class="badge badge-info p-1">No web hosts</span>';
          default:
            return '<span class="badge badge-danger p-1">Internal Problem</span>';
        }
      },
      haveNodes(node) {
        if (node > 0) {
          return true;
        }
        return false;
      },
      nodeCheck(state) {
        switch (state) {
          case 'red':
            return '<span class="badge badge-danger">Danger</span>';
          case 'green':
            return '<span class="badge badge-success">Okay</span>';
          case 'yellow':
            return '<span class="badge badge-warning">Warning</span>';
          default:
            return `<span class="badge badge-info">${state}</span>`;
        }
      },
      isOk(s) {
        if (s == 'OK') {
          return true;
        }
        return false;
      },
    },
  });
};

// Service Statuses
exports.services_statuses = (request, response) => {
  const servReports = db.allData().service_reports;
  const groupedByStatus = groupBy(servReports, 'status_code');
  // console.log(alldata)
  response.render('services/statuses', {
    layout: 'index',
    groupedByStatus,
    servicesGroupsLink: 'statuses',
    helpers: {
      status(s) {
        switch (s) {
          case 'OK':
            return 'Okay';
          case 'Not Implemented':
            return 'Not Implemented';
          case 'Forbidden. Forbidden hostname.':
            return 'Forbidden';
          case 'No web hosts registered.':
            return 'No web hosts';
          default:
            return 'Internal Problem';
        }
      },
      toggle(bl) {
        if (bl) {
          return '<span class="badge badge-success">Yes</span>';
        }
        return '<span class="badge badge-danger">No</span>';
      },
    },
  });
};

// Single Service
exports.single_service = (request, response) => {
  const services = db.allData().service_reports;
  const theId = parseInt(request.params.id);
  const theReport = where(services, {
    host: {
      id: theId,
    },
  });

  response.render('services/single', {
    layout: 'index',
    servicesListLink: true,
    report: theReport[0],
    helpers: {
      nodeCheck(state) {
        switch (state) {
          case 'red':
            return '<span class="display-3 badge badge-danger p-2 mx-2">Danger</span>';
          case 'green':
            return '<span class="display-3 badge badge-success p-2 mx-2">Okay</span>';
          case 'yellow':
            return '<span class="display-3 badge badge-warning p-2 mx-2">Warning</span>';
          default:
            return `<span class="display-3 p-2 mx-2  badge badge-info">${state}</span>`;
        }
      },
    },
  });
};

exports.testApi = (request, response) => {
  apiCalls
    .getServicesList(request.app.locals.token, request.app.locals.lastJobId)
    .then((response3) => {
      console.log(response3);
      response.render('testApi', {
        layout: 'index',
        response3,
      });
    });
};
