const express = require('express');

const router = new express.Router();

const renderer = require('../services/render');
const apiRenderer = require('../services/apiRender');

// Default page
router.get('/', renderer.dashboard);

// Services List
router.get('/services', renderer.services_list);

// Services Group by Statuses
router.get('/services/statuses', renderer.services_statuses);

// Single Service Details
router.get('/service/:id?', renderer.single_service);

// Refresher
router.get('/services/refresh', renderer.refresh);

// API Route for implemented services
router.get('/api/services/counted/', apiRenderer.allServicesByStatus);

module.exports = router;
