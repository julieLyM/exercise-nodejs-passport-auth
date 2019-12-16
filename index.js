const express = require("express");
const app = express();

const BasicStrategy = require("passport-http").BasicStrategy;

const passport = require("passport");

const users = require("./db/users");

findByUsername = (username, cb) => {
  try {
    // throw new Error("j'ai tout cassé");
    const user = users.find(user => user.username === username);
    return cb(null, user);
  } catch (e) {
    cb(e);
  }
};

passport.use(
  "basic",
  new BasicStrategy(function(username, password, cb) {
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

app.use(passport.initialize());

app.get("/", passport.authenticate("basic", { session: false }), (req, res) => {
  res.json({ username: req.user.username });
});

const server = app.listen(3000, function() {
  console.log(`Server started on http://localhost:${server.address().port}`);
});
