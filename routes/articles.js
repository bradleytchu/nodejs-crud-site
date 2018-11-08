const express = require('express');
const router = express.Router();


// bring in models
let Article = require('../models/articles');

// bring in models
let User = require('../models/user');


// load edit article
router.get('/edit/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      req.flash('danger', 'Not Authorized');
    }


    res.render('edit_article', {
      title: 'Edit Article',
      article: article
    })
  })
});


// add route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add', {
    title: 'Add Ad'
  });
});




// add submit POST route
router.post('/add', (req, res) => {


  req.checkBody('title', 'Title is required').notEmpty();
  // req.checkBody('author', 'Author is required').notEmpty();
  req.checkBody('body', 'BOdy is required').notEmpty();

  // get errors
  let errors = req.validationErrors();

  if (errors) {
    res.render('add', {
      title: 'Add Article',
      errors: errors
    });
  }
  else {

    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    article.save((err) => {
      if (err) {
        console.log(err);
        return;
      }
      else {
        req.flash('success', 'Article Added');
        res.redirect('/');
      }
    });

  }

});

// update POST article
router.post('/edit/:id', ensureAuthenticated, (req, res) => {

  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = { _id: req.params.id }

  Article.update(query, article, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    else {
      res.redirect('/');
    }
  });

  return;
});


// delete article
router.delete('/:id', (req, res) => {


  if (!req.user._id) {
    res.status(500).send();
  }

  let query = { _id: req.params.id }

  // console.log(query);

  Article.findById(query, (err, article) => {
    // console.log(article);
    if (article.author != req.user._id) {
      res.status(500).send();
    }
    else {
      Article.remove(query, (err) => {
        if (err) {
          console.log(err);
        }
        res.send('Sucess');
      });
    }
  });


});

// Get single article
router.get('/:id', (req, res) => {

  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
      res.render('article', {
        article: article,
        author: user.name
      });
    });
  });
});

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}



module.exports = router;