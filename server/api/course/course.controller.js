'use strict';

var jsonfile = require('jsonfile');
var path = require('path');
var FILE = path.resolve('db', 'courses.json');
var _ = require('lodash');

// Get list of courses
exports.getAll = function(req, res) {
  jsonfile.readFile(FILE, function (err, obj) {
    res.json(obj);
  });
};

//Get a course by id
exports.get = function(req, res) {
  jsonfile.readFile(FILE, function (err, obj) {
    var result = null;
    _.forEach(obj.courses, function (course) {
      if (course.id == req.params.id) {
        result = course;
      };
    });

    if (!result) {
      res.status(404).send('Error 404');
    } else {
      setTimeout(function() {
        res.status(200).type('json').json(result);
      }, 2000);//force delay of 2 seconds.
    }
  });
};

//Get a course by id
exports.put = function(req, res) {
  var result = null;
  jsonfile.readFile(FILE, function (err, obj) {
    //res.json(obj.courses[req.params.id]);
    _.forEach(obj.courses, function (course) {
      if (course.id == req.params.id) {
        course.name = req.body.name;
        course.description = req.body.description;
        course.textbooks = req.body.textbooks;
        result = course;
      };
    });

    if (!result) {
      res.status(404).send('Error 404');
    } else {
      setTimeout(function() {
        jsonfile.writeFile(FILE, {courses: obj.courses}, function (err) {
          console.error(err);
        });
        res.status(200).type('json').json(result);
      }, 2000);//force delay of 2 seconds.
    }
  });
};
