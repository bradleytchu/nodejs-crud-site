const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const config = require('./config/database');

mongoose.connect(config.database);
let db = mongoose.connection;

db.once('open', () => {
  console.log("Connected to MongoDB");
});

// check for db errors
db.on('error', (err) => {
  console.log(err);
})


// init app
const app = express();

// bring in models
let Article = require('./models/articles');

// load view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// express session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
}))

// express messages middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

app.use(expressValidator());
// passport config
require('./config/passport')(passport);
// PASSPORE  middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
})

// home route
app.get('/', (req, res) => {
  Article.find({}, (err, articles) => {

    if (err) {
      console.log(err);
    }

    res.render('index', {
      title: 'Welcome to NodeJS & Mongo CRUD site! :)',
      articles: articles
    });

  });

});

//router files
let articles = require('./routes/articles');
let users = require('./routes/users');

app.use('/articles', articles);
app.use('/users', users);


//start server
app.listen(80, () => {
  console.log('Server started on port 80');
});