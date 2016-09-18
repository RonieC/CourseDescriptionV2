'use strict';

var express = require('express');
var controller = require('./course.controller');

var router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.get);
router.put('/:id', controller.put);

module.exports = router;
