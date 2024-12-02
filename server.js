const express = require('express');
const app = express();
const mongodb = require('./data/database');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger-output.json');
const swaggerDocumentDev = require('./swagger-output-dev.json');
const bodyParser = require('body-parser');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const PORT = process.env.PORT || 3000;

app
  .use(bodyParser.json())
  .use(
    session({
      secret: 'secret',
      resave: false,
      saveUninitialized: true
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader('Access-Controll-Allow-Origin', '*');
    res.setHeader(
      'Access-Controll-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization'
    );
    res.setHeader('Access-Controll-Allow-Methods', 'POST, GET, PUT, PATCH, OPTIONS, DELETE');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'] }))
  .use(cors({ origin: '*' }))
  .use('/', require('./routes'));

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.CALLBACK_URL
    },
    function (accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => {
  res.send(
    req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'
  );
});

app.get(
  '/github/callback',
  passport.authenticate('github', {
    failureRedirect: '/api-docs',
    session: false
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

// Swagger Middleware
if (process.env.DEV == 'true') {
  app.use('/api-docs', swaggerUI.serve);
  app.use('/api-docs', swaggerUI.setup(swaggerDocumentDev));
} else {
  app.use('/api-docs', swaggerUI.serve);
  app.use('/api-docs', swaggerUI.setup(swaggerDocument));
}

// Error handling
process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}/n Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.error(err);
  } else {
    app.listen(PORT, () => {
      console.log(`Database connected and server running on port ${PORT}`);
    });
  }
});
