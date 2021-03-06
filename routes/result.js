/**
 * Created by Andre on 07.11.2015.
 */
var express = require('express');
var router = express.Router();
var diaries = require('./functions/APIDiaries')();
var nasatlx = require('./functions/APInasatlx')();
var umux = require('./functions/APIumux')();
var sus = require('./functions/APIsus')();
var survey = require('./functions/APIsurvey')();
var userId = require('./functions/getId')();


// DIARIES
router.get('/diaries', function(req,res,next) {
    diaries.getEntries(function(result){
        res.send(result);
    });
});


// NASA-TLX
router.get('/nasatlx', function(req,res,next) {
    nasatlx.getEntries(function(result){
        res.send(result);
    });
});

router.get('/nasatlx/:id', function(req,res,next) {
    var userId = req.cookies.uniqid;
    if (req.params.id === 'all') {
        nasatlx.getEntries(function(result) {
            res.send(result);
        });
    }
    else if ( req.params.id === 'myResult' ) {

        res.redirect('/result/nasatlx/'+userId);
    }
    else {
        nasatlx.getEntryByID(function(result) {
            res.send(result);
        }, req.params.id);
    }
});


// UMUX
router.get('/umux', function(req,res,next) {
    umux.getEntries(function(result){
        res.send(result);
    });
});


// SUS
router.get('/sus', function(req,res,next) {
    sus.getEntries(function(result){
        res.send(result);
    });
});


// SURVEY
router.get('/survey/:id', function(req,res,next) {
    var userId = req.cookies.uniqid;
    if (req.params.id === 'all') {
        survey.getEntries(function(result) {
            res.render('result-survey', {options: result.options});
        });
    }
    else if ( req.params.id === 'myResult' ) {
        survey.getEntryByID(function(result) {
            res.render('personal-result-survey',{options: result.result[0]});
        }, userId);
    }
    else {
        survey.getEntries(function(result) {
            res.render('personal-result-survey',{options: result.result[0]});
        }, userId);
    }
});

module.exports = router;
