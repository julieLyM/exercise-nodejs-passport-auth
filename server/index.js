const express = require("express");
const app = express();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const bodyParser = require("body-parser");

// const BasicStrategy = require("passport-http").BasicStrategy;
const LocalStrategy = require("passport-local").Strategy;

const { users, findByUsername } = require("./db/users");

app.use(cors());
// app.use(express.json());

/////////////////////passeport basic
// passport.use(
//   "basic",
//   new BasicStrategy(function(username, password, cb) {
//     findByUsername(username, function(err, user) {
//       if (err) {
//         return cb(err);
//       }
//       if (!user) {
//         return cb(null, false);
//       }
//       if (user.password != password) {
//         return cb(null, false);
//       }
//       return cb(null, user);
//     });
//   })
// );

////////////////////////passeport local
passport.use(
  "local",
  new LocalStrategy(function(username, password, cb) {
    console.log(username);
    findByUsername(username, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (user.password != password) {
        return cb(null, false);
      }
      return cb(null, user);
    });
  })
);

////////////express json and urlencoded could be use remplace bodyparser
// app.use(express.json());
// app.user(express.urlencoded());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "stackerine",
    resave: false,
    saveUninitialized: false
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", passport.authenticate("local", { session: false }), (req, res) => {
  res.send("hello");
});

// app.post("/login", (req, res) => {
//   res.send("hello you are login");
// });

app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/account",
    failureRedirect: "/error"
  })
);

///////////////////ajax
app.post("/ajaxLogin", (req, res, next) =>
  passport.authenticate("local", function(err, user) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.json({ error: "bad authentication" });
    }
    req.login(user, function(err) {
      if (err) {
        return next(err);
      }
      return res.json({ user });
    });
  })(req, res, next)
);

app.get("/error", (req, res) => {
  res.send("error login");
});

app.get("/account", (req, res) => {
  res.send(`you are logged`);
});

passport.serializeUser(function(user, cb) {
  cb(null, user.username);
});

passport.deserializeUser(function(username, cb) {
  findByUsername(username, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

const server = app.listen(3001, function() {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
