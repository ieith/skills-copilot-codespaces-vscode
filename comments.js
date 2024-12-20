// create web server
// create a route for comments
// create a route for comments/new
// create a route for comments/:id
// create a route for comments/:id/edit
// create a route for comments/:id/delete
// create a route for comments/:id/edit

var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');

// comments index
router.get('/', function(req, res) {
  Comment.find({}, function(err, comments) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/index', {comments: comments});
    }
  });
});

// comments new
router.get('/new', function(req, res) {
  res.render('comments/new');
});

// comments create
router.post('/', function(req, res) {
  Comment.create(req.body.comment, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      console.log('Comment created!');
      console.log(comment);
      res.redirect('/comments');
    }
  });
});

// comments show
router.get('/:id', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/show', {comment: comment});
    }
  });
});

// comments edit
router.get('/:id/edit', function(req, res) {
  Comment.findById(req.params.id, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.render('comments/edit', {comment: comment});
    }
  });
});

// comments update
router.put('/:id', function(req, res) {
  Comment.findByIdAndUpdate(req.params.id, req.body.comment, function(err, comment) {
    if (err) {
      console.log(err);
    } else {
      res.redirect('/comments/' + req.params.id);
    }
  });
});

// comments delete
router.delete('/:id', function(req, res) {
  Comment.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log('Comment deleted!');
      res.redirect('/comments');
    }
  });
});

module.exports = router;
