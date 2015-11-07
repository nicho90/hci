/**
 * Created by Andre on 30.10.2015.
 */
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var dbConnections = require('../config/dbs');
mongoose.connect(dbConnections.MongoDB);

var diaries = require('./functions/APIDiaries')();
var nasatlx = require('./functions/APInasatlx')();
var umux = require('./functions/APIumux')();
var sus = require('./functions/APIsus')();
var survey = require('./functions/APIsurvey')();
var userId = require('./functions/getid')();


// DIARIES
router.post('/diaries', function(req, res, next) {
  if (req.body.userId != undefined && req.body.device != undefined && req.body.reason != undefined ) {
    diaries.createEntry(function(result){
      res.send(result);
    },req.body);
  }
  else {
    res.send({success: false, message: 'missing or false input'})
  }
});

router.get('/diaries', function(req,res,next) {
    diaries.getEntries(function(result){
        res.send(result);
    });
});


// NASA-TLX
router.post('/nasatlx', function(req, res, next) {
  var userId = req.cookies.uniqid;
  req.query.userId = userId;
  if (req.query.mentalDemand != undefined &&
        req.query.temporalDemand != undefined &&
        req.query.performance != undefined &&
        req.query.effort != undefined &&
        req.query.frustration != undefined &&
        req.query.physicalDemand != undefined ) {
    nasatlx.createEntry(function(result){
        console.log(result);
        res.send(result);
    },req.query);
  }
  else {
    res.send({success: false, message: 'missing or false input'});
  }
});

router.get('/nasatlx', function(req,res,next) {
    nasatlx.getEntries(function(result){
      res.send(result);
  });
});


// UMUX
router.post('/umux', function(req, res, next) {
    umux.createEntry(function(result){
        res.send(result);
    },req.body);
});

router.get('/umux', function(req,res,next) {
    umux.getEntries(function(result){
      res.send(result);
    });
});


// SUS
router.post('/sus', function(req, res, next) {
    var userId = req.cookies.uniqid;
    req.body.userId = userId;
    if (req.body.question_1 != undefined &&
        req.body.question_2 != undefined &&
        req.body.question_3 != undefined &&
        req.body.question_4 != undefined &&
        req.body.question_5 != undefined &&
        req.body.question_6 != undefined &&
        req.body.question_7 != undefined &&
        req.body.question_8 != undefined &&
        req.body.question_9 != undefined &&
        req.body.question_10 != undefined ) {

        sus.createEntry(function(result){
            console.log(result);
            res.redirect('/results-sus.html');
        },req.body);
    } else {
        res.send({success: false, message: 'missing or false input'});
    }
});


// SURVEY
router.post('/survey', function(req, res, next) {
  var userId = req.cookies.uniqid;
  req.body.userId = userId;
  survey.createEntry(function(result){
    res.redirect('/result/survey/'+userId);
  },req.body);
});

router.get('/survey', function(req,res,next) {
  survey.getEntries(function(result){
    res.send(result);
  })
});


// USER
router.get('/userId', function(req,res,next) {
  userId.getID(function(result){
    res.send(result);
  })
});



// TEST
router.post('/test', function(req,res,next) {
  console.log(req.body);
  console.log(req.cookies.uniqid);
  res.redirect('/');
});

module.exports = router;
