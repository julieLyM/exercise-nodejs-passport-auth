const users = [
  {
    username: "Julie",
    password: "juju"
  },
  {
    username: "Julie1",
    password: "juju"
  }
];

const findByUsername = (username, cb) => {
  try {
    // throw new Error("j'ai tout cassé");
    const user = users.find(user => user.username === username);
    console.log(user);
    return cb(null, user);
  } catch (e) {
    cb(e);
  }
};

module.exports = { users, findByUsername };
